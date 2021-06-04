import React,{useState,useEffect} from 'react';
import {View, Text,Animated,StyleSheet,Button,Alert} from 'react-native'
import Constants from 'expo-constants';
import axios from 'axios';
const Inprogress = ({route,navigation}) => {
    const repair_id = route.params.repair_id;
  const [move,setMove] = useState(false);
    const handleArrived = async() =>{
        // console.log("hello")
          await axios.post('https://enigmatic-mesa-42065.herokuapp.com/user/status',{repair_id}).then((res) =>{
             if(res.data.status == "Completed"){
              setMove(true)
            }
          }).catch((err) => {
              console.log(err);
          })
        }
        useEffect(() => {
          var handle=setInterval(handleArrived,1000);    
        })
        if(move){
          navigation.navigate("Map",{repair_id:repair_id})
        }
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
