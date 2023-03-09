import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const navigation = useNavigation()
    const register = () => {
        if(email === "" || password === "" || phone === ""){
            Alert.alert('Invalid Details', 'Please fill all the details', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log("user creditentials",userCredentials)
            const user = userCredentials._tokenResponse.email
            const myUserUID = auth.currentUser.uid
            setDoc(doc(db, "users", `${myUserUID}`),{
                email:user,
                phone:phone
            })
        })
    }
    return (
        <View style={{ marginTop: 40, marginLeft: 10, flex: 1, alignItems: 'center', padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100, }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: '500' }}>Register</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Create a new Account</Text>

                </View>
                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="black" style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 300, fontSize: password ? 18 : 18, marginVertical: 10, marginLeft: 10, }} />

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput placeholder='Password' placeholderTextColor="black" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ borderBottomWidth: 1, borderBottomColor: 'gray', fontSize: password ? 18 : 18, width: 300, marginVertical: 20, marginLeft: 15, }} />

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="phone" size={24} color="black" />
                        <TextInput placeholder='Phone Number' placeholderTextColor="black" value={phone} onChangeText={(text) => setPhone(text)} style={{ borderBottomWidth: 1, borderBottomColor: 'gray', fontSize: password ? 18 : 18, width: 300, marginVertical: 20, marginLeft: 15, }} />

                    </View>
                    <Pressable onPress={register} style={{ width: 200, backgroundColor: "#318CE7", padding: 15, borderRadius: 7, marginTop: 50, marginLeft: 'auto', marginRight: 'auto' }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 17, color: 'gray' }}>Already have an account? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})