import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';

//Importamos iconos https://icons.expo.fyi/
import { MaterialIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PageNotFoundScreen from '../pagenotfound.screen/pagenotfound.screen';
import FeedScreen from '../feed.screen/feed.screen';
import DiscoveryScreen from '../discovery.screen/discovery.screen';
import MessagesScreen from '../messages.screen/messages.screen';
import CalendarEventsScreen from '../calendarevents.screen/calendarevents.screen';
import ProfileScreen from '../profile.screen/profile.screen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator>
        
        <Tab.Screen 
        
        name="Crazy button" 
        component={FeedScreen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<MaterialCommunityIcons name="gesture-tap-button" size={30} color="#66fcf1"/>)
        }}
        />
        <Tab.Screen 
        name="Photo page" 
        component={DiscoveryScreen} 
        options={{ headerShown: false, tabBarShowLabel: false, tabBarBadge: 3,
          tabBarIcon: ({color, size}) =>
            (<MaterialIcons name="photo-library" size={25} color="#66fcf1"/>)
        }}
        />
        <Tab.Screen name="List page" 
        component={MessagesScreen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<Fontisto name="nav-icon-list-a" size={18} color="#66fcf1"/>)
        }}
        />
        <Tab.Screen name="CalendarEventsScreen" 
        component={CalendarEventsScreen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<Fontisto name="nav-icon-list-a" size={18} color="#66fcf1"/>)
        }}
        />
        <Tab.Screen name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false, tabBarShowLabel: false,
          tabBarIcon: ({color, size}) =>
            (<Fontisto name="nav-icon-list-a" size={18} color="#66fcf1"/>)
        }}
        />

      </Tab.Navigator>
  );
}

        
export default HomeScreen;
