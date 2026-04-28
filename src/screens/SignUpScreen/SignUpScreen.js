import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { makeSignUpStyles } from './SignUpScreen.styles';
import { AuthForm } from '../../components/Auth/AuthForm';
import { authApi } from '../../services/gitServices';
import { useTheme } from '../../providers/ThemeProvider';

export default function SignUpScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = makeSignUpStyles(colors);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const nextErrors = {};

    if (!username.trim()) nextErrors.username = 'Username is required';
    if (!email.trim()) nextErrors.email = 'Email is required';
    if (!password) nextErrors.password = 'Password is required';
    if (!confirmPassword) nextErrors.confirmPassword = 'Confirm password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      nextErrors.email = 'Invalid email format';
    }

    if (password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignUp = async () => {
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await authApi.signUp(username, email, password);
      setSuccessMessage('Account created successfully');
      Alert.alert('Success', 'Account created successfully');
      navigation.replace('LoginScreen');
    } catch (error) {
      const message = error?.message || 'Something went wrong';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Where Sound Comes Alive</Text>
        </View>

        <View style={styles.signUpHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={24} color="rgba(197, 64, 28, 1)" />
          </View>
          <View>
            <Text style={styles.signUpTitle}>Sign Up</Text>
            <Text style={styles.signUpDesc}>Enter your details to continue</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

        <AuthForm
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          loading={loading}
          onSubmit={handleSignUp}
        />

        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.replace('LoginScreen')}
        >
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.footerLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}