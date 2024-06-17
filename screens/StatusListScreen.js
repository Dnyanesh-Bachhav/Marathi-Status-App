import react, { useEffect, useLayoutEffect, useState } from "react";
import {View,StyleSheet,Dimensions, Text, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator, ToastAndroid,Linking,Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import NoInternetScreen from "./NoInternetScreen";
import NetInfo from  '@react-native-community/netinfo';
import { COLORS, dummyData } from "../components/constants";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { collection, doc, getDoc, getDocFromCache, getDocs, getFirestore } from "firebase/firestore";
import {app} from '../firebase';
import * as Sharing from 'expo-sharing';
import { list } from "firebase/storage";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import { FlashList } from "@shopify/flash-list";
import { async } from "@firebase/util";

const ICON_SIZE = 20;
const CARD_HEIGHT_PER = 24;
const COLUMN_NUM = 2;


function Status_Options({navigation,route}){

    const [imgArray,setImgArray] = useState(null);
    const [downloading,setDownloading] = useState("");
    const [downloadingCount,setDownloadingCount] = useState("0%");
    const [selectImage,setSelectImage] = useState(null);
    const [sharing,setSharing] = useState(null);
    const [albumData,setAlbumData] = useState(null);
    const [refresh,setRefresh] = useState(true);


    // Set title in the header
    useLayoutEffect(() => {
        navigation.setOptions({
          title: route.params.statusTitle
        });
      }, [navigation]);
    let listOptionHeight = (CARD_HEIGHT_PER/100)*Dimensions.get('window').height;
    let [connected,setConnected] = useState(false);
    let [isDownloadSection,setIsDownloadSection] = useState(false);

    // Fetch documents from firebase
    async function getData(activeTab){
        console.log("GetData called...");
        console.log("GetData called..."+activeTab);
        const db = getFirestore();
        const collectionRef = collection(db,activeTab);
        getDocs(collectionRef).then((snapshot)=>{
            let data = [];
            snapshot.docs.forEach((doc)=>{
                data.push({ ...doc.data() });
            })
            // console.log(data);
            setImgArray(data);
        });        
    }

    // Download Image
    let downloadImage = async (uri, index) => {
      setDownloading(index);
      console.log("Download function Called...");
      const url = uri;
      console.log("Downloading:"+downloading+"Index"+index);
      console.log("Download Image Called..."+uri);
      const downloadPath = `${FileSystem.documentDirectory}${Date.now()}${".png"}`;
      
      const { uri: localUrl } = await FileSystem.downloadAsync(url,downloadPath);
      const callback = (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log("\nProgress"+progress);
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
      console.log("Permission in other section: "+ JSON.stringify(permission));
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        setDownloading(null);
        MediaLibrary.createAlbumAsync("Marathi Status", asset, true)
          .then(
            () =>{ ToastAndroid.show("Image Downloaded Successfully...", 2000)
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
        console.log("Function Called");
        setSharing(index);
        setDownloadingCount("Fetching...");
        console.log("Index"+index+" "+"ShowDownloading"+ downloading);
    
        console.log("URL"+url);
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
      await Sharing.shareAsync( localUrl);
    }
    // Open share dialogBox for Local URI
    let openShareDialogAsyncLocal = async (url)=> {
        console.log("Function called for local uri...");
        await Sharing.shareAsync(url);
    }
    async function getData1(){
      if(refresh)
      {
        setRefresh(false);
      }
      // Check if user is in Download Section
      if(route.params.englishTitle == "Download")
      {
          console.log("You are in Download Section...");
          setIsDownloadSection(true);
      }
  
      
        // check if user is connected or not
      const userConnected = await checkConnection();
      setConnected(userConnected);
      // set active tab
      const activeTab = route.params.englishTitle;
      
      
      if(userConnected)
      {
        if(route.params.englishTitle == "Download")
        {
              const getAlbumData12 = await getAlbumData();
              setAlbumData(getAlbumData12);
              console.log("AlbumData 1:"+getAlbumData12);
              console.log("You are in Download Section...");
              // setIsDownloadSection(true);
          }
          else{
            console.log(`You are in ${activeTab} Section...`);
             
            getData(activeTab);
          }
      }
      else{
        console.log("User id not connected...!!!");
      }
  
      } 
    useEffect(()=>{
      getData1();
    },[refresh]);

    return(
        <View style={styles.container} >
            {
            connected 
            ? 
            (
            !imgArray 
            ? ( !(isDownloadSection && albumData) ? 
                <View style={{flex: 1,justifyContent: 'center',alignItems:'center' }} >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
                : <SavedImages getAlbum={albumData} listOptionHeight={listOptionHeight} navigation={navigation} route={route} openShareDialogAsyncLocal={openShareDialogAsyncLocal} />
              )
            : (
                <FlashList
                    showsVerticalScrollIndicator={false}
                    data={imgArray}
                    columnWrapperStyle={{ alignItems: 'center', justifyContent: 'space-around' }}
                    contentContainerStyle={styles.flatListContainer}
                    renderItem={ ({item,index})=>(
                        <View style={{...styles.listOption,height: listOptionHeight}} onPress={()=>{
                            setSelectImage(item.image_url);
                        }} >

                            <View style={{width: '100%',height: '90%',position: 'relative' }} >
                            <TouchableOpacity style={{width: '100%',height: '100%'}} activeOpacity={0.4} onPress={()=>{
                                navigation.navigate("FullStatus",{
                                    statusTitle: route.params.statusTitle,
                                    englishTitle: route.params.englishTitle,
                                    image_url: item.image_url,
                                    isDownloadSection: false
                                });
                            }} >
                                <Image 
                                    source={{
                                        uri: item.image_url,
                                    }}
                                    style={{width: '100%',height: '100%',  resizeMode: 'cover',position:'absolute' }}
                                />
                            </TouchableOpacity>
                            {/* To show downloading percentage */}
                                {
                                    (index===downloading) ?<View style={{width: '100%',height: '100%',backgroundColor: 'rgba(97, 97, 97,0.8)',justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize: 20}}>1212{downloadingCount}</Text></View> : null
                                }
                                {
                                    (index===sharing) ?<View style={{position: 'absolute',width: '100%',height: '100%',backgroundColor: 'rgba(97, 97, 97,0.8)',justifyContent: 'center',alignItems: 'center' }}><Text style={{fontSize: 20}}>{downloadingCount}</Text></View> : null
                                }
                            </View>
                            
                            { isDownloadSection ? <ShareButton url={item.image_url} index={index} setSharing={setSharing} openShareDialogAsyncLocal={openShareDialogAsyncLocal} /> : <DownloadAndShare  downloadImage={downloadImage} setDownloading={setDownloading} url={item.image_url} index={index} setSharing={setSharing} downloading={downloading} openShareDialogAsync={openShareDialogAsync} /> }
                        </View>
                    ) }
                    numColumns={COLUMN_NUM}
                    keyExtarctor={item => item.id}
                    bounces={true}
                    extraData={selectImage}
                    estimatedItemSize={100}
                />
    //             <FlashList
    //   data={DATA}
    //   renderItem={({ item }) => <Text>{item.title}</Text>}
    //   estimatedItemSize={200}
    // />
                )
            //  </View>
            // </ScrollView>
            )
            : (
              !isDownloadSection ? (
              <View style={{ flex: 1,height: '100%' }} >
                <NoInternetScreen refresh={refresh} setRefresh={setRefresh} /> 
              </View>)
              : (
               !albumData ?
               <View style={{flex: 1,justifyContent: 'center',alignItems:'center' }} >
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
                : <SavedImages getAlbum={albumData} listOptionHeight={listOptionHeight} navigation={navigation} route={route} openShareDialogAsyncLocal={openShareDialogAsyncLocal} />
              )
              )
            }
         </View>
    );
}
// Download and share button for every card item
const DownloadAndShare = ({ downloadImage,url,index, downloading,setDownloading,openShareDialogAsync,setSharing,isLocalUri,localUri})=>{
    return(
        <View style={styles.iconContainer}>
            <View style={styles.iconList}>
                <TouchableOpacity onPress={async ()=>{
                    console.log("Download Button Clicked..."+url);
                    await setDownloading(index1 => index);
                    await downloadImage(url,index);
                    console.log(downloading);
                }} >
                    <Feather name="download" size={ICON_SIZE} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    console.log("Share Button Clicked..."+url);
                    setSharing(index);
                    openShareDialogAsync(url,index);
                }} >
                        <Ionicons name="share-social-outline" style={{fontWeight: 900}} size={ICON_SIZE} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Share Component only
const ShareButton = ({localUri,openShareDialogAsyncLocal})=>{
    return(
        <View style={styles.iconContainer}>
            <View style={styles.iconList}>
                <TouchableOpacity onPress={()=>{
                    openShareDialogAsyncLocal(localUri);
                }} >
                    <Entypo name="share" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Get Downloaded Images
const SavedImages = ({getAlbum,listOptionHeight,navigation,route,openShareDialogAsyncLocal})=>{
  
   return (
     <View style={{ flex: 1 }}>
       {
       getAlbum!= "null" ? (
       <FlashList
         showsVerticalScrollIndicator={false}
         data={getAlbum}
         columnWrapperStyle={{
           alignItems: "center",
           justifyContent: "space-evenly",
         }}
         contentContainerStyle={styles.flatListContainer}
         renderItem={({ item, index }) => (
           <View style={{ ...styles.listOption, height: listOptionHeight }}>
             <View
               style={{ width: "100%", height: "90%", position: "relative" }}
             >
               <TouchableOpacity
                 style={{ width: "100%", height: "100%" }}
                 activeOpacity={0.4}
                 onPress={() => {
                   navigation.navigate("FullStatus", {
                     statusTitle: route.params.statusTitle,
                     englishTitle: route.params.englishTitle,
                     image_url: item.uri,
                     isDownloadSection: true,
                     
                   });
                 }}
               >
                 <Image
                   source={{
                     uri: item.uri,
                   }}
                   style={{
                     width: "100%",
                     height: "95%",
                     resizeMode: "cover",
                     position: "absolute",
                   }}
                 />
               </TouchableOpacity>
             </View>
               <ShareButton localUri={item.uri} index={index} isLocalUri={true} openShareDialogAsyncLocal={openShareDialogAsyncLocal} />
           </View>
         )}
         numColumns={COLUMN_NUM}
        //  style={styles.flatListStyle}   
         keyExtarctor={(item) => item.id}
         bounces={true}
         estimatedItemSize={100}
       /> )
       : 
       <View style={{justifyContent: 'center',alignContent: 'center',backgroundColor: COLORS.secondary,height: '100%' }} >
              <Text style={styles.textStyle}>Download folder is empty...</Text>
       </View>
      }
     </View>
   );
}

async function getAlbumData(){
    const title = "Marathi Status";
    const urlArray = [];
    const permission = await MediaLibrary.requestPermissionsAsync();
    function checkData(item){
      return item.title=="Marathi Status";
    }
    // console.log("Permission in Download section: "+ JSON.stringify(permission));
    if(permission.granted)
    {
    const getPhotos =  await MediaLibrary.getAlbumAsync(title);
    const albumsArray =  await MediaLibrary.getAlbumsAsync();
    const currentAlbumData = JSON.stringify(getPhotos);
    // albumsArray.forEach((item,index)=>{
    //   console.log("Album Name: "+ item.title);
    // })  
    const value = albumsArray.find(checkData);
    const value1 = value ? value.title :  false;
    console.log("value: "+ albumsArray.find(checkData));
    console.log("Check for value1: "+value1);
    if(value1)
    {
    const getAllPhotos = await MediaLibrary.getAssetsAsync({
        album: getPhotos,
        sortBy: ['creationTime'],
        mediaType: ['photo']
    });
    
     getAllPhotos.assets.map((item)=>{
         urlArray.push({
            uri: item.uri,
            id:  item.id
        });
      });
    }
  else{
    console.log("Returned statement executed...");
    return "null";
  }
  }
  else{
    Alert.alert("Allow permission","Allow Storage(Media) permission to save photos locally on a device...",[
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
    return urlArray;
    // setAlbumData(getAllPhotos.assets);
}

async function checkConnection()
{
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected;
}



const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center'
    //paddingBottom: 20
  },
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: 'space-around'
  },
  listOption: {
    width: "90%",
    // borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 8,
    elevation: 8,
    marginBottom: 15
  },
  iconContainer: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    bottom: -1,
    // flex: 1,
    width: "100%",
  },
  iconList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
  scrollStyle: {
    // flex: 1,
  },
  flatListStyle: {
    paddingTop: 15,
    width: "100%",
    backgroundColor: COLORS.secondary,
  },
  flatListContainer: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  textStyle:{
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center'
  }
});
export default Status_Options;