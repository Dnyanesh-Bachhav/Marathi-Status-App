import { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import Button from '../components/button';
import { COLORS } from '../components/constants';
function NoInternetScreen({refresh,setRefresh}){
    const message = "Please check your\nInternet Connection...";
    return(
        <View style={styles.container}>
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "72%",
            alignSelf: 'center',
            backgroundColor: COLORS.gray
          }}
          
          source={require("../assets/77124-nointernet.json")}
          speed={0.7}
        />
             <Text style={styles.connectionText}>{message}</Text>
             <Button button_text="Refresh" refreshValue={refresh} setRefresh={setRefresh} />
         </View>
     );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray,
    },
    connectionText:{
        color: COLORS.primary,
        fontSize: 21,
        fontWeight: '700',
        marginTop: -80,
        marginBottom: 40,
        textAlign: 'center'
    }
})


export default NoInternetScreen;