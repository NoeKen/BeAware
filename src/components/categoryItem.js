import { Text } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import light from '../constants/theme/light';

export default function CategoryItem({data, navigation}) {
  console.log('data: ', data.description);
  return (
    <TouchableOpacity style={styles.container}
      onPress={()=>navigation.navigate('Expenses')}
    >
      <ImageBackground
        source={{uri:data.image}}
        style={styles.imageBackground}>
       <View 
        style={styles.textCard}
       >
        <Text style={[styles.textValue,styles.textValue.name]} >{data.name}</Text>
        <Text>{data.description}</Text>
       </View>
        {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#fdfdfd00', '#fdfdfd79', '#00cef3']}
          style={styles.linearGradient}>
          <Text>{data.name}</Text>
        </LinearGradient> */}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    elevation:20,
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowColor:light.brandPrimary,
    shadowRadius:50
  },
  imageBackground: {
    height: 170,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    // elevation:20,
    // shadowOffset:{
    //   width:0,
    //   height:2,
    // },
    // shadowColor:light.brandPrimary,
    // shadowRadius:50
  },
  linearGradient: {
    height: '100%',

    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
    // marginTop: 85,
    // opacity:0.5
    // width: 350,
  },
  textCard:{
    backgroundColor:light.inverseTextColor,
    height:'55%',
    opacity:0.6,
    marginTop:'25%',
    padding:8,
  },
  textValue:{
    color:light.textColor,
    name:{
      fontWeight:'bold',
      fontSize:22
    },
  },
});
