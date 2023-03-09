import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cleanCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CartScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const route = useRoute()
    const cart = useSelector((state) => state.cart.cart)
    const userUid = auth.currentUser.uid
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
    const placeOrder = async() => {
        navigation.navigate("OrderScreen")
        dispatch(cleanCart())
        await setDoc(doc(db,"users",`${userUid}`)<{
            orders:{...cart},
            pickUpDetails:route.params,
        }
        ,
        {
            merge:true,
        })
    }

    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: "#F0F0F0",
                marginTop: 50,
            }}>

                {total == 0 ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Your cart is Empty</Text>
                    </View>
                ) : (
                    <>
                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back-outline" size={24} color="black" />
                            <Text>Your bucket</Text>
                        </View>

                        <Pressable style={{ backgroundColor: 'white', borderRadius: 12, padding: 14, marginHorizontal: 10 }}>
                            {cart.map((item, index) => (
                                <View style={{ flexDirection: 'row', marginVertical: 12, alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                                    <Text style={{ width: 100, fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
                                    <Pressable style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        alignItems: 'center',
                                        borderColor: '#BEBEBE',
                                        borderWidth: 0.5,
                                        borderRadius: 10,
                                    }}>
                                        <Pressable onPress={() => {
                                            dispatch(decrementQuantity(item))
                                            dispatch(decrementQty(item))
                                        }}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#088F8F',
                                                paddingHorizontal: 6,
                                                fontWeight: '600',
                                            }}>-
                                            </Text>

                                        </Pressable>

                                        <Pressable>
                                            <Text style={{
                                                fontSize: 19,
                                                color: '#088F8F',
                                                paddingHorizontal: 8,
                                                fontWeight: '600',
                                            }}>{item.quantity}</Text>

                                        </Pressable>
                                        <Pressable onPress={() => {
                                            dispatch(incrementQuantity(item))
                                            dispatch(incrementQty(item))
                                        }}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#088F8F',
                                                paddingHorizontal: 6,
                                                fontWeight: '600',
                                            }}>+
                                            </Text>

                                        </Pressable>

                                    </Pressable>

                                    <Text style={{ width: 100, fontSize: 16, fontWeight: '500' }}>{item.price * item.quantity}$</Text>
                                </View>

                            ))
                            }
                        </Pressable>
                        <View style={{ padding: 10, }}>
                            <Text>Billing details</Text>
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 7,
                                padding: 10,
                                marginTop: 15,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
                                        Item total
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400' }}>
                                        ${total}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5,
                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
                                        Delivery Fee |1.2KM
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: '#088F8F' }}>FREE</Text>
                                </View>
                                <View style={{
                                    borderWidth: 0.7, marginTop: 5,
                                }}></View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5,

                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
                                        Selected Date
                                    </Text>
                                    {/* <Text style={{ fontSize: 18, fontWeight: '400',color: '#088F8F' }}>{route.params.selectedDate1}</Text> */}
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5,

                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
                                        No of Days
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: '#088F8F' }}>{route.params.delivery}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5,

                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>Selected Pickup Time
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '400', color: '#088F8F' }}>{route.params.selectedTime1}</Text>
                                </View>
                                <View style={{
                                    borderWidth: 0.7, marginTop: 5,
                                }}></View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5,

                                }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
                                        To Pay
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: '500' }}>{total}$</Text>
                                </View>

                            </View>

                        </View>

                    </>

                )
                }

            </View>
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
                    <Pressable onPress={placeOrder}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>Place order</Text>
                    </Pressable>
                </Pressable>
            )}  
        </>
    )
}
export default CartScreen
