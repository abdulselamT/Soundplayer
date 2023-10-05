import React from 'react'
import { Button, View, Alert,StatusBar,Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen';
import About from './Screens/About';
import Just from './Screens/Just';
const Tab = createMaterialBottomTabNavigator();
const App = () => {
  
  return (
    <NavigationContainer>
        <Tab.Navigator 
        activeColor="blue"
        barStyle={{height:50, }}
        screenOptions={
          {headerShown: false,
          }
        
        }
        >
          <Tab.Screen 
          name="Just" 
          component={Just}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list-ul" size={24} color={color} />
            ),
            tabBarLabel:''
          }}
          
          />

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