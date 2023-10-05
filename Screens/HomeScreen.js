import {
  View,
  Text,
  StatusBar,
  Pressable,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";


import React, { useEffect, useState, useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign,Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Slider } from "@react-native-assets/slider";
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as FileSystem from "expo-file-system";
import { allfiles } from "./Ousme";

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentplay, setCurrentPlay] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [files, setFiles] = useState(null);
  const [currentIndex, setCurreIndex] = useState(0);
  const [disabled,setDisabled]=useState(false);

  useEffect(() => {
    setFiles(allfiles);
  }, [allfiles]);

  const handlePlayPause = async () => {
   
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
    setDisabled(false)
  };

  const skipto = async (value) => {
    
    if (Math.abs(value - currentTime) > 3000) {
      setDisabled(true)
      await currentSound.playFromPositionAsync(value);
      setIsPlaying(true);
      setDisabled(false)
    }
  };





  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const play = async (c) => {
    c=Math.abs(c)%files.length
    try {
      if (currentSound) {
        
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });


      
      const { sound, status } = await Audio.Sound.createAsync(
        files[c].filepath,
        {
          progressUpdateIntervalMillis: 3500,
          shouldPlay: true,
          positionMillis: 30000,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );
      console.log(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playFromPositionAsync();
      setDisabled(false);
      setCurreIndex(c);
      setCurrentPlay(files[c].name)
      
    } catch (err) {
      
      await currentSound.unloadAsync();
    }
  };
  const onPlaybackStatusUpdate = async (status) => {
    
    if (status.isLoaded && status.isPlaying) {
       console.log("good things ...")
      const progress = status.positionMillis / status.durationMillis;
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }

    if (status.didJustFinish === true) {
      setIsPlaying(!isPlaying);
    }
  };

  const xy =()=>{
    console.log("gdsufjcgwdbsujfgcbwuj",currentSound)
    currentSound.setStatusAsync({
      StatusUpdatesInMillis:10000
    });
  }
  const setData = async () => {
        
        try {
            var user = {
                Ind: currentIndex,
                Time: currentTime,
            }
            await AsyncStorage.setItem('UserData', JSON.stringify(user));
      
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
      try {
          
          AsyncStorage.getItem('UserData')
              .then(value => {
                  if (value != null) {
                      let user = JSON.parse(value);
                      play(user.Ind,user.Time);
                      startfrom(user.Time)
                     
                     
                  }
              })
      } catch (error) {
          console.log(error);
      }
  }




  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

      <View
        style={{
          width:'100%',
          padding:10,
          flexDirection:'row',
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#33ccff",
          
        }}
      >
        <View style={{flexShrink:1}}>
        <Text style={{ fontSize: 20,alignContent:'center', }}>
          ባፈድል በ ሸይኽ ሳላህ ሙሃመድ #ዳዕዋ_ቲቪ #daewatv 
          </Text>
          </View>
          <TouchableOpacity onPress={()=>{xy()}}>
          <AntDesign  style={{marginRight:10,}} name="youtube" size={50} color="red" />
          </TouchableOpacity>
      </View>
      <View style={{ height: 10, flexGrow: 1 }}>
        <FlatList
          data={files}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={[
                {
                  borderBottomColor: "black",
                  borderBottomWidth: 0.2,
                  padding: 5,
                  paddingBottom: 15,
                  paddingTop: 15,
                },
                {
                  backgroundColor:
                    index === currentIndex
                      ? "#993366"
                      : index % 2
                      ? "#abcf"
                      : "#D6EEEE",
                },
              ]}
            >
              <TouchableOpacity
                disabled={disabled}
                style={{ flexDirection: "row" }}
                onPress={ async () => {
                     setDisabled(true);
                     setCurrentPlay(item.name);
                     play(index);
                     setCurreIndex(index);
                }}
              >
                <Text
                  style={{
                    width: 30,
                    borderRightColor: "black",
                    borderRightWidth: 0.2,
                    marginRight: 5,
                  }}
                >
                  {index + 1}
                </Text>
                <Text style={{color: index === currentIndex?'white':null}}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 25,
          backgroundColor: "#33ccff",
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 5,
            }}
          >
            {disabled&&<ActivityIndicator size="large"/>}
            <Text style={{ alignContent: "center",fontWeight:'bold' }}>{currentplay}</Text>
          </View>
          <Slider
            style={{ backgroundColor: "transparent", width: "auto" }}
            minimumValue={0}
            maximumValue={totalDuration}
            value={currentTime}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="#999999"
            onValueChange={skipto}
            
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
          }}
        >
          <View>
            <Text>{formatTime(currentTime)}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <TouchableOpacity onPress={()=>{setData()}} >
                  <Feather name="bookmark" size={30} color="blue" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
              disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  play(currentIndex-1);
                  
                  
                }}
              >
                <AntDesign name="stepbackward" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity  onPress={() => {setDisabled(true);handlePlayPause()}}>
                {isPlaying ? (
                  <AntDesign name="pausecircle" size={30} color="black" />
                ) : (
                  <AntDesign name="play" size={30} color="black" />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setDisabled(true);
                  play(currentIndex+1);
                }}
              >
                <AntDesign name="stepforward" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity disabled={disabled} onPress={()=>{setDisabled(true);getData(); }}>
              <AntDesign name="playcircleo" size={30} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>{formatTime(totalDuration)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
