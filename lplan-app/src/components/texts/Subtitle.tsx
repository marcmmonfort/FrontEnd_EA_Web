import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextProps } from './types';


const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold',
    },
});


const SubTitle: FunctionComponent<TextProps> = (props) => {
    return <Text style = {[styles.subtitle, props.style]}>{props.children}</Text>
}

export default SubTitle;