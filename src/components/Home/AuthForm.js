import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "./AuthForm.styles";

export function AuthForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errors = {},
  loading,
  onSubmit,
}) {
  return (
    <View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Enter username"
            onChangeText={setUsername}
            value={username}
            style={styles.input}
          />
        </View>
        {errors.username ? (
          <Text style={{ color: "red" }}>{errors.username}</Text>
        ) : null}

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {errors.email ? (
          <Text style={{ color: "red" }}>{errors.email}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Enter password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
        </View>
        {errors.password ? (
          <Text style={{ color: "red" }}>{errors.password}</Text>
        ) : null}

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            style={styles.input}
          />
        </View>
        {errors.confirmPassword ? (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.confirmPassword}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.6 }]}
      >
        <View style={styles.buttonRow}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>Let’s Start</Text>
              <Ionicons name="arrow-forward" size={22} color="white" />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
