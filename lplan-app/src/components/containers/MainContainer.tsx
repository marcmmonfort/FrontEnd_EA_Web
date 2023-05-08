import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ContainerProps } from './types';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const MainContainer: FunctionComponent<ContainerProps> = (props) => {
    return <View style = {[styles.container, props.style]}>{props.children}</View>
}

export default MainContainer;
