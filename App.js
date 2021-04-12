import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import LogInForm from "./screens/LogInForm"
import Profile from "./screens/Profile"
import RegisterScreen from "./screens/RegisterScreen"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "LogIn">
        <Stack.Screen name = "LogIn" component = {LogInForm}/>
        <Stack.Screen name = "Profile" component = {Profile}/>
        <Stack.Screen name = "RegisterScreen" component = {RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
