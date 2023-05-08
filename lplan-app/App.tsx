import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MainContainer from './src/components/containers/MainContainer';
import LoginScreen from './src/screens/login.screen';
import RegisterScreen from './src/screens/register.screen';
import HomeScreen from './src/screens/home.screen';

// import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';

const Stack=createStackNavigator();
/*const Tab=createBottomTabNavigator();*/

/*function MainTabNavigator(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen}/>
      <Tab.Screen name="Register" component={RegisterScreen}/>
    </Tab.Navigator>
  );
}*/

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Login' options={{headerShown: false}} component={LoginScreen} />
      <Stack.Screen name="Home" options={{title: 'LPlan'}} component={HomeScreen}/>
      
      <Stack.Screen name='Register' options={{headerShown: false}} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
