import React from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function All({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text>all</Text>
      <MaterialCommunityIcons name="chevron-right" style={{fontSize: 20}} />
    </TouchableOpacity>
  );
}
