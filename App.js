import React from 'react';
import LogInForm from "./screens/LogInForm"
import Profile from "./screens/Profile"
import RegisterScreen from "./screens/RegisterScreen"
import UpdateProfile from "./screens/UpdateProfile"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "LogIn" component = {LogInForm}/>
        <Stack.Screen name = "Profile" component = {Profile}/>
        <Stack.Screen name = "RegisterScreen" component = {RegisterScreen} />
        {/*<Stack.Screen name = "UpdateScreen" component = {UpdateProfile} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
