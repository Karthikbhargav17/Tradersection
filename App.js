import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import FirstPage from './FirstPage';
import LoginScreen from './LoginScreen';
import Registration from './Registration';
import Index from './Index';

const Stack = createStackNavigator(); 
class App extends Component {
    

    render() {
       return(
           <NavigationContainer independent={true}>
               <Stack.Navigator initialRouteName={FirstPage}>
                   <Stack.Screen name="FirstPage" component={FirstPage} options={{headerShown:false}}/>
                   <Stack.Screen name="LoginScreen" component={LoginScreen} />
                   <Stack.Screen name="Registration" component={Registration}  />
                   <Stack.Screen name="Index" component={Index} options={{headerShown:false}} />
                   
               </Stack.Navigator>
           </NavigationContainer>
       );
            
        
    }
}
export default App;

