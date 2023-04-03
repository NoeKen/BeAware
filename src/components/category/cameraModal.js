import { Icon, Title } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import light from '../../constants/theme/light';

export default function CameraModal({setModalVisible,openCamera,openGallery}) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <TouchableOpacity
            // style={{marginRight: 15}}
            onPress={() => {
                setModalVisible(false);
            }}>
            <Icon style={styles.close} name="close" />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer.galleryView} >
          <TouchableOpacity
            // style={{marginRight: 15}}
            onPress={() => {
                openGallery()
                setModalVisible(false);
            }}>
            <Icon style={styles.image} name="images" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            openCamera()
            setModalVisible(false)
          }}
          >
            <Icon style={styles.camera} name="camera" />
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    height: 100,
    bottom: 20,
    elevation: 30,
    galleryView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      alignItems: 'center',
      marginTop: -16,
    },
  },
  close: {
    fontSize: 20,
    borderRadius: 20,
    backgroundColor: light.placeholder,
    padding: 2,
    alignSelf: 'flex-end',
    margin: 10,
  },
  image: {
    fontSize: 50,
    // color:light.inactiveTab
  },
  camera: {
    fontSize: 60,
    // color:light.inactiveTab
  },
  title: {
    color: light.brandPrimary,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 22,
  },
});