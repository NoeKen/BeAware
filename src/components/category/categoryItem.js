import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from 'native-base';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import light from '../../constants/theme/light';
import CModal from '../UI/modal';
import {getColorCode, random_rgba} from '../../Services/getRandomColor';
import DeviceInfo from 'react-native-device-info';
import CatDetailsModal from './CatDetails';

const devise =  DeviceInfo.getDeviceType();

export default function CategoryItem({
  data,
  removeCategory,
  deleteCascadeExpenses,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);
  const [del, setDelete] = useState(false);
  // console.log('data:',data);
  const navigation = useNavigation();
  const deleteCategory = async () => {
    await deleteCascadeExpenses(data.id);
    await removeCategory(data.id);
    navigation.replace('index');
  };

  console.log('device: ',devise)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setDelete(false), navigation.navigate('Expenses', {cat: data});
        }}
        onLongPress={() => {
          setDelete(!del);
        }}>
        <CModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          title={'Delete Category'}
          text={`You are going to delete one category ('${data.name}'). \n This will also delete all his expenses`}
          deleCategory={deleteCategory}
        />
        <CatDetailsModal
          setModalVisible={setCatModalVisible}
          modalVisible={catModalVisible}
          title={'Category Details'}
          category={data}
        />
        {data.image !=='' ? (
          <ImageBackground
            source={{uri: data.image}}
            style={styles.imageBackground}>
            <View style={styles.textCard}>
              <Text numberOfLines={1} style={[styles.textValue, styles.name]}>
                {data?.name}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {data?.description}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={require('../../../assets/pictures/bg.jpeg')}
            style={styles.imageBackground}>
            <View style={{backgroundColor:random_rgba()}}>
              <View style={styles.textCard}>
                <Text numberOfLines={1} style={styles.name}>
                  {data?.name}
                </Text>
                <Text numberOfLines={1} style={styles.description}>
                  {data?.description}
                </Text>
              </View>
            </View>
          </ImageBackground>
        )}
      </TouchableOpacity>
      {del == true ? (
        <TouchableOpacity
          style={styles.delete}
          onPress={
            () => setModalVisible(!modalVisible)
            //  deleteCategory()
          }>
          <Icon name="close" style={styles.delete.icon} />
        </TouchableOpacity>
      ) : <TouchableOpacity
          style={styles.delete}
          onPress={
            () => setCatModalVisible(!catModalVisible)
            //  deleteCategory()
          }>
          <Icon name="information" style={styles.delete.icon} />
        </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'46%' ,
    marginTop: 10,
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowColor: '#000',
    shadowOpacity: 0.99,
    shadowRadius: 5,
    marginHorizontal: '2%',
    backgroundColor: 'white',
    height: devise === 'Handset' ? 90: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  // linearGradient: {
  //   height: '100%',
  // },
  textCard: {
    backgroundColor: light.whiteGrey,
    height: '55%',
    opacity: 0.65,
    marginTop: '28%',
    padding: 8,
    paddingTop: -2,
  },
  description: {
    fontSize: light.textFontSize,
    fontFamily: light.textFontFamily,
    marginTop: -5,
  },
  name: {
    color: light.textColor,
    fontSize: light.titleFontSize,
    fontFamily: light.titleFontFamily
  },
  delete: {
    width: 25,
    height: 25,
    position: 'absolute',
    elevation: 25,
    top: 0,
    right: 0,
    backgroundColor: light.inverseTextColor,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    icon: {
      color: light.brandPrimary,
      fontSize: 22,
      fontWeight: 'bold',
    },
  },
});
