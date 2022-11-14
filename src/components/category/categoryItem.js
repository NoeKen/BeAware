import {Icon, Text} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import light from '../../constants/theme/light';
import { DeleteItem } from '../../Services/categoriesService';

export default function   CategoryItem({data, navigation}) {
  const [del, setDelete] = useState(false);
  // console.log('data:',data);
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Expenses',{cat:data})}
        onLongPress={() => {
          console.log('long pressed: ', del), setDelete(!del);
        }}>
        <ImageBackground
          source={{uri: data.image}}
          style={styles.imageBackground}>
          <View style={styles.textCard}>
            <Text
              numberOfLines={1}
              style={[styles.textValue, styles.name]}>
              {data.name}
            </Text>
            <Text numberOfLines={1} style={styles.description}>{data.description}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      {del == true ? (
        <TouchableOpacity style={styles.delete}
          onPress={()=> DeleteItem(data)}
        >
          <Icon name="close" style={styles.delete.icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '46%',
    marginTop: 10,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginHorizontal: '2%',
    backgroundColor: 'white',
    height: 90,
    borderRadius: 10,
    marginBottom:5,

    // shadowColor:light.brandPrimary,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
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
  textCard: {
    backgroundColor: light.inverseTextColor,
    height: '55%',
    opacity: 0.65,
    marginTop: '26%',
    padding: 8,
    paddingTop:-2
  },
  description: {
    fontSize:14,
    marginTop:-5
  },
  name: {
    color: light.textColor,
    fontWeight: 'bold',
    fontSize: 22,
  },
  delete: {
    width:25,
    height:25,
    position: 'absolute',
    elevation:25,
    top: 0,
    right: 0,
    backgroundColor: light.inverseTextColor,
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center',
    icon:{
      color: light.inactiveTab,
      fontSize: 22,
      fontWeight:'bold'
    }
  },
});
