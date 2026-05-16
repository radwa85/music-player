import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../redux/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../login/custombutton';
import { Ionicons } from '@expo/vector-icons';
import { makeLoginStyles } from './loginstyle';
import { useTheme } from '../../providers/ThemeProvider';

// ── Validation helpers ─────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email address is required.';
  if (!EMAIL_REGEX.test(email.trim()))
    return 'Please enter a valid email address (e.g. user@example.com).';
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 6)
    return 'Password must be at least 6 characters long.';
  if (password.length > 128)
    return 'Password is too long (max 128 characters).';
  if (/\s/.test(password))
    return 'Password must not contain spaces.';
  return null;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Inline error messages (show under each field)
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { colors } = useTheme();
  const styles = makeLoginStyles(colors);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  // ── Field-level live validation ─────────────────────────────────────────────
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError(validateEmail(val));
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError(validatePassword(val));
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) return; // Stop — show inline errors

    try {
      const result = await dispatch(loginUser({ email: email.trim(), password, rememberMe }));

      if (loginUser.fulfilled.match(result)) {
        dispatch(clearError());
        navigation.replace('Home');
      } else if (loginUser.rejected.match(result)) {
        const errorMsg = (result.payload as string) || 'Login failed. Please try again.';
        Alert.alert('Login Failed', errorMsg, [{ text: 'OK', style: 'default' }]);
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
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
            <Ionicons name="log-in-outline" size={22} color={colors.primaryOrange} />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Log In</Text>
            <Text style={styles.sectionSubtitle}>
              Enter Your Credentials to continue
            </Text>
          </View>
        </View>

        {/* ── Email Field ── */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={[styles.inputWrapper, emailError ? { borderColor: colors.primaryOrange, borderWidth: 1 } : {}]}>
            <Ionicons name="mail-outline" size={20} color={emailError ? colors.primaryOrange : colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={styles.inputEmail}
              placeholder="Email Address"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={handleEmailChange}
              onBlur={() => setEmailError(validateEmail(email))}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {emailError ? (
            <Text style={{ color: colors.primaryOrange, fontSize: 12, marginTop: 4, marginLeft: 4 }}>
              {emailError}
            </Text>
          ) : null}
        </View>

        {/* ── Password Field ── */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrapperPassword, passwordError ? { borderColor: colors.primaryOrange, borderWidth: 1 } : {}]}>
            <Ionicons name="lock-closed-outline" size={20} color={passwordError ? colors.primaryOrange : colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={() => setPasswordError(validatePassword(password))}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(v => !v)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ paddingRight: 12 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.secondaryText}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={{ color: colors.primaryOrange, fontSize: 12, marginTop: 4, marginLeft: 4 }}>
              {passwordError}
            </Text>
          ) : null}
        </View>

        {/* ── Remember Me ── */}
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          activeOpacity={0.7}
        >
          <View style={styles.rememberMeContainer}>
            <View
              style={[
                styles.rememberMeCheckbox,
                {
                  borderColor: rememberMe ? colors.primaryOrange : colors.secondaryText,
                  backgroundColor: rememberMe ? colors.primaryOrange : 'transparent',
                },
              ]}
            >
              {rememberMe && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
        </TouchableOpacity>

        <CustomButton
          title="Let's Start"
          onPress={handleLogin}
          loading={isLoading}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{ marginTop: 18, alignItems: 'center' }}
        >
          <Text style={styles.authPrompt}>
            Don't have an account? <Text style={styles.authLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
