import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { AppText } from '../../components/Common/AppText';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonColor?: string;
  style?: ViewStyle;
}

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonColor = colors.accent,
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <AppText fontWeight="bold" style={styles.buttonText}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
