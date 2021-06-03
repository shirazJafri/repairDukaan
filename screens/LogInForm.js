import React, { useEffect } from "react"
import {Text, View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, ToastAndroid} from "react-native"
import { useState } from "react"
import { connect } from "react-redux"
import {signIn} from '../redux'
import { Alert } from "react-native"

function LogInForm( {authState, logIn, navigation} ) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(authState)

    if (!authState.loading && authState.token) {
      navigation.navigate('DrawerNavigation')
    }
    else if (!authState.loading && authState.error) {
      Alert.alert('Unsuccessful Log-In!')
    }

    return authState.loading ? (
      <View style = {styles.activity}>
      <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
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
      <TouchableOpacity style={styles.loginBtn} onPress = {() => logIn(email, password)}>
          <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      </SafeAreaView>
    )
}


const mapStateToProps = state => {
  return {
      authState: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logIn: (email, password) => dispatch(signIn(email, password))
  }
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
      },
      activity: {
        flex: 1,
        justifyContent: "center"
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
