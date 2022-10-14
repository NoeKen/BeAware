import {
  Container,
  Content,
  Fab,
  Icon,
  Input,
  Text,
  Textarea,
  View,
} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import light from '../constants/theme/light';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import Spacer from '../ui/Spacer';
import moment from 'moment';
import FabIcon from '../ui/fabIcon';
import { CreateCategory } from '../Services/categoriesService';

const AddCategory = ({navigation}) => {
  const [imgPath, setImgPath] = useState(null);
  const [category, setCategory] = useState({
    name:'',
    description:'',
    image:'',
  });

  function pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 170,
      cropping: true,
    }).then(img => {
      console.log('image path : ', img.path );
      setCategory({...category, image: img.path});
      console.log('image modificated : ', category.image);
      // setBooksAdds(image.path);
      // replaceCreateBook({
      //   ...createBook,
      //   picture: {name: 'picture', type: image.mime, uri: image.path},
      // });
    });

    {
      // booksAdd != null ? setImagePicked(true) : setImagePicked(false);
    }
  }

  function AddCategory() {
    CreateCategory(category,navigation={navigation})
  }

  function createCategory() {
    try {
      CreateCategory(category,navigation={navigation})
    } catch (error) {
      console.log('error when creating category : ',error)
    }
  }

  return (
    <Container>
      <Content>
        <View
          style={{padding: 16, marginTop: 20, justifyContent: 'space-between'}}>
          {imgPath === null ? (
            <TouchableOpacity
              style={[
                styles.image,
                imgPath == null ? styles.image.empty : {elevation: 10},
              ]}
              onPress={() => {
                pickImage();
              }}>
              <Icon name="add" style={{color: light.inactiveTab}} />
            </TouchableOpacity>
          ) : (
            [
              <TouchableOpacity
                style={[
                  styles.image,
                  category.image == null ? styles.image.empty : {elevation: 10},
                ]}
                onPress={() => {
                  pickImage();
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: category.image}}
                />
              </TouchableOpacity>,
              <TouchableOpacity style={styles.cancelImage} 
                onPress={()=>setImgPath(null)}
              >
                <Icon name="close" style={styles.cancelImage.icon} />
              </TouchableOpacity>
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
              setCategory({...category,name:val})
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
              setCategory({...category,description:val})
              // setExpense({...expense, description: val});
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              AddCategory()
              // resetForm();
            }}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              // resetForm();
              navigation.goBack()
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
      </Content>
      {/* <FabIcon/> */}
    </Container>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  image: {
    height: 170,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    empty: {
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: light.inactiveTab,
    },
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
    icon:{
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
