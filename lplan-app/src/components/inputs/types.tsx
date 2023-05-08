import { ReactNode } from 'react';
import { StyleProp, TextInput, TextStyle } from 'react-native';

export interface StyledTextInputProps {
    children?: ReactNode;
    placeholder?: string;
    value?: string;
    onChangeText?: any;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
}