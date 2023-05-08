import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextProps } from './types';

import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'SF UI Display': require('../../../assets/fonts/SF-UI-Display-Semibold.ttf'),
  });
}

loadFonts();

const styles = StyleSheet.create({
    text: {
        fontFamily: 'SF UI Display',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#66fcf1',
        marginTop: 8,
        marginBottom: 40,
    },
});


const Register: FunctionComponent<TextProps> = (props) => {
    return <Text style = {[styles.text, props.style]}>{props.children}</Text>
}

export default Register;