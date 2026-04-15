import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function CustomButton({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false 
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.buttonText}>{title}</Text>
          <Ionicons name="arrow-forward" size={22} color="#fff" style={styles.icon} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C4401D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ff9f5c',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  icon: {
    marginLeft: 4,
  },
});
