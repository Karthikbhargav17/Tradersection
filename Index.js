import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Button,Image, TextInput, Dimensions, Alert} from 'react-native';
import { db } from './firebase-config';
import { collection, getDocs, doc, updateDoc, getDoc} from 'firebase/firestore/lite';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createDrawerNavigator ,  DrawerItemList,
  DrawerContentScrollView,} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Root=()=> {
    const route = useRoute();
    const userID = route.params.userID;
    console.log(userID)
  return (
    <Drawer.Navigator
    drawerContent={props => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            routeName => (routeName !== 'Settings' && routeName !== 'Mapview' )
          ),
          routes: props.state.routes.filter(
            route => (route.name !== 'Settings' && route.name !== 'Map')
          ),
        },
      };
      return (
        <DrawerContentScrollView {...filteredProps}>
          <DrawerItemList {...filteredProps}/>
        </DrawerContentScrollView>
      );
    }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} initialParams={{user_id:userID}}/>  
      <Drawer.Screen name="My bookings" component={Mybookings} initialParams={{user_id:userID}}/>
      <Drawer.Screen name="About" component={AboutScreen} initialParams={{user_id:userID}}/>
      <Stack.Screen name="Settings" component={Settings}  options={() => ({
        headerShown: false
      })} initialParams={{user_id:userID}}/>
      
      <Stack.Screen name="Map" component={Mapview} />
      
    </Drawer.Navigator>
  );
}

