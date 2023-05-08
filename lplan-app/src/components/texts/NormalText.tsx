import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextProps } from './types';


const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: 'gray',
        marginTop: 20,
    },
});


const NormalText: FunctionComponent<TextProps> = (props) => {
    return <Text style = {[styles.text, props.style]}>{props.children}</Text>
}

export default NormalText;