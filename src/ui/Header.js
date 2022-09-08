import { Icon, Text, View } from 'native-base';
import React from 'react';
import light from '../constants/theme/light';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const THeader = ({icon1, title, icon2, onPress}) => (
  <View
    transparent
    style={{
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection:'row',
      height:50,
    }}>
    <MaterialCommunityIcons
      name={icon1}
      style={{color: light.brandPrimary,fontSize:30}}
      onPress={onPress}
    />
    <Text
      style={{
        color: light.brandPrimary,
        alignSelf: 'center',
        fontFamily: 'ubuntu-bold',
        fontWeight:'bold'
      }}>
      {title}
    </Text>
    <MaterialCommunityIcons name={icon2} style={{color: light.brandPrimary}} />
  </View>
);

// THeader.propTypes = {
//   icon1: PropTypes.string,
//   icon2: PropTypes.icon,
//   title: PropTypes.string,
// };

// THeader.defaultProps = {
//   icon1: null,
//   icon1: null,
//   title: 'Missing title',
//   content: '',
// };

export default THeader;
