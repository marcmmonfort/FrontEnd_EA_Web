import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextProps } from './types';


const styles = StyleSheet.create({
    title: {
        fontSize: 80,
        color: '#344340',
        fontWeight: 'bold',
    },
});


const Title: FunctionComponent<TextProps> = (props) => {
    return <Text style = {[styles.title, props.style]}>{props.children}</Text>
}

export default Title;