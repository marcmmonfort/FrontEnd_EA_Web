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
    subtitle: {
        fontFamily: 'SF UI Display',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        marginTop: 40,
    },
});


const SubTitle: FunctionComponent<TextProps> = (props) => {
    return <Text style = {[styles.subtitle, props.style]}>{props.children}</Text>
}

export default SubTitle;