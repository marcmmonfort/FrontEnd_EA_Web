import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StyledTextInputProps } from './types';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'SF UI Display': require('../../../assets/fonts/SF-UI-Display-Semibold.ttf'),
  });
}

loadFonts();

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'SF UI Display',
        fontWeight: 'bold',
        borderWidth: 0,
        borderColor: 'gray',
        width: '68%',
        height: 36,
        marginTop: 14,
        borderRadius: 10,
        backgroundColor: '#66fcf1',
        paddingStart: 10,
        placeholderTextColor: '#4e4e50',
        outlineWidth: 0,
    },
});

const StyledTextInputs: FunctionComponent<StyledTextInputProps> = ({ placeholder, style, value, onChangeText, secureTextEntry, ...props }) => {
    return <TextInput placeholder={placeholder} style={[styles.textInput, style]} {...props} value={value}
    onChangeText={onChangeText} secureTextEntry={secureTextEntry}/>;
  };

export default StyledTextInputs;