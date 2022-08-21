import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "./constants";

function Button({button_text,refresh,setRefresh})
{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonStyle} onPress={
                  ()=>{
                    console.log("Hello there...");
                    setRefresh(true);
                  }
                } >
            <Text style={styles.buttonText}>{button_text}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        elevation: 25,
        shadowColor: COLORS.shadowColor,
        borderColor: "#000"
    },
    buttonStyle:{
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: '60%',
    },
    buttonText:{
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 22,
        textAlign: 'center'
    }
})

export default Button;