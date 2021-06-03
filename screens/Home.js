import Contact from './Contact';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import car from '../assets/car.jpeg';
//import bike from '../assets/bike.jpeg';
//import display from '../assets/display.png';
import axios from 'axios';
import Report from './Report'
import { connect } from 'react-redux';
const dateFormat = require('dateformat');
import {getUserInfo} from '../redux/user/userActions'

//const router = require('express').Router();



function Home({ navigation, authState, userState, getInfo }) {

  /*router.route('/getBooking/:id').get((req, res) => {
    Bookings.findById(req.params.id)
      .then(Bookings => res.json(Bookings))
      .catch(err => res.status(400).json('Error: ' + err));
  });*/

  const [ID, setID] = React.useState("");
  const [Type, setType] = React.useState("");
  const [Location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const [Fare, setFare] = React.useState("");
  const [Status, setStatus] = React.useState("");
  const [Email, setEmail] = React.useState("");

  const [ID2, setID2] = React.useState("");
  const [Type2, setType2] = React.useState("");
  const [Location2, setLocation2] = React.useState("");
  const [date2, setDate2] = React.useState("");
  const [Fare2, setFare2] = React.useState("");
  const [Status2, setStatus2] = React.useState("");
  const [Email2, setEmail2] = React.useState("");

  const [Current, setCurrent] = React.useState(false);
  const [Past, setPast] = React.useState(false);




  React.useEffect(() => {
    handleLogIn();
    getInfo(authState.token)
  }, []);
  
  const handleLogIn = async () => {
    
        await axios.get("http://192.168.1.108:3000/getBooking/email@hotmail.com", {
        })
        .then((response) => {

          var data = response.data;

          for (var i = 0; i < data.length; i++){
              if (data[i].Status == 1){

                setID(data[i].ID)
                setType(data[i].Type)
                setLocation(data[i].Location)
                setDate(dateFormat(data[i].date, "ddd mmm dd yyyy" ))
                setFare(data[i].Fare)
                setStatus(data[i].Status)
                setEmail(data[i].Email)

                setCurrent(Current)
              }

              if (data[i].Status == 0){

                setID2(data[i].ID)
                setType2(data[i].Type)
                setLocation2(data[i].Location)
                setDate2(dateFormat(data[i].date, "ddd mmm dd yyyy" ))
                setFare2(data[i].Fare)
                setStatus2(data[i].Status)
                setEmail2(data[i].Email)

                setPast(Past)

              }
          }
            //Alert.alert(response)
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
            //Alert.alert("Unsuccessful")
        })
}
  

  return (
     <SafeAreaProvider>
     <View style={styles.container}>
     <Text style = {{textAlign : 'center', color :'#364f6b', fontWeight: 'bold', marginVertical: 20 }}>BOOK A CAR OR BIKE MECHANIC</Text>
     <View style = {{flexDirection : 'row'}}><Image source={{uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}} style={{ width: 150, height: 120}} />{/*<Image source={bike} style={{ width: 150, height: 120}} />*/}</View>
     <TouchableOpacity onPress={() => {navigation.navigate('Contact')}} style={styles.button}>
         <Text style={styles.buttonText}>BOOK NOW</Text>
       </TouchableOpacity>
       {Current == true ? {/*<Image source={display} style={{ width: 300, height: 200}} />*/} : <View style = {{flexDirection : 'row'}}><Text style = {{color : '#364f6b' , width: 300, fontWeight : 'bold', borderWidth: 3, borderColor: '#3cb371', borderRadius: 15, backgroundColor : '#fff', marginVertical: 20, textAlign : 'left'}}>Current Request {"\n"}  {date} {'\n'}  {Location}{'\n'}  PKR {Fare}</Text></View>}
       {Past == true ? null : <View style = {{flexDirection : 'row'}}><Text style = {{color : '#364f6b' , width: 300, fontWeight : 'bold', borderWidth: 3, borderColor: '#98fb98', borderRadius: 15, backgroundColor : '#fff',  marginVertical: 0, textAlign : 'left'}}>  Past Requests{"\n"}  {date2}{'\n'}  {Location2}{'\n'}  EXPECTED PKR {Fare2}</Text></View>}    
          
       

       <StatusBar style="auto" />
       
      
     </View>
     </SafeAreaProvider>  
  

  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 12,
    borderRadius: 60,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }, 
});

const mapStateToProps = state => {
  return {
    authState: state.auth,
    userState: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInfo: (tokenVal) => dispatch(getUserInfo(tokenVal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);