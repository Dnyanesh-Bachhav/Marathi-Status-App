import { useState } from "react";
import {View,StyleSheet,Dimensions} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
function Status_Options(){
    let listOptionHeight = (30/100)*Dimensions.get('window').height;
    return(
        <View style={styles.container} >
            <View style={styles.list} >
                <View style={{...styles.listOption,height: listOptionHeight}}><DownloadAndShare/></View>
                <View style={{...styles.listOption,height: listOptionHeight}}><DownloadAndShare/></View>
            </View>
            
        </View>
    );
}

const DownloadAndShare = ()=>{
    return(
        <View style={styles.iconContainer}>
            <View style={styles.iconList}>
                <Feather name="download" size={24} color="white" />
                <Entypo name="share" size={24} color="white" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
       flex: 1,
       padding: 5,
       height: '100%',
       marginTop: 10
    },
    list:{
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    listOption:{
        width: '46%',
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: 'hidden',
    },
    iconContainer:{
        position: 'absolute',
        backgroundColor: "#9C27B0",
        bottom: 0,
        flex: 1,
        width: '100%',
    },
    iconList:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 3,
    }
})
export default Status_Options;