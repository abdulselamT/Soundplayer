import  React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,FlatList } from 'react-native';
import { Slider } from "@react-native-assets/slider";
import { Audio } from 'expo-av';
import { allfiles } from "./Ousme";
export default function Just() {
  const[files,setFiles]=useState(allfiles)
  const [sound, setSound] = useState(null);
  const [currentTime,setCurrentTime]=useState(0)
  const [totalTime,setTotalTime]=useState(0)
  const [isplaying,setIsPlaying]=useState(false)




  async function playSound() {
    const sound = new Audio.Sound();
   
    //sound.progressUpdateIntervalMillis=1500;
    
    await sound.loadAsync(require('./al-budair/ባፈድል______ክፍል__-1.m4a'),{
        progressUpdateIntervalMillis: 500,
        positionMillis: 300000,
        shouldPlay: true,
        rate: 1.0,
        shouldCorrectPitch: false,
        volume: 1.0,
        isMuted: false,
        isLooping: false,
      });
    sound.setOnPlaybackStatusUpdate((status)=>{console.log(status)});
    //await sound.playAsync();
    

}



  return (
    <View style={{marginTop:50}}>
      <Button title="Play Sound" onPress={playSound} />
      
     
      
    </View>
  );
}