import React,{useState,useEffect} from 'react';
import CountdownBar from "react-native-countdown-bar";   
import {View, Text,Animated,StyleSheet,Button,Alert} from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { ProgressBar, Colors } from 'react-native-paper';
import Constants from 'expo-constants';
import axios from 'axios';
import Delivery from './Map';
const Inprogress = ({route,navigation}) => {
    const repair_id = route.params.repair_id;
    const handleArrived = async() =>{
        // console.log("hello")
          await axios.post('http://192.168.0.109:3000/user/status',{repair_id}).then((res) =>{
             if(res.data.status == "Completed"){
             navigation.navigate('Map');
           }
          }).catch((err) => {
              console.log(err);
          })
        }
       useEffect(() => {
         var handle=setInterval(handleArrived,1000);    
         return ()=>{
           clearInterval(handle);
         }
       })
       return(
           <View style={styles.container}>
               <Text>Your Repair has Started</Text>
           </View>
       )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    }
  });
export default Inprogress;