export default function Index() {
    const route = useRoute();
    const user_id = route.params.user_id;
    console.log(user_id)
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator >
      
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
          initialParams={{userID: user_id}}
        />
        <Stack.Screen name="Feed" component={Settings} initialParams={{userID: user_id}}/>
        <Stack.Screen name="Map" component={Mapview} initialParams={{userID: user_id}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// .........................................mapview................................
function Mapview() {
  const route = useRoute();
  console.log(route.params.Lat);
  return (
    <View >
      <MapView 
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
      initialRegion={{
        latitude: route.params.Lat,
        longitude: route.params.Lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
     >
     <Marker
       coordinate={{
      latitude: route.params.Lat,
      longitude: route.params.Lon,
    }}
  />
  </MapView>
  </View>
);
  
}

// ..........................................Home page..................................
function HomeScreen({navigation,props}) {
    const route = useRoute();
    const user_id =route.params.user_id;
  const [details, setDetails] = useState([]);
  
 console.log(user_id)
 
  const userData = async () => {
    //console.log(db);
    const q= collection( db, 'Products');
    const snapShot = await getDocs(q);   
    const data = snapShot.docs.map((doc) => ({  
      ...doc.data(),
      id: doc.id
    }));
   console.log(data);
  
   setDetails(data);
  }
  useEffect(() => {
   userData();
  }, []);
 
  
  return(
    <View >
      <Text style={{
        backgroundColor: 'orange',
        color: 'black',
        borderRadius: 30,
        marginTop: 10,
        height: 60,
        width: 325,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        marginLeft: 16,
        textAlign: 'center',
        paddingTop: 3 
 
        }}>                
          PRODUCTS:{user_id}
          </Text>
     <FlatList
       data={ details }
       contentContainerStyle={{paddingBottom: 60}}
       renderItem = {({ item }) => 


         <View style={{
           height: 190, 
           width: 340, 
           backgroundColor: 'white', 
           margin: 10, 
           borderRadius: 15,
           boxShadow: 2,
           borderWidth: 18,
           
          }}> 
           <Image source={{uri: item.img}} style={{height: 155, width: 150, borderRadius: 10, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
           <Text style={{ fontWeight: 'bold', marginLeft: 173, fontSize: 26, marginTop: -150,  }}> { item.Product_name}</Text>
           <Text style={{
             paddingLeft: 178,
             marginTop: 5,
             marginLeft: 2,
             fontSize: 16,
             marginBottom: 4,
             
             }}>Price: {item.Price}Rs/kg</Text> 
             <Text style={{marginLeft: 176, paddingBottom: 3}}> {item.Location}</Text> 
            

           <TouchableOpacity
           style={{
             backgroundColor: 'orange',
             height: 47,
             width: 130,
             marginLeft: 175,
             borderTopLeftRadius: 10,
             
           }}
           onPress={()=> navigation.navigate("Feed", {
            id: item.id, 
            productName: item.Product_name, 
             img: item.img, 
             price: item.Price,
             location: item.Location,
             ID: item.ID,
             Quan: item.Quan
            })}
           > 
           <Text style={{fontWeight: 'bold', color: 'white', fontSize: 17, padding: 5 }}
          >View Details</Text>
           </TouchableOpacity>
         </View>   
          
       }
       />
     </View>      
  );
}
//..................................My bookings.............................

function Mybookings(props) {
    const user_id = props.route.params.userID;
  return(
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text >
            Hi this is my bookings section
          </Text>
    </View>
  );
}






//................................about screen...............................
function AboutScreen() {
  return(
    <View>
          <Text style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: 2,
            margin: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 2,
            padding: 5  
         }}>
            In this section a local trader can actually look into all the products that are been 
            uploaded by the farmer. He can then select a perticular product and view the details
            of that product. If he likes the product he can actually book that, else he can come 
            back and look for others.
          </Text>
    </View>
  );
}


//.....................................feed.................................
function Settings({navigation}) {
  const route = useRoute();
  const [quan, setQuan] = useState();
  const [inputU, setInput] = useState();
  const [farmerdata, setFarmerData] = useState();
  const [Lat, setLat] = useState();
  const [Lon, setLon] = useState();
  const [notes, setNotes] = useState([]);
  
  const id = route.params.id;

  const farmerDetails = async () =>{
    const q= doc( db, 'Farmer', route.params.ID);
      const userSnap = await getDoc(q);
      const data = userSnap.data();
      setFarmerData(data);
  }
 

 useEffect(()=>{
   farmerDetails();
 },[]);

 
  const updateTask = async(Quan,quan, id, inputU) =>{
    const farmerName= farmerdata.name;
    console.log(farmerName);
    const phno = farmerdata.phno;
    console.log(phno);
    setLat(farmerdata.Lat);
    setLon(farmerdata.Lon);
    const ref = doc(db, "Products", id);
    const mybooking = collection(db, "TraderMyBookings");
    const img = route.params.img;
    console.log(img)

    
    
   
  
    if(Quan == 0 || Quan <=20){
      alert("Cannot book, as it is not available");
    }
    else if( inputU < 20){
      alert("please enter the quantity more than 20kgs");
    }
    else{

      updateDoc(ref, {
        Quan: quan,
      });
      const note = {id: Date.now(), farmerName, phno, img};
    const updatednotes = [...notes, note]
    setNotes(updatednotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatednotes));
    console.log(notes);

    const result = await AsyncStorage.getItem('notes');
    console.log(result)
    if(result !== null ) setNotes(JSON.parse(result));
    alert("Booking Succesfull");
    }

  }
  return (
  <ScrollView>
    <View >
      <Image source={{uri: route.params.img}} style={{
        height: 300, 
        width: 350, 
        borderRadius: 10, 
        borderWidth: 10, 
        borderColor: 'black',
        marginTop: 15,
        marginLeft: 5
        }}/>
      <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 10,
        borderBottomWidth: 5,
        textAlign: 'center',
        paddingTop: 2,
        paddingBottom: 0,
        borderRadius: 20
      }}> {route.params.productName}</Text>
      <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 10,
        borderBottomWidth: 5,
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 0,
        borderRadius: 20
      }}
      
      >{route.params.price}<Text style={{fontSize: 15}}>Rs/kg</Text></Text> 
      <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 10,
        borderBottomWidth: 5,
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 0,
        borderRadius: 20
      }}> {route.params.location}</Text>
            <Text
      style={{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 10,
        borderBottomWidth: 5, 
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 0,
        borderRadius: 20
      }}> {route.params.Quan}<Text style={{fontSize:15}}>Kg available</Text></Text>
     
      

     <TextInput placeholder='Enter the Quantity' style={{    
        borderColor: "black",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 2,
        marginTop: 10,
        borderWidth: 10,
        borderBottomWidth: 5,
        height: 60,
        fontSize: 20,
        borderRadius: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10

        }}
        onChangeText={ (text) => {
          setQuan(route.params.Quan - text),
          setInput(text)
        }}
        
        />
       
    </View>
    <Button
    title="VIEW MAP"
    color='orange'
    onPress={()=> navigation.navigate("Map",{
      Lat: farmerdata.Lat,
      Lon: farmerdata.Lon
    })}
    
    
    />
    <TouchableOpacity
    style={{
      backgroundColor: 'orange',
      color: 'black',
      borderRadius: 20,
      height: 60,
      width: 360,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 15,
      marginTop: 10
    
    }}
   
    >
      <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold', 
        textAlign: 'center',
        paddingTop: 15,
        letterSpacing: .5,
        color: 'white',
      }}
      onPress={() => updateTask(route.params.Quan,quan, id, inputU)}
       >
        BOOK NOW
      </Text>
    </TouchableOpacity>

    <Text style={{
      
        color: 'black',
        borderRadius: 30,
        marginTop: 10,
        height: 60,
        width: 325,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        marginLeft: 16,
        textAlign: 'center',
        paddingTop: 3 
 
        }}>Your bookings</Text>
       
  </ScrollView>
  );
  
  
}