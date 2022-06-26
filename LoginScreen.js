import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from 'react-native-paper';
import { firebase } from './firebase/config';
export const user_id = ''
export var user_name = ''
const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = React.useState('');
    const nav = props.navigation;
    
    
    const onFooterLinkPress = () => {
        props.navigation.navigate('Registration')
    }

    const getUserData = async (uid) => {
       if(checked=='Farmer')
       {
        console.log(checked)
        const usersRef = firebase.firestore().collection('Farmer')
        await usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore. Please register!");
                        return;
                    }
                    const userData = firestoreDocument.data();
                    console.log("get User Data return object", userData)                    
                    var userID = userData.id;
                    user_name = userData.name;
                    
                    return userData;                   
                })
                .catch(error => {
                    console.log("not able to retrieve user info");
                    alert(error);
                    return null;
                });
       }
       else{
        console.log('(((((((((((((((((((((',checked)
        const usersRef = firebase.firestore().collection('Trader')
        await usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore. Please register!");
                        return;
                    }
                    const userData = firestoreDocument.data();
                    console.log("get User Data return object", userData)                    
                    var userID = userData.id;
                    
                    return userData;                   
                })
                .catch(error => {
                    console.log("not able to retrieve user info");
                    alert(error);
                    return null;
                });
       }

    }
    
    const onLoginPress = () => {
        return async() => {

            console.log("Login Pressed");
            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    alert('Logged in Successfully!!')
                    console.log("Signed IN");
                    return;              
                })
                .catch(error => {
                    alert(error)
                })
            }
    }

    const popupateUserStateOnLogin = async () => {
        await firebase.auth().onAuthStateChanged( (user) => {
          if (user) {
            
            console.log("User Authenticated");
            
            getUserData(user.uid).then( (userData) => {
                nav.navigate('Index', {user_id: user.uid})
            })
            .catch((error) => {
              console.log(error)
              setLoading(false);
              return(
                <><Text>There seems to be problem, please come back later!...</Text></>	
              );
            });
          } else {
            setLoading(false);
          }
        })
      }

      
      useEffect(() => {
        popupateUserStateOnLogin();
      }, []);
    
      // Display the loading screen first then determine to show login screen or IndexTabScreen
      //Replace the Text with some nice animation

      if (loading) {	
        return (	
          <><Text>Loading...</Text></>	
        )	
      }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('./assets/AppLogo.jpeg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={{flexDirection:'row',paddingLeft:25}}>
                    <RadioButton
                        color='black'
                        value="Farmer"
                        status={ checked === 'Farmer' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Farmer')}
                        
                    />
                    <Text style={{paddingTop:7}}>Farmer</Text>
                    <RadioButton style={{paddingLeft:15}}
                        color='black'
                        value="Trader"
                        status={ checked === 'Trader' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Trader')}
                    />
                    <Text style={{paddingTop:7}}>Trader</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress().call()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#ffffff'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default LoginScreen;
