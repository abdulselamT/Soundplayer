import React, { useEffect, useState } from 'react'
import {Dimensions, Button,Image,RefreshControl,View, Alert,StatusBar,Text,StyleSheet, FlatList, TouchableHighlight,TouchableOpacity, ScrollView } from "react-native";

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Linking} from 'react-native'
const About = () => {
  return (
    <View style={styles.allabout}>
        <View>
                <View>
                <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
                </View>

            <View style={styles.centv}>
                <View>
                    <Image style={{
                        width: Dimensions.get('window').width,
                        resizeMode: 'stretch',
                    }}
                        source={require('./aosqalogo.jpg')}
                    />
                </View>
                <View >
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>Linking.openURL(`https:t.me/aosqa_dev_islamic`)}>
                            <FontAwesome5 name="telegram-plane" size={54} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Linking.openURL(`mailto:abdulselam4246@gmail.com`)}>
                            <MaterialCommunityIcons name="gmail" size={54} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Linking.openURL(`https:linkedin.com/in/abduselamm/`)}>
                            <Entypo name="linkedin" size={44} color="blue" />
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Linking.openURL(`tel:+251935664245`)}>
                            <Feather name="phone" size={44} color="blue" />
                        </TouchableOpacity>
                    </View>
                    </View>

                <ScrollView >
                    <View style={{padding:20,}}>
                   <Text style={{fontSize:20,}}>
                        ሌሎችንም መተግበሪያዎች ለማግኘት  ወይም እንዲሰራ የምትፈልጉት ካለ
                        ቴሌግራም ግሩፓችንን ይቀላቀሉ  ።
                    </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    allabout:{
        flex:1,
        
    },
   centv:{
        justifyContent:'center',
   },
    
})

export default About