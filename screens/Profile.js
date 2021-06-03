import React from 'react';
import { StyleSheet, Text, Image, View, Alert, StatusBar} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import logo from '../assets/Person.jpeg';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getUserInfo } from '../redux/user/userActions';
import { TouchableOpacity } from 'react-native';
import { signOut } from '../redux/auth/authActions';

function Profile({authState, userState, getInfo, loggingOut, navigation}) {
    React.useEffect(() => {
        getInfo(authState.token)
    }, []);

    console.log(userState)

    const handleLogOut = () => {
        loggingOut()
        navigation.navigate('LogIn')
    }

    
    return !userState.loading && userState.userInfo ? (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Image source={logo} style={{ width: 100, height: 130 }} />
                <Text style={{ color: '#888', fontSize: 18, textAlign: 'center' }}>{userState.userInfo.first_name}  {userState.userInfo.last_name}</Text>
                <Text style={{ color: 'black', width: 350, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>Joined Date: <Text style={{ color: "red" }}>  {userState.userInfo.date_joined}  </Text></Text>
                <Text style={{ color: 'black', width: 350, fontSize: 22, borderWidth: 2, borderColor: 'black', marginVertical: 0, textAlign: 'center' }}>Bookings Undertaken: <Text style={{ color: "red" }}>55</Text></Text>
                <View style={styles.lineStyle} />
                <Text style={{ color: '#888', fontSize: 30, marginVertical: 0, textAlign: 'center' }}>RECENT BOOKINGS</Text>
                <Text style={{ color: 'black', width: 300, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>31, January 2021 <Text style={{ color: "red", width: 350, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>  Rs. 61</Text></Text>
                <Text style={{ color: 'black', width: 300, fontSize: 22, borderWidth: 2, borderColor: 'black', marginVertical: 0, textAlign: 'center' }}>1, Febuary 2021  <Text style={{ color: "red" }}>   Rs. 77</Text></Text>
                <TouchableOpacity onPress = {() => navigation.navigate("UpdatePassword")}><Text>Update Password</Text></TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate("UpdateScreen")}><Text>Update Profile</Text></TouchableOpacity>
                <TouchableOpacity onPress = {handleLogOut}><Text>LOGOUT</Text></TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate("ContactUs")}><Text>Contact</Text></TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </SafeAreaProvider>
    ) : (
        <Text>Loading</Text>
    )
}

const mapStateToProps = state => {
    return {
        authState: state.auth,
        userState: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInfo: (tokenVal) => dispatch(getUserInfo(tokenVal)),
        loggingOut: () => dispatch(signOut())
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        borderBottomColor: "black",
        borderBottomWidth: 4,
        alignSelf: 'stretch',
        marginVertical: 25,
        width: "100%"
    },
    container: {
        alignSelf: "stretch",
        display: 'flex',
        height: '100%',
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

