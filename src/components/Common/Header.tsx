import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { styles } from './Header.styles';

interface HeaderProps {
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({ 
  leftIcon, 
  onLeftPress, 
  rightIcon, 
  onRightPress,
  style
}) => {
  return (
    <View style={[styles.header, style]}>
      {leftIcon ? (
        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={onLeftPress}>
          {leftIcon}
        </TouchableOpacity>
      ) : <View style={styles.placeholder} />}

      {rightIcon ? (
        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={onRightPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : <View style={styles.placeholder} />}
    </View>
  );
};
