import react,{useState} from 'react';
import { StyleSheet, View, Text,StatusBar,Modal,TouchableOpacity } from 'react-native';
import Header from '../components/header';
import StatusOptionList from '../components/statusOptionList';
import {COLORS} from '../components/constants';
import { Entypo } from '@expo/vector-icons';
import Privacy_Policy from '../components/privacy_policy';

const ModalPopUp = ({visible,children})=>{
  return(
    <Modal transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalData}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

export default function HomeScreen({navigation}) {
  const [visible,setVisible] = useState(false);
  return (
    <View style={styles.container}>
      
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}} >
        <ModalPopUp visible={visible}>
            <View>
              <View style={styles.modalHeader}> 
                <TouchableOpacity onPress={()=>setVisible(false)}>
                  <Entypo name="cross" size={32} color="black" />
                </TouchableOpacity>
              </View>
              <Privacy_Policy/>
            </View>
        </ModalPopUp>
      </View>
        
        <Header setVisible={setVisible} />
        <StatusOptionList navigation={navigation} />
        <StatusBar style={styles.statusbar1} backgroundColor="#9C27B0" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusbar1:{
    backgroundColor: COLORS.primary,
  },
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalData:{
    width: '90%',
    height: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 10

  },
  modalHeader:{
    width: '100%',
    alignItems: 'flex-end'
  }
});
