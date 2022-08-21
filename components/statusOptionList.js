import {View,StyleSheet,Text,Image, Dimensions, TouchableOpacity,ScrollView } from "react-native";
import {statusIcons,image_url} from './constants';
function StatusOptionList({navigation}){
    let listOptionHeight = (20/100)*Dimensions.get('window').height;
    return(
    <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false} >
        <View style={styles.container} >
            <View style={styles.list} >
               { statusIcons.array.map((item,index) => (
                <View style={{...styles.listOption,height: listOptionHeight}} key={index} >
                    <TouchableOpacity style={{height: '100%'}} onPress={()=> navigation.navigate("StatusList",{
                        statusTitle: item.title,
                        englishTitle: item.englishTitle
                    }) } >
                    <Image source={item.image_url} style={{resizeMode: 'contain',width: '100%',height: '80%' }} />    
                    <StatusTitle title={item.title}/>
                    </TouchableOpacity>
                </View>
                ))} 
                </View>
        </View>
    </ScrollView>
    );
}

const StatusTitle = ({title})=>{
    return(
        <View style={styles.title}>
            <Text style={{color:"#9C27B0",textAlign: 'center',fontSize: 20, fontWeight: 'bold',padding: 5 }} >{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
       flex: 1,
       padding: 2,
       height: '100%',
       marginTop: 12
    },
    list:{
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingBottom: 20
    },
    listOption:{
        width: '42%',
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        elevation: 8
    },
    title:{
        position: 'absolute',
        flex: 1,
        textAlign: 'center',
        bottom: 0,
        width: '100%',
    },
    scrollViewStyle:{
        height: '100%',
    }
})
export default StatusOptionList;