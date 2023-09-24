import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import light from '../../constants/theme/light';

export default function Header({
  iLeft,
  title,
  iconR,
  CStyles,
  onPress,
  amount = 0,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}} >
        {iLeft && (
          <Icon
            name={iLeft}
            style={[styles.arrowLeft,{marginRight: 10}]}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
      {/* show the right icon if it is provided, else show et whitespace */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {amount ? <Text style={[styles.amount,{color: amount<0? light.brandDanger : light.textColor}]}>{amount}F</Text> : null}
        {iconR && (
          <TouchableOpacity style={{marginLeft: 10}} onPress={onPress}>
            <Icon name={iconR} style={[styles.arrowLeft, {...CStyles}]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  arrowLeft: {
    fontSize: 25,
    color: light.textColor,
    color: light.brandPrimary,
    
  },
  title: {
    // fontWeight: 'bold',
    color: light.brandPrimary,
    fontSize: light.titleFontSize,
    // alignSelf: 'center',
    fontFamily: light.titleFontFamily,
  },
  amount: {
    color: light.textColor,
    // color: '#da8608',
    fontSize: light.subTitleFontSize,
    fontFamily: light.subTitleFontFamily,
  },
});
