import {Fab, Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import light from '../constants/theme/light';

export default function FabIcon({onPress}) {
  return (
    <Fab style={styles.fab}
      onPress={()=>onPress()}
    >
      <Icon name="add" style={styles.icon} />
    </Fab>
    // <TouchableOpacity style={styles.container}>
    //   <Icon name="add" />
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    fab:{
      backgroundColor: light.brandPrimary,
      elevation:10
    },
    icon:{
        fontWeight:'bold',
        fontSize:30,
        color:light.whiteGrey,
    },
});
