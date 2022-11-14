import {Container, Content, Icon, View} from 'native-base';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import CategoryItem from '../components/category/categoryItem';
import FabIcon from '../ui/fabIcon';
import SQLite from 'react-native-sqlite-2';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {ImageBackground} from 'react-native';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
export default function Home({navigation}) {
  const [categories, setCategories] = useState();
  const [data, setData] = useState([
    {
      name: 'Ecole',
      description: "cette section concerne toutes les depenses liees a l'ecole",
      image:
        'file:///storage/emulated/0/Android/data/com.beaware/files/Pictures/f4583258-aa7d-4af6-9a08-53822c7938a3.jpg',
    },
    {
      name: 'travail',
      description:
        'cette section concerne toutes les depenses liees au travail',
      image:
        'file:///storage/emulated/0/Android/data/com.beaware/files/Pictures/d65a76ec-5872-4e64-a983-c5d9f54c3de8.jpg',
    },
  ]);

  // useEffect(() => {
  //   db.transaction(txn => {
  //     txn.executeSql(
  //       'select * from Categories',
  //       // 'select * from Categories ORDER BY date(created_at)',
  //       [],
  //       (txn, res) => {
  //         var len = res.rows.length;
  //         var cat = []
  //         if (len > 0) {
  //           for (let i = 0; i < len; ++i) {
  //               cat.push(res.rows.item(i));
  //               console.log('<=====> category: <==========> ',res.rows.item(i));
  //             }
  //         }
  //         setCategories(cat)
  //       }
  //     );
  //   });
  // }, [])

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
      <View style={{paddingHorizontal:8}}>
        <Text style={{fontWeight:'bold',fontSize:25,marginVertical:12}}>Expenses Groups</Text>
        {categories?.length === 0 ? (
          <Text style={styles.emptyText}>
            No category yet{'\n'}Create one first
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
