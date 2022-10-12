// import {ScrollView} from 'native-base';
import moment from 'moment/moment';
import {Badge, Container, Content} from 'native-base';
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
    txn.executeSql(
      'select * from Expenses ORDER BY date(created_at)',
      [],
      (txn, res) => {
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
            const descDates = currentExpenses.sort((a, b) => {
              return new Date(b).getTime() - new Date(a).getTime();
            });
            // console.log(`item ${i}:`, res.rows.item(i));
            // expenses.push(res.rows.item(i));
          }
          // currentExpenses.sort((a, b) => a.created_at - b.created_at);
          setOldExpenses(oldExpenses);
          setExpenses(currentExpenses);
          setTotalAmount(amount);
          setOldTotalAmount(oldAmount);
        }
        // return result;
      },
    );
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionTitle}>Today</Text>
              {expenses.length > 0 ? (
                <Text style={styles.badge.text}>
                  {expenses.length < 10
                    ? '0' + expenses.length
                    : expenses.length}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{totalAmount}</Text>
              {expenses.length > 4 ? (
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
            {expenses.length < 1 ? (
              <Text style={styles.emptyText} >No expenses yet made today</Text>
            ) : (
              <FlatList
                style={{marginBottom: 10}}
                data={expenses}
                keyExtractor={item => item.expense_id}
                renderItem={({item, index}) => [
                  // console.log('index: ',index),
                  index < 5 ? (
                    <ExpenseItem item={item} navigation={navigation} />
                  ) : (
                    <Text></Text>
                  ),
                ]}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
        <View style={{padding: 16, marginTop: -45}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionTitle}>Olds</Text>
              {oldExpenses.length > 0 ? (
                <Text style={styles.badge.text}>
                  {oldExpenses.length < 10
                    ? '0' + oldExpenses.length
                    : oldExpenses.length}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{oldTotalAmount}</Text>
              {oldExpenses.length > 4 ? (
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
              ) : (
                <Text />
              )}
            </View>
          </View>

          <View>
            {oldExpenses.length < 1 ? (
              <Text style={styles.emptyText}>No expenditures to today</Text>
            ) : (
              <FlatList
                style={{marginBottom: 10}}
                data={oldExpenses}
                keyExtractor={item => item.expense_id}
                renderItem={({item, index}) => [
                  index < 5 ? (
                    <ExpenseItem item={item} navigation={navigation} />
                  ) : (
                    <Text></Text>
                  ),
                ]}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
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
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ubuntu-bold',
    marginBottom: 15,
    marginTop: 20,
    color: light.inactiveTab,
  },
  image: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 140,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#5ad6ec5a',
  },
  header: {
    height: 140,
  },
  itemSeparator: {
    height: 10,
    backgroundColor: light.inverseTextColor,
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
  },
  item: {
    backgroundColor: '#121212',
    height: 80,
    flexDirection: 'row',
    padding: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#eab07ea9',
  },
  badge: {
    backgroundColor: light.whiteGrey,
    height: 20,
    // width:20,
    text: {
      fontSize: 8,
      // color: '#FFC0CB',
      color: light.brandSecond,
      fontWeight: 'bold',
      backgroundColor: light.whiteGrey,
      marginBottom: 10,
      marginLeft: 5,
      padding: 5,
      borderRadius: 12,
    },
  },
  emptyText: {
    color: light.inputBg,
    textAlign: 'center',
  },
});
export default Expenses;
