import { StyleSheet, View, Image, Text,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
function Header({setVisible}){
    return(
        <View style={styles.header}>
            <Image 
                source={require("../assets/img_flag.png")}
                style={{...styles.imageStyle}}
            />
            <Text style={styles.headerText} >मराठी स्टेटस</Text>
            <Image 
                source={require("../assets/img_flag.png")}
                style={{...styles.imageStyle,marginLeft: 4}}
            />
            <TouchableOpacity style={{position: 'absolute',right: 10}} onPress={()=>{
                setVisible(true);
            }}  >
                <AntDesign name="infocirlceo" size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        header:{
            backgroundColor: "#9C27B0",
            width: '100%',
            flexDirection: 'row',
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        },
        headerText:{
            color: "#fff",
            fontSize: 24,
            fontWeight: "600",
            padding: 2
        },
        imageStyle:{
            width: 24,
            height: 24,
            padding: 10
        }
    }
)
export default Header;