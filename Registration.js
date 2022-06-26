import React, {useState} from 'react';
import {View, Text, StyleSheet,Image, TextInput, TouchableOpacity } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from 'react-native-paper';
import { firebase } from './firebase/config';


const Registration = props => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = React.useState('Farmer');
    const nav = props.navigation;

    const onFooterLinkPress = () => {
        props.navigation.navigate('LoginScreen')
    }

    const onRegisterPress = () => {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        alert("User successfully created")
       if(checked=='Farmer')
       {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                email_id:email,
                name:fullName,
                phno:phone,
                aadhar_no:aadhar,
                addr:address,
                user:checked
            };
            const usersRef = firebase.firestore().collection('Farmer')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    nav.navigate('Index', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
       }
       else
       {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id:uid,
                email_id:email,
                name:fullName,
                phno:phone,
                aadhar_no:aadhar,
                addr:address,
                user:checked
            };
            const usersRef = firebase.firestore().collection('Trader')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    nav.navigate('Index', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
       }
    }
    
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%',height:'100%'}}
                keyboardShouldPersistTaps="always">
                
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                    placeholder='Phno'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Aadhar No'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAadhar(text)}
                    value={aadhar}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Address'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
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
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
        
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
    },
   
});

export default Registration;