import {Button, Container, Content, Icon, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import CategoryItem from '../components/category/categoryItem';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import {CategoriesList} from '../Services/categoriesService';
import FabIcon from '../ui/fabIcon';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
//  const Home=({navigation,getCategories,categories})=> {
const Home = ({categories,deleteCategory,deleteCascadeExpenses}) => {
  // const [categories, setCategories] = useState([]);
  const navigation= useNavigation()
  useEffect(() => {
    categories
  }, [categories]);

  const removeCategory = async () => {
    await deleteCategory()
  };

  return (
    <Container style={styles.container}>
      <SafeAreaView>
        {/* <Header title={'Home'} 
        // iconR="menu" 

        /> */}
        <View style={styles.header}>
            <ImageBackground
              source={require('../../assets/pictures/tirelire.png')}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>beAware</Text>
            </ImageBackground>
          </View>
      </SafeAreaView>
      <Content>
        <View style={{paddingHorizontal: 16, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: light.inactiveTab,
              }}>
              Expenses Categories
            </Text>
            <Icon name='refresh' onPress={()=>navigation.refresh()} />
          </View>
          <View>
            {categories?.length < 1 ? (
              <Text style={styles.emptyText}>
                No category yet.{'\n\n'}Create one first
              </Text>
            ) : (
              <FlatList
                data={categories}
                // style={{marginBottom: 58, paddingBottom: 50}}
                disableVirtualization={true}
                renderItem={({item}) => (
                  <CategoryItem data={item} deleteCascadeExpenses={deleteCascadeExpenses} removeCategory={deleteCategory} key={item.index} />
                )}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={2}
              />
            )}
          </View>
        </View>
      </Content>
      <FabIcon onPress={() => navigation.navigate('Add Category')} />
    </Container>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  getCategories: dispatch.categories.getCategories,
  deleteCategory: dispatch.categories.deleteCategory,
  deleteCascadeExpenses:dispatch.expenses.deleteCascadeExpenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 150,
    color: light.inactiveTab,
  },
  image: {
    flex: 1,
  },
  text: {
    color: light.brandLight,
    fontSize: 42,
    lineHeight: 170,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#5ad6ec5a',
    textShadowColor: '#023d5fff',
    textShadowRadius:5,
    textShadowOffset:{
      height: 0,
      width: 3,
    }
  },
  header: {
    height: 140,
  },
});
