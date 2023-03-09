import { View, Text, StyleSheet, Alert, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { Ionicons } from '@expo/vector-icons';
import Carousel from '../components/Carousel'
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState('Location is being loading')
    const [locationServicesEnabled, setlocationServicesEnabled] = useState('false')
    const product = useSelector((state) => state.product.product)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [items, setItems] = useState([])

    useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async () => {
            const colRef = collection(db,"types")
            const docsSnap = await getDocs(colRef)
            docsSnap.forEach((doc) => {
                items.push(doc.data())
            })
            items?.map((service) => dispatch(getProducts(service)))
        }
        fetchProducts()
    }, [])
    console.log(product)
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        if (!enabled) {
            Alert.alert('Location services not enabled', 'Please enable the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            setlocationServicesEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
            Alert.alert('Permission denied', 'Allow the app to use the location services ', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        const { coords } = await Location.getCurrentPositionAsync()
        console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });


            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`
                setdisplayCurrentAddress(address)
            }

        }
    }
    const services = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
            name: "Shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "11",
            image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
            name: "T-shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
            name: "Dresses",
            quantity: 0,
            price: 10,
        },
        {
            id: "13",
            image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
            name: "jeans",
            quantity: 0,
            price: 10,
        },
        {
            id: "14",
            image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
            name: "Sweater",
            quantity: 0,
            price: 10,
        },
        {
            id: "15",
            image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
            name: "shorts",
            quantity: 0,
            price: 10,
        },
        {
            id: "16",
            image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
            name: "Sleeveless",
            quantity: 0,
            price: 10,
        },

    ];

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: "#F0F0F0", }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                        <Ionicons name="location-sharp" size={30} color="#fd5c63" />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Home</Text>
                            <Text>{displayCurrentAddress}</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: 'auto', marginRight: 7, }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={require('../assets/img/pfp.jpg')} />
                        </Pressable>
                    </View>
                    <View style={{ padding: 10, margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: '#C0C0C0', borderRadius: 7, }}>
                        <TextInput placeholder='Search for items' />
                        <Ionicons name="ios-search" size={24} color="#fd5c63" />
                    </View>
                    <Carousel />
                    <Services />
                    {product.map((item, index) => (
                        <DressItem item={item} key={index} />
                    ))}

                </View>

            </ScrollView>
            {total == 0 ? (
                null
            ) : (
                <Pressable style={{
                    backgroundColor: '#088F8F',
                    marginBottom: 30,
                    padding: 10,
                    margin: 15,
                    borderRadius: 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View>

                        <Text style={{
                            color: 'white',
                            fontSize: 17,
                        }}>{cart.length} items | {total}$</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 12,
                            paddingTop: 5,
                        }}>Extra charges may apply</Text>
                    </View>
                    <Pressable onPress={() => {
                        navigation.navigate("pickup")
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>Proceed to Pickup</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    );




}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#F0F0F0",
    },
    txt: {
    }
})