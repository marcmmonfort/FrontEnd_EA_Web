import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'SF UI Display': require('../../../assets/fonts/SF-UI-Display-Semibold.ttf'),
  });
  await Font.loadAsync({
    'Rafaella': require('../../../assets/fonts/Rafaella.ttf'),
  });
}

loadFonts();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Rafaella',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

function DiscoveryScreen(){
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Discovery</Text>
        </View>
    );
}

export default DiscoveryScreen;