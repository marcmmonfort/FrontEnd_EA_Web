import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Importamos iconos https://icons.expo.fyi/
import { MaterialIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen 
        name="Crazy button" 
        component={Tab1Screen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<MaterialCommunityIcons name="gesture-tap-button" size={30} color="#121212"/>)
        }}
        />
        <Tab.Screen 
        name="Photo page" 
        component={Tab2Screen} 
        options={{ headerShown: false, tabBarShowLabel: false, tabBarBadge: 3,
          tabBarIcon: ({color, size}) =>
            (<MaterialIcons name="photo-library" size={25} color="#121212"/>)
        }}
        />
        <Tab.Screen name="List page" 
        component={Tab3Screen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<Fontisto name="nav-icon-list-a" size={18} color="#121212"/>)
        }}
        />
      </Tab.Navigator>
  );
}

function Tab1Screen() {
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
      <Text style={styles.tabTitle}>Random button</Text>
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

function Tab2Screen() {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabTitle}>Photo page</Text>
      <Image 
        style={{ width: 350, height: 255}}
        source={{uri: 'https://www.meme-arsenal.com/memes/73770917d803b560114e0cf5e9d8a870.jpg'}}
      />     
      </View>
  );
}

function Tab3Screen() {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabTitle}>Contenido de la Tab 3</Text>
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
        
export default HomeScreen;
