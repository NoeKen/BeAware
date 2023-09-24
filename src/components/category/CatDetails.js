import {Title} from 'native-base';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import light from '../../constants/theme/light';
import {useWindowDimensions} from 'react-native';
import moment from 'moment';

const CatDetailsModal = ({
  setModalVisible,
  navigation,
  modalVisible,
  text,
  title,
  category,
}) => {
  const width = useWindowDimensions().width * 0.8;
  const description = category?.description
    ? category.description
    : 'No description provided';
  console.log('windows width', category);
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
                color: light.brandPrimary,
                marginBottom: 10,
                fontWeight: 'bold',
                fontFamily: light.titleFontFamily,
                fontSize: light.titleFontSize,
              }}>
              {title}
            </Title>
            <Image
              style={{width: width, height: 200, borderRadius: 10}}
              source={
                category?.image
                  ? {uri: category?.image}
                  : require('../../../assets/pictures/bg.jpeg')
              }
            />

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{description}</Text>
            <Text accessible style={styles.label}>
              Creation date
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{}}>
                {moment(category?.created_at).format('DD-MM-YYYY')} at {''}
              </Text>
              <Text style={styles.value}>
                {moment(category?.created_at).format('hh:mm:ss a')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
                // style={{borderWidth: 1,paddingHorizontal:10,paddingVertical:2}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Cancel
                </Text>
              </TouchableOpacity> */}
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
                }}>
                <Text
                  style={{
                    color: light.brandPrimary,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CatDetailsModal;

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
  label: {
    fontFamily: light.subTitleFontFamily,
    color: light.textColor,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  value: {
    fontFamily: light.textFontFamily,
    color: light.inactiveTab,
  },
});
