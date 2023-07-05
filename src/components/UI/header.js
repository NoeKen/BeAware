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
  amount,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {iLeft && (
        <Icon
          name={iLeft}
          style={styles.arrowLeft}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {/* show the right icon if it is provided, else show et whitespace */}
      <View style={{flexDirection:'row'}} >
        {iconR && (
          <TouchableOpacity onPress={onPress}>
            <Icon name={iconR} style={[styles.arrowLeft, {...CStyles}]} />
          </TouchableOpacity>
        )}
        {amount ? (
          <Text style={{color: '#da8608', fontWeight: 'bold'}}>{amount}F</Text>
        ) : (
          <Text></Text>
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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: light.brandPrimary,
    alignSelf: 'center',
  },
});
