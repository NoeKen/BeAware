import React from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../../constants/theme/light';

export default function All({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center',width:'100%', justifyContent:'flex-end',marginBottom:10,marginTop:-10}}>
      <Text style={{color:light.brandSecond,fontWeight:'bold'}}>View all</Text>
      <MaterialCommunityIcons name="chevron-right" style={{fontSize: 20, color:light.brandPrimary}} />
    </TouchableOpacity>
  );
}
