import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ButtonGradientProps } from './types';

const ButtonGradient = ({ onPress, containerStyle, buttonStyle, textStyle }: ButtonGradientProps) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <LinearGradient
        colors={['#FF8677', '#FF3C8D']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.text, textStyle]}>LOG IN</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    marginTop: -40,
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ButtonGradient;
