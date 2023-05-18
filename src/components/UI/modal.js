import {Title} from 'native-base';
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import light from '../../constants/theme/light';

const CModal = ({setModalVisible,navigation, modalVisible, text, title, deleCategory}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title
              style={{
                color: light.brandSecond,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              {title}
            </Title>
            <Text style={styles.modalText}>{text}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                // style={{borderWidth: 1,paddingHorizontal:10,paddingVertical:2}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginHorizontal: 10,
                  borderRadius: 5,
                  borderColor: light.brandPrimary,
                }}
                onPress={async () => {
                  setModalVisible(!modalVisible);
                  await deleCategory();
                  navigation.replace('index');
                }}>
                <Text
                  style={{
                    color: light.brandPrimary,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
    color: light.inactiveTab,
    lineHeight: 20,
  },
});
