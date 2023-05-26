import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
// import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import light from '../../constants/theme/light';
import { useNavigation } from '@react-navigation/native';

export const MenuModal = ({
  modalVisible,
  setModalVisible,
//   doLogout,
//   setIisLoading,
}) => {

  async function handleLogout(){
    // setIisLoading(true);
    // // await doLogout()
    // setIisLoading(false);
  }
  const navigation = useNavigation()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} style={{flex:1}}>
      <View style={styles.modalView}>
        <RemixIcon
          name="close-fill"
          color={light.brandPrimary}
          size={25}
          style={styles.closeIcon}
          onPress={() => setModalVisible(false)}
        />
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.5}
          onPress={() => {
            setModalVisible(false)
            navigation.navigate('About');
          }}>
          <RemixIcon name="user-line" size={25} color={light.inactiveTab}/>
          <Text style={styles.text}>About beAware</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false)
            // Actions.settings();
          }}
          style={styles.item}
          activeOpacity={0.5}>
          <RemixIcon name="settings-5-line" size={25} color={light.inactiveTab} />
          <Text style={styles.text}>Manage settings</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            // setModalVisible(false), handleLogout();
          }}
          style={styles.item}
          activeOpacity={0.5}>
          <RemixIcon name="logout-circle-r-line" size={25} color={light.inactiveTab} />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity> */}
      </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    marginTop: 50,
    marginHorizontal: 10,
    backgroundColor: light.brandLight,
    borderRadius: 10,
    padding: 16,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
  },
  text: {
    marginStart: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: light.textColor,
    textAlign:'right'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  closeIcon: {
    position: 'absolute',
    end: 0,
    margin: 10,
    color: light.brandPrimary,
  },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
});
export default MenuModal;
