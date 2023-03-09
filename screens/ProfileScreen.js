import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const user = auth.currentUser
    const navigation = useNavigation
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch(err => {
            console.log(err)
        })
    console.log("User",user)

    }
    return (

        <View style={{
            flex: 1,
            paddingTop: 40,
            backgroundColor: "#F0F0F0",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Pressable style={{ marginVertical: 10 }}>
                <Text>Welcome </Text>
            </Pressable>

            <Pressable onPress={signOutUser}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})