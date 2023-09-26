import React, { useEffect, useState } from 'react'
import { Button,Image,RefreshControl,View, Alert,StatusBar,Text,StyleSheet, FlatList, TouchableHighlight,TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
const HomeScreen = ({navigation}) => {
  
  const [playlists,setPlaylists]=useState('No');
  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {

      setRefreshing(true);
      setTimeout(3);
      setRefreshing(false);
    }
 
  return (
    <View style={styles.con}>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

        </View>
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}></Text>
      </View>
      <View style={styles.listcontainer}>
          <View style={{flexGrow:1}}>
              <ScrollView>
                  <TouchableOpacity style={styles.ustazcontainer} onPress={()=>{navigation.navigate('playvideo',{ustaz_name:'dr_zakir_naik'})}}>
                        <View>
                          <Image
                            
                            style={styles.imagestyle}
                            source={require('../Images/drzakir.jpg')}
                          />
                        </View>
                           <View style={styles.textstyle}>
                            
                              <Text style={{fontSize:20,fontWeight:'bold'}}>Dr zakir naik</Text>
                              
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ustazcontainer} onPress={()=>{navigation.navigate('playvideo',{ustaz_name:'ustaz_abuhayder'})}}>
                        <View>
                          <Image
                            
                            style={styles.imagestyle}
                            source={require('../Images/abuhayder.jpg')}
                          />
                        </View>
                           <View style={styles.textstyle}>
                            
                              <Text style={{fontSize:20,fontWeight:'bold'}}>Ustaz Abu hayder</Text>
                             
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ustazcontainer} onPress={()=>{navigation.navigate('playvideo',{ustaz_name:'shekh_mohamed_hamidin'})}}>
                        <View>
                          <Image
                            
                            style={styles.imagestyle}
                            source={require('../Images/shekhmohamed.jpg')}
                          />
                        </View>
                           <View style={styles.textstyle}>
                            
                              <Text style={{fontSize:20,fontWeight:'bold'}}>shekh mohamed hamidin</Text>
                             
                            </View>
                    </TouchableOpacity>
                  
                  
                 
                    
              </ScrollView>
          </View>
      </View>
      </View>
  )
}

const styles=StyleSheet.create({
  con:{
    display:'flex',
    flexGrow:1,

    
  },
  
  item:{
    padding:10,
    borderColor:'blue',
    borderBottomWidth:1,

  },
  listcontainer:{
    
    marginTop:20,
    marginBottom:0,
    height:20,
    flexGrow:1,
    
  },
  imagestyle:{
    height:70,
    width:70,
    borderRadius:35,


  },
  ustazcontainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    margin:20,
    paddingBottom:10,
    borderBottomWidth:1,
  },
  textstyle:{
    marginLeft:30,
    
  }

})

export default HomeScreen