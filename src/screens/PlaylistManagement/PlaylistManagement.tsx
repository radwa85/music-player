import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "../../components/Common/AppText";
import { useTheme } from "../../providers/ThemeProvider";
import { makePlaylistManagementStyles } from "./PlaylistManagement.styles";
import { playlistService, PlaylistGroup } from "../../services/playlistService";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PLAYLIST_PLACEHOLDER } from "../../assets/playlistPlaceholder";

const PlaylistManagementScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = makePlaylistManagementStyles(colors);

  const [playlists, setPlaylists] = useState<PlaylistGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<PlaylistGroup | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector((s: RootState) => s.auth.token ?? "");

  const navigation = useNavigation<any>();

  const load = async () => {
    setLoading(true);
    try {
      const data = await playlistService.getPlaylists(token);
      setPlaylists(data || []);
    } catch (err) {
      console.warn("Failed loading playlists", err);
      Alert.alert("Error", "Could not load playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setModalVisible(true);
  };

  const submit = async () => {
    if (!token) {
      Alert.alert("Not signed in", "Please sign in to manage playlists");
      return;
    }

    if (!title || title.trim().length === 0) {
      Alert.alert("Validation", "Please enter a playlist title");
      return;
    }

    try {
      if (editing) {
        await playlistService.updatePlaylist(token, editing.id, {
          title,
          description,
        });
      } else {
        await playlistService.createPlaylist(token, { title, description });
      }
      setModalVisible(false);
      load();
    } catch (err: any) {
      console.warn("Playlist operation error:", err.message || err);
      Alert.alert("Error", err.message || "Operation failed");
    }
  };

  const doDelete = (item: PlaylistGroup) => {
    Alert.alert("Delete playlist", `Delete "${item.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await playlistService.deletePlaylist(token, item.id);
            load();
          } catch (err) {
            console.warn(err);
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: PlaylistGroup }) => (
    <PlaylistCard
      playlist={item}
      onPress={() =>
        navigation.navigate("PlaylistDetail", { playlistId: item.id })
      }
      style={styles.card}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <AppText style={styles.title}>Playlists</AppText>
        <View style={{ width: 32 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={colors.accent} />
      ) : playlists.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Image
            source={PLAYLIST_PLACEHOLDER}
            style={styles.emptyStateIcon}
            resizeMode="cover"
          />
          <AppText fontWeight="bold" style={styles.emptyStateTitle}>
            No playlists yet
          </AppText>
          <AppText style={styles.emptyStateText}>
            Create your first playlist to start organizing your favorite tracks.
          </AppText>
          <TouchableOpacity
            style={styles.createButton}
            onPress={openCreate}
            activeOpacity={0.8}
          >
            <AppText style={styles.createButtonText}>Create Playlist</AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText fontWeight="bold" style={styles.modalHeader}>
              {editing ? "Edit Playlist" : "Create New Playlist"}
            </AppText>
            <TextInput
              placeholder="Playlist title"
              placeholderTextColor={colors.secondaryText}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description (optional)"
              placeholderTextColor={colors.secondaryText}
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <AppText fontWeight="bold" style={styles.cancelButtonText}>
                  Cancel
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submit}
                style={styles.saveButton}
                activeOpacity={0.7}
              >
                <AppText fontWeight="bold" style={styles.saveButtonText}>
                  {editing ? "Update" : "Create"}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.fab}
        onPress={openCreate}
        activeOpacity={0.85}
        accessibilityLabel="Create playlist"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistManagementScreen;
