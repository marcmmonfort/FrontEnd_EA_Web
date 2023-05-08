import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { StyledTextInputProps } from './types';

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        paddingStart: 30,
    },
});

const StyledTextInputs: FunctionComponent<StyledTextInputProps> = ({ placeholder, style, value, onChangeText, secureTextEntry, ...props }) => {
    return <TextInput placeholder={placeholder} style={[styles.textInput, style]} {...props} value={value}
    onChangeText={onChangeText} secureTextEntry={secureTextEntry}/>;
  };

export default StyledTextInputs;