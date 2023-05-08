import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';


function PageNotFoundScreen(){
    const [animation] = useState(new Animated.ValueXY({ x: 0, y: 0}));
  
    const handlePressIn = () => {
      Animated.spring(animation, {
        toValue: { x: (Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1)*Math.random()*150, 
                   y: (Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1)*Math.random()*250 },
        useNativeDriver: false,
      }).start();
    };
  
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.tabTitle}>Page Not Found</Text>
        <TouchableOpacity
          style={styles.tabButton}
          onPressIn={handlePressIn}
          activeOpacity={0.7}
        >
          <Animated.Text
            style={[
              styles.tabButtonText,
              {
                transform: [
                  { translateX: animation.x },
                  { translateY: animation.y },
                ],
              },
            ]}
          >
            Press me!
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    },
    buttonText: {
    color: 'white',
    fontWeight: 'bold',
    },
    tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    tabTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#121212'
    },
    tabButton: {
    backgroundColor: '#FF3A2E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 17,
    },
    tabButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    },
    headerText: {
    color: 'white',
    fontWeight: 'bold',
    },
});

export default PageNotFoundScreen;