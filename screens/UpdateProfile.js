import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Alert, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import axios from "axios"
import { connect } from 'react-redux';
import {getUserInfo} from '../redux/user/userActions'

function UpdateProfile({ authState, userState, navigation, getInfo }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        setFirstName(userState.userInfo.first_name)
        setLastName(userState.userInfo.last_name)
        setPhoneNumber(userState.userInfo.phone_number)
    }, []);

    /*const handleGetProfile = async () => {
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

    const handleUpdate =   () => {
        axios.put(`http://192.168.1.108:3000/api/user/updateprofile/${userState.userInfo.id}`, {firstName, lastName})
        .then((response) => {
            console.log(response)
            Alert.alert("Sucessful update!")
            getInfo(authState.token)
            navigation.navigate("Profile")
        })
        .catch((error) => {
            console.log(error)
            Alert.alert("Unsuccessful!")
            navigation.navigate("Profile")
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)