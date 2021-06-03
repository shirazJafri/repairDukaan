import React,{useState,useEffect} from 'react';
import CountdownBar from "react-native-countdown-bar";   
import {View, Text,Animated,StyleSheet,Button,Alert} from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { ProgressBar, Colors } from 'react-native-paper';
import Constants from 'expo-constants';
import axios from 'axios';
import Delivery from './Map';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.'
]);
//const repair_id = '6095bf546ce90e1ba0c1124a'
const Tracker = ({route,navigation}) => {
  var chck = false;
  var ride =  false;
  var finished = false;
  const [isPlaying, setIsPlaying] = useState(true);
  const[time,setTime] = useState(route.params.start);
  const [arrived,setArrived] = useState(false);
  const repair_id = route.params.data;
  const worker_id = route.params.worker_id;
 // console.log(worker_id)
  const [wname,setWname] = useState("");
  const getname = async() =>{
    await axios.post('http://192.168.0.109:3000/worker/info',{worker_id}).then((res) =>{
     setWname(res.data.first_name);
     // console.log(res.data);
    }).catch((err) => {
         console.log(err);
     });
  }
  const handleArrived = async() =>{
   // console.log("hello")
     await axios.post('http://192.168.0.109:3000/user/status',{repair_id}).then((res) =>{
       if(res.data.status == "Repair Started"){
        navigation.navigate("Inprogress",{repair_id:repair_id})}
     }).catch((err) => {
         console.log(err);
     })
   }
  useEffect(() => {
    getname();
    var handle=setInterval(handleArrived,1000);    
  })

  const handleCancel = async () =>{
    endDate = new Date();
    var seconds = (endDate.getTime() - time.getTime()) / 60000;
    if (seconds >= 5 && chck == false){
      Alert.alert("You will be charged as 5 minutes have passed");
      chck = true;
    }
    else{
    await axios.post('https://enigmatic-mesa-42065.herokuapp.com/user/cancel',{repair_id,"time":seconds}).then((res) => {
    setIsPlaying(false);
    navigation.navigate('Map');
  }).catch((err) => {
    console.log(err);
  })}
  }
  function Update(t){
    setTime(t)
}
//handleArrived();

  return (
    <View style={styles.container}>
      <Text>Your Mechanic {wname} is Arrivng Soon</Text>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={4*60}
        colors={[
          ['#004777', 0.4]
        ]}
        onComplete={() => [false]}
    >
      {({ remainingTime, animatedColor }) => (
        <View>
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
          {Math.ceil(remainingTime/60)}
        </Animated.Text>
        <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
        Minutes</Animated.Text>
        </View>
      )}
    </CountdownCircleTimer>
    <Button title="Cancel" onPress={handleCancel}></Button>
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

export default Tracker;