import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import { useSelector } from 'react-redux'
import StackNavigator from '../StackNavigator'
import { useNavigation } from '@react-navigation/native'

const PickUpScreen = () => {
    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [delivery, setDelivery] = useState('')
    const proceedToCart = () => {
        if (!selectedDate || !selectedTime || !delivery) {
            Alert.alert('Empty or invalid', 'Please select all the fields', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }

        if (selectedDate && selectedTime && delivery) {
            navigation.replace("CartScreen", {
                delivery: delivery,
                selectedDate1: selectedDate,
                selectedTime1: selectedTime,
            })
        }
    }
    const cart = useSelector((state) => state.cart.cart)
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const deliveryTime = [
        {
            id: '0',
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days"
        },
        {
            id: "3",
            name: "5-6 Days"
        },
        {
            id: "4",
            name: "Tomorrow"
        },
    ]
    const times = [
        {
            id: "0",
            time: "11:00 AM"
        },
        {
            id: "1",
            time: "12:00 PM"
        },
        {
            id: "2",
            time: "01:00 PM"
        },
        {
            id: "3",
            time: "02:00 PM"
        },
        {
            id: "4",
            time: "03:00 PM"
        },
    ]
    return (
        <View style={{
            flex: 1,
            paddingTop: 40,
            backgroundColor: "#F0F0F0",
        }}>
            <Text style={{ fontWeight: '500', marginHorizontal: 10, fontSize: 16 }}>Enter Address</Text>
            <TextInput style={{ borderWidth: 0.5, margin: 10, borderRadius: 7, padding: 40, borderColor: 'gray', paddingVertical: 80 }} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: 10, }}>Pick Your Date</Text>
            <View style={{ position: 'relative' }}>
                <HorizontalDatepicker
                    mode="gregorian"
                    startDate={new Date('2023-03-08')}
                    endDate={new Date('2023-03-14')}
                    initialSelectedDate={new Date('2023-03-08')}
                    onSelectedDateChange={(date) => setSelectedDate(date)}
                    selectedItemWidth={170}
                    unselectedItemWidth={38}
                    itemHeight={38}
                    itemRadius={10}
                    selectedItemTextStyle={styles.selectedItemTextStyle}
                    unselectedItemTextStyle={styles.selectedItemTextStyle}
                    selectedItemBackgroundColor="#222831"
                    unselectedItemBackgroundColor="#ececec"
                    flatListContainerStyle={styles.flatListContainerStyle}


                /></View>
            <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: '500' }}>Select Time</Text>
            <View style={{ position: 'relative' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {times.map((item, index) => (
                        <Pressable key={index} onPress={() => setSelectedTime(item.time)}
                            style={
                                selectedTime.includes(item.time) ? {
                                    margin: 10,
                                    borderRadius: 7,
                                    padding: 15,
                                    height: 50,
                                    borderColor: 'red',
                                    borderWidth: 0.7
                                }
                                    : {
                                        margin: 10,
                                        borderRadius: 7,
                                        height: 50,
                                        padding: 15,
                                        borderColor: 'gray',
                                        borderWidth: 0.7,
                                    }
                            }>
                            <Text>{item.time}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 10, }}>Delivery Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {deliveryTime.map((item, index) => (
                    <Pressable onPress={() => setDelivery(item.name)} key={index}
                        style={
                            delivery.includes(item.name) ? {
                                margin: 10,
                                borderRadius: 7,
                                padding: 15,
                                height: 50,
                                borderColor: 'red',
                                borderWidth: 0.7
                            }
                                : {
                                    margin: 10,
                                    borderRadius: 7,
                                    height: 50,
                                    padding: 15,
                                    borderColor: 'gray',
                                    borderWidth: 0.7,
                                }}
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
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
                    <Pressable onPress={proceedToCart}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>Proceed to Cart</Text>
                    </Pressable>
                </Pressable>
            )}
        </View >

    )
}

export default PickUpScreen

const styles = StyleSheet.create({})