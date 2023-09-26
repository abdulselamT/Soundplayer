import React, { useState, useCallback, useRef,useEffect } from "react";
import { Button,ScrollView, View, StyleSheet,TouchableOpacity,Alert,StatusBar,Text,FlatList,RefreshControl } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {useNetInfo} from "@react-native-community/netinfo";
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import { all_daewas } from '../../Filej';
import { Card } from "react-native-paper";

const Disp = ({navigation,route}) => {
    const [flag,setFlag]=useState(false)
    const [playing, setPlaying] = useState(false);
    const [refreshing,setRefreshing]=useState(false)
    const [vidid,setVidid]=useState("y2lfhJBYNBw");
    const [vids,setVids]=useState(null);
    const [pr,setPr]=useState('');
    const [check,Setcheck]=useState(false);
    const [playingindex,setPlayingIndex]=useState(0);
    const [favs,setFavs] =useState({'collection':[]})
    const netInfo = useNetInfo();
    
    


    try{
     let ax =route.params.ustaz_name;
    }
    catch{
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Card style={{paddingVertical:30,padding:10,}}>
            <Text style={{fontSize:20,alignContent:'center'}}>
              First Select Content <FontAwesome name="list-ul" size={24} color='black' />,once selected your lists will appear here.
            </Text>
          </Card>
        </View>
      )
    }
    useEffect(
      ()=>{
        setRefreshing(true);
        setVids(all_daewas[0][route.params.ustaz_name]);
        setVidid(all_daewas[0][route.params.ustaz_name][0]['key'])
        setPlayingIndex(0);
        setRefreshing(false);
      }
    
    ,[route.params.ustaz_name])
     const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
      }, []);
    
      const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);
      const onError =(error)=>{
        Alert.alert("check your Internet Connection");
        setPlaying(false);
        setVidid("y2lfhJBYNBw");
      }
    
  return (
    <View style={styles.con}>
        <View>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

        </View>
        
        <View style={styles.second}>
          <YoutubePlayer
            height={230}
            play={playing}
            videoId={vidid}
            onChangeState={onStateChange}
            onError={onError}
          />
       
        </View>
        
        <View style={styles.third}>
            
        <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
            data={vids}
            renderItem={({item,index})=>(
            <View style={[styles.item, {backgroundColor:playingindex==index ?'#e6f0bf':'#72A0C1' }]} >
                <TouchableOpacity
                  style={{display:'flex',flexDirection:'row',}}
                  onPress={()=>{setVidid(item.key);setPlayingIndex(index)}} 
                  > 
                      <Text style={{width:'5%',alignSelf:'center'}}>{index + 1}</Text>
                      <Text style={{flexShrink:1,width:'95%',paddingLeft:10,}}>{item.title}</Text>
                </TouchableOpacity>

               
            </View>
            )
            }

            refreshControl={
               <RefreshControl
                 refreshing={refreshing}
                 colors={['#72A0C1']}
                />
               }

          />




        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    con:{
        display:'flex',
        flexGrow:1,
        backgroundColor:'#72A0C1',
        borderColor:'#72A0C1'
    },
    first:{
        backgroundColor:'blue',
        
    },
    second:{
        backgroundColor:'black',
    },
    third:{
        backgroundColor:'#72A0C1',
        flexGrow:1,
        height:10,
    },
    item:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'black',
        borderBottomWidth:1,
        paddingVertical:5,
    
      },
      listcontainer:{
        backgroundColor:'#72A0C1',
        marginTop:20,
        marginBottom:0,
        height:20,
        flexGrow:1,
        
      },

})
export default Disp