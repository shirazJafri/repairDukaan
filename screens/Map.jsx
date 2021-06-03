import React,{Component,useState,useEffect} from 'react'
import {Platform,SafeAreaView,View,TextInput,Text, StyleSheet,Image,Alert, TouchableOpacity} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import  Constants from 'expo-constants';
import * as Location from 'expo-location';

const KEY = "WlOfHKQSbaBfAafAodbzvfccj8QYGLtK"
const user_id = "602d9002022d673150ce8a28"
const repair_type = "Car"
import axios from 'axios'
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.'
]);
const Delivery = ({navigation, userState}) =>{
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [log,setlog] = useState(false);
  const [data,setData] = useState(null);
 const[ region ,setRegion] =useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025
})
const handleSubmit = () =>{
  //let adr = getaddress(region.latitude,region.longitude)
  axios.post('https://enigmatic-mesa-42065.herokuapp.com/user/submit',{user_id: userState.userInfo.id,location:{latitude:region.latitude,longitude:region.longitude},repair_type}).then((res) => {
      if(res.data.status == "Sorry No worker Available"){
        Alert.alert("No worker Available")
      }
      else{
        console.log(res.data)
        var startDate = new Date();
      setData(res.data.details.id)
      navigation.navigate('Tracker',{data:res.data.details.id,start:startDate,worker_id:res.data.details.worker_id})
    }
  }).catch((err) => {
    console.log(err);
  })
}
const getaddress = async (lat,lng) =>{
  var addressComponent
    await axios.get( 
     "http://www.mapquestapi.com/geocoding/v1/reverse?key="+KEY+"&location="+lat+","+lng+"&includeRoadMetadata=true&includeNearestIntersection=true",
      {
        headers: {
          "Content-type": "application/json"
        }
      }
    ).then(
      (response) => {
       // console.log(response.data)
      }
    )
   }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({...region,longitude:location.coords.longitude,latitude:location.coords.latitude})
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 
  else if (location) {
    text = JSON.stringify(location);
    return(
      <View style ={{flex:1, marginBottom:0}}>
    <MapView
    style={{ flex: 1 }}
    showsUserLocation = {true}
    showsMyLocationButton = {true}
    onRegionChangeComplete = {setRegion}
    initialRegion={region}
  />
  <View style = {{top:'50%', left:'50%', marginLeft:-24,marginTop:-48,position:'absolute'}}>
    <Image style = {{width:24,height:24}} source = {require('../assets/marker.png')}></Image>
  </View>
  <View>
  <TouchableOpacity style={styles.subtn} onPress = {handleSubmit} ><Text style = {styles.buttonTextStyle}>Submit</Text></TouchableOpacity>
  </View>
  </View>
  );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>);
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1'
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center'
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 20,
    },
    subtn:{
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
    }
  });

  const mapStateToProps = state => {
    return {
      userState: state.user
    }
  }

  export default connect(mapStateToProps, null)(Delivery); 
