// import {ScrollView} from 'native-base';
import moment from 'moment/moment';
import {Container, Content} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpenseItem from '../components/ExpenseItem';
import light from '../constants/theme/light';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
const date = moment(date).format('YYYY-MM-DD');
const Expenses = ({navigation}) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [oldTotalAmount, setOldTotalAmount] = useState(0);
  const [oldExpenses, setOldExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

  //=================================================================================
  // const getExpenses = () => {
  // var result = [];
  useEffect(() => {
    // console.log('current date', currentDate);
  }, []);
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM Expenses', [], (txn, res) => {
      var len = res.rows.length;
      // console.log('current Date : ', currentDate);
      if (len > 0) {
        var oldExpenses = [];
        // currentDate = new Date()
        var currentExpenses = [];
        var amount = 0;
        var oldAmount = 0;
        for (let i = 0; i < len; ++i) {
          // console.log(
          //   `item ${i} created at : `,
          //   moment(res.rows.item(i).created_at).format('YYYY-MM-DD'),
          // );
          if (
            moment(res.rows.item(i).created_at).format('YYYY-MM-DD') ===
              currentDate
          ) {
            currentExpenses.push(res.rows.item(i));
            amount += res.rows.item(i).amount;
          } else if (
            moment(res.rows.item(i).created_at).format('YYYY-MM-DD') !==
              currentDate
          ) {
            {
              oldExpenses.push(res.rows.item(i));
              oldAmount += res.rows.item(i).amount;
            }
          }
          // console.log(`item ${i}:`, res.rows.item(i));
          // expenses.push(res.rows.item(i));
        }
        setOldExpenses(oldExpenses);
        setExpenses(currentExpenses);
        setTotalAmount(amount);
        setOldTotalAmount(oldAmount);
      }
      // return result;
    });
  });
  //=================================================================================

  return (
    <Container>
      <SafeAreaView>
        <View style={styles.header}>
          <ImageBackground
            source={require('../../assets/pictures/tirelire.png')}
            resizeMode="cover"
            style={styles.image}>
            <Text style={styles.text}>BeAware</Text>
          </ImageBackground>
        </View>
      </SafeAreaView>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: light.brandPrimary,
        }}>
        <Text style={styles.title}>Dépences</Text>
        <Text style={styles.title}>{totalAmount}</Text>
      </View> */}

      <Content>
        <View style={{padding: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionTitle}>Today</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{totalAmount}</Text>
              {expenses.length > 5 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('All Expenses', {items: expenses})
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>all</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    style={{fontSize: 20}}
                  />
                </TouchableOpacity>
              ) : expenses.length < 0 ? (
                <Text>Nothing to show here</Text>
              ) : (
                <Text />
              )}
            </View>
          </View>
          <View>
            <FlatList
              style={{marginBottom: 10}}
              data={expenses}
              keyExtractor={item => item.expense_id}
              renderItem={({item}) => [
                <ExpenseItem item={item} navigation={navigation} />,
              ]}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={{padding: 16, marginTop: -45}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionTitle}>Olds</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{oldTotalAmount}</Text>
              {oldExpenses.length > 5 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('All Expenses', {items: oldExpenses})
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>all</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    style={{fontSize: 20}}
                  />
                </TouchableOpacity>
              ) : oldExpenses.length < 0 ? (
                <Text>Nothing to show here</Text>
              ) : (
                <Text />
              )}
            </View>
          </View>

          <View>
            <FlatList
              style={{marginBottom: 10}}
              data={oldExpenses}
              keyExtractor={item => item.expense_id}
              renderItem={({item}) => [
                <ExpenseItem item={item} navigation={navigation} />,
              ]}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: light.brandPrimary,
    fontSize: 20,
    fontFamily: 'ubuntu-bold',
    marginEnd: 10,
    // marginTop: 15,
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
    // marginBottom: 20,
  },
  itemSeparator: {
    height: 10,
    backgroundColor: light.inverseTextColor,
    // opacity: colorEmphasis.medium,
  },

  container: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    // color: darkColors.onBackground,
    // opacity: colorEmphasis.high,
  },
  item: {
    backgroundColor: '#121212',
    height: 80,
    flexDirection: 'row',
    padding: 10,
  },
  // messageContainer: {
  //   // backgroundColor: darkColors.backgroundColor,
  //   maxWidth: 300,
  // },
  // name: {
  //   fontSize: 16,
  //   // color: darkColors.primary,
  //   // opacity: colorEmphasis.high,
  //   fontWeight: '800',
  // },
  // subject: {
  //   fontSize: 14,
  //   // color: darkColors.onBackground,
  //   // opacity: colorEmphasis.high,
  //   fontWeight: 'bold',
  //   // textShadowColor: darkColors.secondary,
  //   textShadowOffset: {width: 1, height: 1},
  //   textShadowRadius: 4,
  // },
  // text: {
  //   fontSize: 10,
  //   // color: darkColors.onBackground,
  //   // opacity: colorEmphasis.medium,
  // },
  // avatar: {
  //   width: 40,
  //   height: 40,
  //   backgroundColor: darkColors.onBackground,
  //   opacity: colorEmphasis.high,
  //   borderColor: darkColors.primary,
  //   borderWidth: 1,
  //   borderRadius: 20,
  //   marginRight: 7,
  //   alignSelf: 'center',
  //   shadowColor: darkColors.secondary,
  //   shadowOffset: {width: 1, height: 1},
  //   shadowRadius: 2,
  //   shadowOpacity: colorEmphasis.high,
  // },
  // qaContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },

  // button: {
  //   width: 80,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // buttonText: {
  //   fontWeight: 'bold',
  //   opacity: 0.8,
  // },
  // button1Text: {
  //   color: light.brandPrimary,
  // },
  // button2Text: {
  //   color: '#086dbb',
  // },
  // button3Text: {
  //   color: '#fe0404',
  // },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#eab07ea9',
  },
});
export default Expenses;
