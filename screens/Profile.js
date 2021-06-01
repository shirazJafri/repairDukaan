import React from 'react';
import { StyleSheet, Text, Image, View, Alert, StatusBar} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import logo from '../assets/Person.jpeg';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

function Profile({authState}) {
    const [first_name, setFname] = React.useState("");
    const [last_name, setLname] = React.useState("");
    const [joined_date, setjoinedDate] = React.useState("");

    React.useEffect(() => {
        handleLogIn();
    }, []);

    const handleLogIn = async () => {
        //console.log("hello");
        /*await fetch("http://192.168.1.108:3000/api/customer/getprofile", {
            method: "GET",
            headers: { "token" :   route.params.paramKey }
        }).then((response) => response.json())
            //await axios.get('http://localhost:3000/api/customer/getprofile')
            .then((response) => {
                setFname(response.first_name)
                setLname(response.last_name)
                setjoinedDate(response.date_joined)
                //Alert.alert(response)
                console.log(response);
            })
            .catch((error) => {
                console.log(headers.token)
                console.log(error)
                Alert.alert("Unsuccessful")
            })*/
            await axios.get("http://192.168.1.108:3000/api/customer/getprofile", {
                headers: {
                    "token": authState.token
                }
            })
            .then((response) => {
                setFname(response.data.first_name)
                setLname(response.data.last_name)
                setjoinedDate(response.data.date_joined)
                //Alert.alert(response)
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
                Alert.alert("Unsuccessful")
            })
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Image source={logo} style={{ width: 100, height: 130 }} />
                <Text style={{ color: '#888', fontSize: 18, textAlign: 'center' }}>{first_name}  {last_name}</Text>
                <Text style={{ color: 'black', width: 350, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>Joined Date: <Text style={{ color: "red" }}>  {joined_date}  </Text></Text>
                <Text style={{ color: 'black', width: 350, fontSize: 22, borderWidth: 2, borderColor: 'black', marginVertical: 0, textAlign: 'center' }}>Bookings Undertaken: <Text style={{ color: "red" }}>55</Text></Text>
                <View style={styles.lineStyle} />
                <Text style={{ color: '#888', fontSize: 30, marginVertical: 0, textAlign: 'center' }}>RECENT BOOKINGS</Text>
                <Text style={{ color: 'black', width: 300, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>31, January 2021 <Text style={{ color: "red", width: 350, fontSize: 22, borderWidth: 2, marginVertical: 20, textAlign: 'center' }}>  Rs. 61</Text></Text>
                <Text style={{ color: 'black', width: 300, fontSize: 22, borderWidth: 2, borderColor: 'black', marginVertical: 0, textAlign: 'center' }}>1, Febuary 2021  <Text style={{ color: "red" }}>   Rs. 77</Text></Text>
                <StatusBar style="auto" />
            </View>
        </SafeAreaProvider>
    );
}

const mapStateToProps = state => {
    return {
        authState: state
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

export default connect(mapStateToProps, null)(Profile);

