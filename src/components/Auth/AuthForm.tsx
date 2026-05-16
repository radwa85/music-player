import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { makeAuthFormStyles } from './AuthForm.styles';
import { useTheme } from '../../providers/ThemeProvider';

type AuthErrors = Partial<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

interface AuthFormProps {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  errors?: AuthErrors;
  loading: boolean;
  onSubmit: () => void;
}

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
}: AuthFormProps) {
  const { colors } = useTheme();
  const styles = makeAuthFormStyles(colors);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color={colors.secondaryText} style={styles.icon} />
        <TextInput
          placeholder="Enter username"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color={colors.secondaryText} style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color={colors.secondaryText} style={styles.icon} />
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color={colors.secondaryText} style={styles.icon} />
        <TextInput
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          style={styles.input}
        />
      </View>
      {errors.confirmPassword ? (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      ) : null}

      <TouchableOpacity
        onPress={onSubmit}
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.7 }]}
        activeOpacity={0.9}
      >
        <View style={styles.buttonRow}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.buttonText}>Let’s Start</Text>
              <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}