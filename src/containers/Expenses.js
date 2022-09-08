// import {ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import {openDatabase} from 'react-native-sqlite-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../constants/theme/light';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

const Expenses = ({navigation}) => {
  const [expenses, setExpenses] = useState([]);
  //=================================================================================
  // const getExpenses = () => {
    // var result = [];
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM `Expenses`', [], (txn, res) => {
        var len = res.rows.length;
        if (len > 0) {
          var result = [];
          for (let i = 0; i < len; ++i) {
            result.push(res.rows.item(i));
            // console.log(`item ${i}:`, res.rows.item(i));
            expenses.push(res.rows.item(i));
          }
          setExpenses(result);
        }
        // return result;
      });
    });
    // db.transaction(function (txn) {
    //   txn.executeSql(
    //     'SELECT * FROM `Expenses`',
    //     [],
    //     function (tx, res) {
    //       for (let i = 0; i < res.rows.length; ++i) {
    //         console.log(`item ${i}:`, res.rows.item(i));
    //         // return`item ${i}:`, res.rows.item(i);
    //         expenses.push(res.rows.item(i));
    //       }
    //       // return result;
    //     },
    //   );
    // });
    // setExpenses(result);
  // };

  useEffect(() => {
    // setExpenses(result)
    // getExpenses();
    // console.log('results:', expenses);
  }, []);
  //=================================================================================

  return (
    <>
      {/* <StatusBar bg={light.brandPrimary} barStyle="light-content" /> */}
      {/* <View style={styles.container}> */}
      <SafeAreaView>
        <View style={styles.header}>
          <ImageBackground
            source={require('../../assets/pictures/tirelire.png')}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text}>BeAware</Text>
          </ImageBackground>
        </View>
        {/* <View> */}
        {/* </View> */}
        {/* <Spacer size={10} /> */}
        {/* <ScrollView width={'xs'} showsVerticalScrollIndicator={false}> */}
        <View style={{padding: 16}}>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Dépences</Text>
            <TouchableOpacity onPress={() => getExpenses()}>
              {/* <Text style={{fontSize: 20}}>Create</Text> */}
              <MaterialCommunityIcons
                name="reload"
                style={{fontSize: 20}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionTitle}>Aujourd'hui</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
              {/* <Text style={{fontSize: 20}}>Create</Text> */}
              <MaterialCommunityIcons
                name="table-edit"
                style={{fontSize: 20}}
              />
            </TouchableOpacity>
          </View>
          <Text>bien</Text>
          <View>
            <FlatList
              style={{marginBottom: 10}}
              data={expenses}
              keyExtractor={item=>item.expense_id}
              renderItem={({item}) => [
                <View
                  style={{
                    height: 60,
                    backgroundColor: '#d8d7d8ad',
                    marginVertical: 2,
                    borderRadius: 8,
                    padding: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View style={{flex: 0.75, justifyContent: 'space-between'}}>
                    <Text
                      style={{
                        color: light.textColor,
                        fontFamily: 'ubuntu-bold',
                        fontSize: 18,
                      }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color:
                          item.description === ''
                            ? '#7070703e'
                            : light.inactiveTab,
                        fontFamily: 'Montserrat-Medium',
                      }}
                      numberOfLines={1}>
                      {item.description === ''
                        ? 'Aucune description fournie'
                        : item.description}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: light.brandPrimary,
                      alignSelf: 'center',
                      textAlign: 'right',
                      fontFamily: 'ubuntu-bold',
                      fontSize: 18,
                      flex: 0.25,
                    }}>
                    {item.amount}
                  </Text>
                </View>,
              ]}
            />
          </View>
          <Text>bien</Text>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    // backgroundColor:light.textColor
  },
  title: {
    color: light.brandPrimary,
    // fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'ubuntu-bold',
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ubuntu-bold',
    marginBottom: 15,
    marginTop: 20,
  },
  image: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 120,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#783c3cc0',
  },
  header: {
    height: 120,
    // backgroundColor: '#eab07ea9',
    marginBottom: 20,
  },
});
export default Expenses;
