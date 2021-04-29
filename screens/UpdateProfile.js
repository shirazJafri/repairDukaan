import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Alert, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
//const Registerapi = axios.create({baseURL:'http://localhost:3000/signup/customer'});
import axios from "axios"

export default function UpdateProfile({ navigation }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    /*useEffect({
        handleGetProfile();
    }, []);

    const handleGetProfile = async () => {
        await fetch("http://localhost:3000/api/customer/getprofile", {
            method: "GET",
            headers: { token: localStorage.token }
        }).then((response) => response.json())
        .then((response) => {
            setFirstName(response.first_name)
            setLastName(response.last_name)
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
            Alert.alert("Unsuccessful")
        })
    }*/

    const handleUpdate = async () => {

    }


    return (
        <SafeAreaView style = {styles.container}>
            <Text style={styles.logo}>Repair Dukaan</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value = {firstName}
                    placeholder = 'First Name'
                    placeholderTextColor="#003f5c"
                    onChangeText={setFirstName}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value = {lastName}
                    placeholder = 'Last Name'
                    placeholderTextColor="#003f5c"
                    onChangeText={setLastName}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value = {phoneNumber}
                    placeholder = 'Phone Number'
                    placeholderTextColor="#003f5c"
                    onChangeText={setPhoneNumber}
                    keyboardType = 'number-pad'
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleUpdate}>
                <Text style={styles.loginText}>UPDATE</Text>
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