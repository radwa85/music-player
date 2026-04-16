import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "./SignUpScreen.styles";

import { AuthForm } from "../../components/Home/AuthForm";
import { authApi } from "../../services/auth.api";

export function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    setSuccessMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      await authApi.signUp(email, password, username);

      setSuccessMessage("Account created successfully");

      Alert.alert("Success", "Account created successfully");

      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Error", err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Where Sound Comes Alive</Text>
      </View>

      {/* SIGN UP HEADER */}
      <View style={styles.signUpHeader}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="log-in-outline"
            size={25}
            color="rgba(197, 64, 28, 1)"
          />
        </View>

        <View>
          <Text style={styles.signUpTitle}>Sign Up</Text>
          <Text style={styles.signUpDesc}>
            Enter Your Credentials to continue
          </Text>
        </View>
      </View>

      {successMessage ? (
        <Text style={{ color: "green", top: 70, left: 90 }}>
          {successMessage}
        </Text>
      ) : null}

      <View style={styles.divider} />

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

      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />
    </View>
  );
}
