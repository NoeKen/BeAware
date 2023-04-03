import {Container, Content, View} from 'native-base';
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
import light from '../constants/theme/light';
import {CategoriesList} from '../Services/categoriesService';
import FabIcon from '../ui/fabIcon';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
//  const Home=({navigation,getCategories,categories})=> {
const Home = ({navigation, getCategories}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // getCategories();
  }, []);

  db.transaction(txn => {
    txn.executeSql(
      'select * from Categories',
      // 'select * from Categories ORDER BY date(created_at)',
      [],
      (txn, res) => {
        var len = res.rows.length;
        var cat = [];
        if (len > 0) {
          for (let i = 0; i < len; ++i) {
            cat.push(res.rows.item(i));
            // console.log('<=====> category: <==========> ',res.rows.item(i));
          }
        }
        setCategories(cat);
      },
    );
  });

  return (
    <Container style={styles.container}>
      <Content>
        <SafeAreaView>
          <View style={styles.header}>
            <ImageBackground
              source={require('../../assets/pictures/tirelire.png')}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>beAware</Text>
            </ImageBackground>
          </View>
        </SafeAreaView>
        <View style={{paddingHorizontal: 8, flex: 1}}>
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
            <TouchableOpacity
              // style={styles.refreshContainer}
              onPress={() => getCategories()}>
              <MaterialCommunityIcons
                name="refresh"
                style={{fontSize: 25, color: light.brandPrimary, marginEnd: 10}}
              />
              {/* <Text style={styles.refreshContainer.refreshText}>Refresh</Text> */}
            </TouchableOpacity>
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
                  <CategoryItem data={item} key={item.index} />
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
  },
  image: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 170,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#5ad6ec5a',
  },
  header: {
    height: 140,
  },
});
