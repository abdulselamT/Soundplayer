import React from 'react'
import { Button, View, Alert,StatusBar,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './Components/Home/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Disp from './Components/Home/Disp';
import About from './Components/Home/About';
const Tab = createMaterialBottomTabNavigator();
const App = () => {
  
  return (
    <NavigationContainer>
        <Tab.Navigator 
        activeColor="blue"

        screenOptions={
          {headerShown: false,
          }
        
        }
        >
          <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list-ul" size={24} color={color} />
            ),
            tabBarLabel:''
          }}
          
          />
          <Tab.Screen 
            name="playvideo" 
            component={Disp}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="video" size={24} color={color} />
              ),
              tabBarLabel:''
            }} 
          
          />
          <Tab.Screen 
          name="about" 
          component={About}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="info" size={24} color={color} />
            ),
            tabBarLabel:''
          }}
          
          />

        </Tab.Navigator>

      </NavigationContainer>
  )
}

export default App