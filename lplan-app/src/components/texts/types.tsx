import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface TextProps {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}