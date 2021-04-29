import axios from "axios"
import React, { useEffect } from "react"
import {Text, View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert} from "react-native"
import AsyncStorage from '@react-native-community/async-storage'
import { useState } from "react"

export default function LogInForm( {navigation} ) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    /*useEffect(() => {
      initialiseValues()
    }, [])*/

    /*const initialiseValues = () => {
      setEmail("")
      setPassword("")
    }*/

    const initialEmail = {
      email: ""
    }

    const initialPassword = {
      password: ""
    }

    const storeToken = async (value) => {
      try {
        await AsyncStorage.setItem('token', value)
      }
      catch(error) {
        console.log(error)
      }
    }

    const handleLogIn = async () => {
        await axios.post('http://192.168.1.108:3000/login/customer', {email, password})
            .then((response) => {
                console.log(response)
                if(response.data.token) {
                  storeToken(response.data.token)
                }
                Alert.alert('Log In Successful!')
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Profile' }],
                });
            })
            .catch((error) => {
                console.log(error)
                Alert.alert("Log In Unsuccessful!")
            })
    }

    return (
    <SafeAreaView style = {styles.container}>
    <Text style = {styles.logo}>Repair Dukaan</Text>
      <View style = {styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#003f5c"
            onChangeText = {setEmail}
            keyboardType = 'email-address'
          />
      </View>
      <View style = {styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            secureTextEntry = {true}
            onChangeText = {setPassword}
          />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress = {handleLogIn}>
          <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40,
      },
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white"
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:20
      },
      loginText:{
        color:"white"
      }
})
