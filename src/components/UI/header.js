import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import light from '../../constants/theme/light';

export default function Header({iLeft,title,iconR, navigation, onPress}) {
  return (
    <View style={styles.container}>
      {iLeft&&<Icon name={iLeft} style={styles.arrowLeft} onPress={() => navigation.goBack()} />}
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      {
        //show the right icon if it is provided, else show et whitespace 
        iconR?<Icon name={iconR} style={styles.arrowLeft} onPress={onPress} />:<Text>   </Text>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: 'white',
    paddingHorizontal:12
  },
  arrowLeft: {
      fontSize: 20,
      color:light.brandPrimary,
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    color:light.brandPrimary,
  }
});
