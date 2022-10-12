import {Fab, Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import light from '../constants/theme/light';

export default function FabIcon() {
  return (
    <Fab style={styles.fab}>
      <Icon name="add" style={styles.icon} />
    </Fab>
    // <TouchableOpacity style={styles.container}>
    //   <Icon name="add" />
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    fab:{backgroundColor: light.brandPrimary},
    icon:{
        fontWeight:'bold',
        fontSize:30,
        // color:light.brandSecond,
    },
  container: {
    backgroundColor: light.brandPrimary,
    position: 'absolute',
    bottom: 10,
    right: 16,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowColor: light.textColor,
    // shadowRadius:5,
  },
});
