import { SliderBox } from 'react-native-image-slider-box';
import {View } from 'react-native'

const Carousel = () => {   
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];
    return(
    <View>
    <SliderBox images={images} autoPlay circleLoop dotcolor={'#132747F'} inactiveDotcolor='90A4AE' ImageComponentStyle={{ borderRadius: 6, width:'94%' }} />
    </View>
    )
  }

export default Carousel