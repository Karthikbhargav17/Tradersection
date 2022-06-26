import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View ,Image,Button, TouchableOpacity,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from './assets/AppLogo.jpeg'
import { Linking } from 'react-native';
import * as Progress from 'react-native-progress';
export default class FirstPage extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          progress: 0,
          indeterminate: true,
        };
      }
      componentDidMount() {
        this.animate();
      }
      animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
              progress = 1;
            }
            this.setState({ progress });
          }, 500);
        }, 1500);
      }
    onPressFunction()
    {
        
            alert("Hi");
        
    }
    onExit()
    { BackHandler.exitApp();
    }
    Next()
    {
        
      <Progress.Bar progress={0.3} width={200} />
      this.props.navigation.navigate("LoginScreen")
    }
 render(){
  return (
    <View style={{alignItems: 'center', justifyContent:'center',paddingTop: 10,backgroundColor:"#ffffff",height:"100%"}}>
     <Image source={Logo} style={{height:250,width:350}}/>
     <Text style={{fontWeight:'bold', color:'green',paddingBottom:20,fontSize:24}}>Trader App</Text>
    <TouchableOpacity onPress={()=>this.Next()} style={{marginVertical:0.5 ,borderRadius:10,backgroundColor: "#00008b",width:150,height:45,alignItems:"center",justifyContent:"center"}}>
    <Text style={{color:"#FFFFFF"}}>Next</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.onExit()} style={{marginVertical:10 ,borderRadius:10,backgroundColor: "#00008b",width:150,height:45,alignItems:"center",justifyContent:"center"}}>
    <Text style={{color:"#FFFFFF"}}>Exit</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/5NewXsBnoKw')}>
        <Text style={{color: 'blue'}}>Guide to use the app</Text>
    </TouchableOpacity>
    <View style={{paddingTop:15}}>
    <Progress.Bar 
          
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
    </View>
    <View style={{paddingTop:80}}>
      <Text>Contact us on</Text>
    </View>
    <View  style={{paddingTop:30,flexDirection:'row'}}>
      <TouchableOpacity onPress={() => Linking.openURL('https://icar.org.in/content/krishi-vigyan-kendra')}><Icon name="logo-google" size={40} color="red" style={{paddingRight:10}}/></TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/karthik.bhargav.73')}><Icon name="logo-facebook" size={40} color="#00008b" style={{paddingRight:10}}/></TouchableOpacity>
      <TouchableOpacity><Icon name="logo-instagram" size={40} color="pink" style={{paddingRight:10}}/></TouchableOpacity>
    </View>
    
    </View>
  );
}
}

