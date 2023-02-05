import react, { useLayoutEffect,useState } from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity,ToastAndroid,Alert } from 'react-native';
import { COLORS } from "../components/constants";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
function Full_ImageScreen({navigation,route}){
    const ICON_SIZE = 34;
    
    const [sharing,setSharing] = useState(null);
    const [downloadingCount,setDownloadingCount] = useState("0%");
    let [downloading,setDownloading] = useState(null);

    // Download Image
    let downloadImage = async (uri, index) => {
        const url = uri;
        // console.log("Downloading:"+downloading+"Index"+index);
        // console.log("Download Image Called..."+uri);
        const downloadPath = `${FileSystem.documentDirectory}${Date.now()}${".png"}`;
        
        const { uri: localUrl } = await FileSystem.downloadAsync(url,downloadPath);
        const callback = (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          // console.log("\nProgress"+progress);
          const count = Math.round(progress * 100);
          setDownloadingCount(`${count + "%"}`);
        };
        const downloadInstance = FileSystem.createDownloadResumable(
          uri,
          downloadPath,
          {},
          callback
        );
  
        const result = await downloadInstance.downloadAsync();
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          const asset = await MediaLibrary.createAssetAsync(result.uri);
          setDownloading(null);
          MediaLibrary.createAlbumAsync("Marathi Status", asset, true)
            .then(
              () =>{ ToastAndroid.show("Image Downloaded Successfully...!!!", 1000)
              // console.log("Loal URI:"+localUrl);
              // console.log("Local URI__:"+result.uri);
  
          }
              // Alert.alert("Status","File Downloaded Successfully...!!!",[{text:"Ok"}])
            )
            .catch((err) => console.log("Error in saving file"+err));
          // console.log('Finished downloading to ', localUrl);
        }
        else{
            Alert.alert("Allow permission","Allow Storage(Files and Media) permission to save photos locally on a device...",[
              {
                text: 'Ok',
                onPress: ()=>{
                  console.log("Ok Pressed...")
                  const pkg = Constants.manifest.releaseChannel
                  ? Constants.manifest.android.package 
                  : 'host.exp.exponent'; // In expo client mode  
                  IntentLauncher.startActivityAsync(
                    IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
                    { data: "package:" + pkg }
                  );
                }
              },
              {
                text: 'Cancel',
                onPress: ()=>{
                  ToastAndroid.show("Permission required...", 2000);
                  console.log("User do not allowed to permission...")
              },
              style: 'cancel'
              }
            ])
          
        }
        setDownloadingCount(0);
      };

    // Open share dialogbox
    let openShareDialogAsync = async (url,index) => {
        // setItemName(index);
        // console.log("Function Called");
        setSharing(index);
        setDownloadingCount("Fetching...");
        // console.log("Index"+index+" "+"ShowDownloading"+ downloading);
    
        // console.log("URL"+url);
        const nameOfImage = Date.now();
        const downloadPath = `${FileSystem.cacheDirectory}${nameOfImage}${".png"}`;
        const { uri: localUrl } = await FileSystem.downloadAsync(url,downloadPath);
        console.log("Download URL"+localUrl);
        // setShowFetching(null);
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert("Message","Uh oh, sharing isn't available on your platform",[{text: "Ok"}]);
            return;
        }
    
      setDownloadingCount(null);
      setSharing(null);
      await Sharing.shareAsync(localUrl);
    }


    // Set title in the header
    useLayoutEffect(() => {
        // console.log("fullStatus:"+route.params.englishTitle);
        // console.log("IsDownloadSection"+route.params.isDownloadSection);
        navigation.setOptions({
          title: route.params.statusTitle
        });
      }, [navigation]);


    // Open share dialogBox for Local URI
    let openShareDialogAsyncLocal = async (url)=> {
        // console.log("Function called for local uri...");
        await Sharing.shareAsync(url);
    } 


    return(
        <View style={styles.container}>
          
          <View style={{width: '100%',height: '50%',borderWidth: 1}} >
          {
              (1===sharing) ?<View style={{position: 'absolute',width: '100%',height: '100%',backgroundColor: 'rgba(97, 97, 97,0.8)',justifyContent: 'center',alignItems: 'center',zIndex: 1 }}><Text style={{fontSize: 45,color: COLORS.black}}>{downloadingCount}</Text></View> : null
          }
          {
              (1===downloading) ?<View style={{position: 'absolute',width: '100%',height: '100%',backgroundColor: 'rgba(97, 97, 97,0.8)',justifyContent: 'center',alignItems: 'center',zIndex: 1 }}><Text style={{fontSize: 45,color: COLORS.black}}>{downloadingCount}</Text></View> : null
          }
          <Image
                style={styles.imageStyle}
                source={{
                   uri:route.params.image_url
                }}
            />
            </View>
            <View style={styles.iconList} >
                {
                !route.params.isDownloadSection ? (
                <>
                    <TouchableOpacity style={styles.icon} onPress={()=>{
                    console.log("Download Button Clicked..."+route.params.image_url);
                    setDownloading(1);
                    downloadImage(route.params.image_url,1);
                }}  >
                        <Feather name="download" size={ICON_SIZE} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={()=>{
                    console.log("Share Button Clicked..."+route.params.image_url);
                    setSharing(1);
                    openShareDialogAsync(route.params.image_url,1);
                }}  >
                        <Ionicons name="share-social-outline" style={{fontWeight: 900}} size={ICON_SIZE} color="white" />
                    </TouchableOpacity>
                </>
                )
                :  ( <TouchableOpacity style={styles.icon}>
                        <Ionicons name="share-social-outline" style={{fontWeight: 900}} size={ICON_SIZE} color="white" onPress={()=>{
                    openShareDialogAsyncLocal(route.params.image_url);
                }} />
                    </TouchableOpacity> )
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderWidth: 2
    },
    iconList:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.secondary,
        width: '100%',
        paddingTop: '25%'
    },
    icon:{
        backgroundColor: COLORS.primary,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12,
        elevation: 12
    }
})
export default Full_ImageScreen;