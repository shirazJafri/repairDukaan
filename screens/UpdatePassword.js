import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, Alert, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux';

function UpdatePassword({ authState, navigation }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleUpdatePassword = async () => {
        await axios.post("http://192.168.1.108:3000/api/customer/change", {currentPassword, newPassword}, {
            headers: {
                "token": authState.token
            }
        })
        .then((response) => {
            Alert.alert('Change of Password Successful!')
            console.log(response.data.message);
            navigation.navigate('Profile')
        })
        .catch((error) => {
            Alert.alert("Change of Password Unsuccessful!")
            console.log(error)
        })
    }

    return(
        <SafeAreaView style = {styles.container}>
            <Text style={styles.logo}>Repair Dukaan</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value = {currentPassword}
                    placeholder = 'Current Password'
                    placeholderTextColor="#003f5c"
                    onChangeText={setCurrentPassword}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value = {newPassword}
                    placeholder = 'New Password'
                    placeholderTextColor="#003f5c"
                    onChangeText={setNewPassword}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleUpdatePassword}>
                <Text style={styles.loginText}>Update Password</Text>
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
        authState: state.auth
    }
}

export default connect(mapStateToProps, null)(UpdatePassword);