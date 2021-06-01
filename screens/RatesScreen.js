import {StyleSheet, View, Text, FlatList, ActivityIndicator, StatusBar} from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

function RatesScreen() {
    const [ratesList, setRatesList] = useState()

    useEffect(() => {
        axios.get('http://192.168.1.108:3000/api/rates/get')
            .then((response) => {
                console.log(response)
                setRatesList(response.data.data.rates)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];

      const Item = ({ repair_type, rateOfRepair }) => (
        <View style={styles.flatview}>
          <Text style={styles.name}>{repair_type}</Text>
          <Text style = {styles.email}>{rateOfRepair}</Text>
        </View>
      );
    
      const renderItem = ({ item }) => (
        <Item repair_type={item.repair_type} rateOfRepair = {item.rateOfRepair} />
      );

    ratesList ? console.log(ratesList) : console.log("Loading")

    return ratesList ? (
        <View style = {styles.container}>
            <Text style = {styles.h2text}>Rates List</Text>
        <FlatList
            data={ratesList}
            renderItem={renderItem}
            keyExtractor={item => item._id}
      />
        </View>
    ) : (
        <View>
            <View style = {styles.activity}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      h2text: {
        marginTop: 10,
        fontFamily: 'sans-serif',
        fontSize: 36,
        fontWeight: 'bold',
      },
      flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
      },
      name: {
        fontFamily: 'Verdana',
        fontSize: 18
      },
      email: {
        color: 'red'
      },
      activity: {
        flex: 1,
        justifyContent: "center"
      }
})
  
export default RatesScreen;