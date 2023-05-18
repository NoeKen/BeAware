import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Textarea,
  View
} from 'native-base';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Header from '../components/UI/header';
import CameraModal from '../components/category/cameraModal';
import light from '../constants/theme/light';
import Spacer from '../ui/Spacer';

const AddCategory = ({navigation, categories, replaceCategories}) => {
  const [imgPath, setImgPath] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [category, setCategory] = useState({
    id: uuid.v4(),
    image: '',
    name: '',
    description: '',
    created_at : new Date()
  });
  // const [category, setCategory] = useState({
  //   name: '',
  //   description: '',
  //   image: '',
  // });

  function openGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 170,
      cropping: true,
    }).then(img => {
      console.log('image path : ', img.path);
      setCategory({...category, image: img.path});
      // replaceCategory({...category, image: img.path});
      // setCategory({...category, image: img.path});
      console.log('image modificated : ', category.image);
      // setBooksAdds(image.path);
      // replaceCreateBook({
      //   ...createBook,
      //   picture: {name: 'picture', type: image.mime, uri: image.path},
      // });
    });
  }
  function openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 170,
      cropping: true,
    }).then(img => {
      console.log('image path : ', img.path);
      setCategory({...category, image: img.path});
      // replaceCategory({...category, image: img.path});
      console.log('image modificated : ', category.image);
      // setBooksAdds(image.path);
      // replaceCreateBook({
      //   ...createBook,
      //   picture: {name: 'picture', type: image.mime, uri: image.path},
      // });
    });
  }

  async function AddCategory() {
    // CreateCategory(category,navigation={navigation})
    try {
      // await addCategory();
      console.log('====================================');
      console.log('category: ',category);
      console.log('====================================');
      await replaceCategories([...categories, category]);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error when creating category : ', error);
    }
  }

  return (
    <Container>
      <Header iLeft={'arrow-back'} title={'Add Category'} />
      <Content>
        <View>
          <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            collapsable={true}
            onRequestClose={async () => {
              setVisible(false);
            }}>
            <CameraModal
              setModalVisible={setVisible}
              openCamera={openCamera}
              openGallery={openGallery}
            />
          </Modal>
        </View>
        <View
          style={{padding: 16, marginTop: 20, justifyContent: 'space-between'}}>
          {category.image === '' ? (
            <TouchableOpacity
              style={[styles.image, styles.image.empty]}
              onPress={() => {
                // openCamera();
                setVisible(true);
              }}>
              <Icon name="add" style={{color: light.inactiveTab}} />
            </TouchableOpacity>
          ) : (
            [
              <TouchableOpacity
                style={[styles.image, styles.image.provided]}
                onPress={() => {
                  setVisible();
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: category.image}}
                />
              </TouchableOpacity>,
              <TouchableOpacity
                style={styles.cancelImage}
                onPress={() => setCategory({...category, image: ''})}>
                <Icon name="close" style={styles.cancelImage.icon} />
              </TouchableOpacity>,
            ]
          )}

          <Spacer size={15} />
          <View style={styles.inputHeader}>
            <Text style={styles.inputHeader.text}>Name :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary}}
            />
          </View>
          <Input
            placeholder="name"
            value={category.name}
            style={styles.input}
            onChangeText={val => {
              setCategory({...category, name: val});
              //   setTitle(val);
              // setExpense({...expense, title: val});
            }}
          />

          <Spacer size={25} />
          <Text style={styles.inputHeader.text}>Description</Text>
          <Textarea
            placeholder="expense description"
            value={category.description}
            style={styles.textarea}
            onChangeText={val => {
              setCategory({...category, description: val});
              // setExpense({...expense, description: val});
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              AddCategory();
              // resetForm();
            }}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              // resetForm();
              navigation.goBack();
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Content>
      {/* <FabIcon/> */}
    </Container>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
});
const mapDispatchToProps = dispatch => ({
  replaceCategories: dispatch.categories.replaceCategories,
  addCategory: dispatch.categories.addCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);

const styles = StyleSheet.create({
  image: {
    height: 170,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor:light.whiteGrey,
    empty: {
      // borderStyle: 'dashed',
      // borderWidth: 1,
      // borderColor: light.inactiveTab,
    },
    provided: {
      elevation: 10,
      shadowOpacity: 0.9,
      shadowColor: light.textColor,
    },
    elevation: 10,
    shadowOpacity: 0.9,
    shadowColor: light.textColor,
  },
  saveButton: {
    backgroundColor: light.brandPrimary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 25,
  },
  error: {
    color: light.brandPrimary,
  },
  saveText: {
    color: light.inverseTextColor,
    fontFamily: 'ubuntu-bold',
    fontSize: 20,
  },
  cancelText: {
    color: light.inactiveTab,
    fontFamily: 'ubuntu',
    fontSize: 18,
    fontWeight: '700',
  },
  inputHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    text: {
      fontWeight: 'bold',
      color: light.textColor,
    },
  },
  input: {
    borderRadius: 10,
    backgroundColor: light.whiteGrey,
    paddingLeft: 10,
  },
  textarea: {
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    backgroundColor: light.whiteGrey,
  },
  cancelImage: {
    position: 'absolute',
    icon: {
      color: light.brandPrimary,
    },
    elevation: 10,
    shadowColor: light.brandPrimary,
    shadowOpacity: 0.95,
    shadowRadius: 0.5,
    right: 5,
    top: 5,
    backgroundColor: light.inverseTextColor,
    borderRadius: 50,
  },
});
