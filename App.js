import React from 'react';
import LogInForm from "./screens/LogInForm"
import Profile from "./screens/Profile"
import RegisterScreen from "./screens/RegisterScreen"
import UpdateProfile from "./screens/UpdateProfile"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UpdatePassword from "./screens/UpdatePassword";
import store from './redux/store';
import {Provider} from 'react-redux'
import RatesScreen from './screens/RatesScreen';
import Contact from "./screens/Contact"
import Report from './screens/Report';
//import Home from './screens/Home';
import HowToUse from './screens/HowToUse'
import DrawerNagivation from './screens/DrawerNagivation';
import Map from './screens/Map';
import Tracker from './screens/Tracker';
import Inprogress from './screens/Inprogress';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Provider store = {store}>
        <Stack.Navigator>
          <Stack.Screen name = "LogIn" component = {LogInForm}/>
          {/*<Stack.Screen name = "Profile" component = {Profile}/>
          <Stack.Screen name="Map" component = {Map} />
          <Stack.Screen name="Tracker" component = {Tracker} />
  <Stack.Screen name="InProgress" component = {Inprogress} />*/}
          <Stack.Screen name = "RegisterScreen" component = {RegisterScreen} />
          <Stack.Screen name = "DrawerNavigation" component = {DrawerNagivation} />
          {/*<Stack.Screen name = "DrawerNavigation" component = {DrawerNagivation} />
          <Stack.Screen name = "Profile" component = {Profile}/>
          <Stack.Screen name = "UpdatePassword" component = {UpdatePassword} />
          <Stack.Screen name = "UpdateScreen" component = {UpdateProfile} />
          <Stack.Screen name= "ContactUs" component = {Contact} />
          <Stack.Screen name = "Report" component = {Report} />
          <Stack.Screen name = "Home" component = {Home} />
          <Stack.Screen name = "HowToUse" component = {HowToUse} />
          <Stack.Screen name = "RegisterScreen" component = {RegisterScreen} />
          <Stack.Screen name = "UpdateScreen" component = {UpdateProfile} />
          <Stack.Screen name = "UpdatePassword" component = {UpdatePassword} />
          <Stack.Screen name = "RatesScreen" component = {RatesScreen} />*/}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}