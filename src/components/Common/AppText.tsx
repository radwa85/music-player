import React from 'react';
import { Text, TextProps } from 'react-native';

export interface AppTextProps extends TextProps {
  fontWeight?: 'regular' | 'medium' | 'bold';
}

export const AppText: React.FC<AppTextProps> = ({ 
  style, 
  fontWeight = 'regular', 
  children, 
  ...props 
}) => {
  const fontFamily = {
    regular: 'Gilroy-Regular',
    medium: 'Gilroy-Medium',
    bold: 'Gilroy-Bold',
  }[fontWeight];

  return (
    <Text style={[{ fontFamily }, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
