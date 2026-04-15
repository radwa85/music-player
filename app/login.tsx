import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/authslice';
import { AppDispatch, RootState } from './redux/store';
import { router } from 'expo-router';
import CustomButton from '../app/components/custombutton';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles as styles } from '../app/styles/loginstyle';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Attention', 'Please enter both email and password');
      return;
    }

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      router.replace('/(tabs)');
    } else {
      let errorMsg = error || 'Login failed';
      if (error?.includes('405')) {
        errorMsg = 'Error 405: Request method not supported. Check server URL.';
      }
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.welcome, { textAlign: 'center' }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>
          Where Sound Comes Alive
        </Text>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name="log-in-outline" size={22} color="#C4401D" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Log In</Text>
            <Text style={styles.sectionSubtitle}>
              Enter Your Credentials to continue
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.inputEmail}
              placeholder="Email Address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapperPassword}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <CustomButton
          title="Let's Start"
          onPress={handleLogin}
          loading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
