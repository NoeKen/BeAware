import {Container, Content, Icon, View} from 'native-base';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CategoryItem from '../components/category/categoryItem';
import FabIcon from '../ui/fabIcon';
import SQLite from 'react-native-sqlite-2';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {ImageBackground} from 'react-native';
import light from '../constants/theme/light';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoriesList } from '../Services/categoriesService';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
export default function Home({navigation}) {
  const [categories, setCategories] = useState([]);


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
      <View style={{paddingHorizontal: 8}}>
        <View style={{flexDirection:'row',marginVertical: 12,alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, }}>
            Expenses Categories
          </Text>
          <TouchableOpacity
            // style={styles.refreshContainer}
            onPress={() => CategoriesList()}
            >
            <MaterialCommunityIcons
              name="refresh"
              style={{fontSize: 25, color: light.brandPrimary,marginEnd:10}}
            />
            {/* <Text style={styles.refreshContainer.refreshText}>Refresh</Text> */}
          </TouchableOpacity>
        </View>
        {categories?.length < 1 ? (
          <Text style={styles.emptyText}>
            No category yet.{'\n\n'}Create one first
          </Text>
        ) : (
          <FlatList
            data={categories}
            style={{paddingBottom: 10}}
            numColumns={2}
            renderItem={item => [
              <CategoryItem data={item.item} navigation={navigation} />,
            ]}
            keyExtractor={item => item.id}
          />
        )}
      </View>
      <FabIcon onPress={() => navigation.navigate('Add Category')} />
    </Container>
  );
}

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
