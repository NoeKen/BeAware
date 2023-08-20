// import {ScrollView} from 'native-base';
import moment from 'moment/moment';
import {Container} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {getCatExpenses} from '../Services/expensesService';
import Header from '../components/UI/header';
import ExpenseItem from '../components/expenses/ExpenseItem';
import All from '../components/expenses/more';
import light from '../constants/theme/light';
import FabIcon from '../ui/fabIcon';

const date = moment(date).format('YYYY-MM-DD');

const Expenses = ({route, navigation, expenses, categories, deleteExpense}) => {
  const {cat} = route.params;
  const [curExpenses, setCurExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [oldTotalAmount, setOldTotalAmount] = useState(0);
  const [oldExpenses, setOldExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  const [catExpenses, setCatExpenses] = useState(
    getCatExpenses(expenses, cat.id),
  );

  useEffect(() => {
    getExpenses();
  }, [expenses]);

  function getExpenses() {
    var oldExpenses = [];
    var currentExpenses = [];
    var amount = 0;
    var oldAmount = 0;
    // const catExpenses = getCatExpenses(expenses, cat.id);
    catExpenses?.map(expense => {
      if (moment(expense.created_at).format('YYYY-MM-DD') === currentDate) {
        currentExpenses.push(expense);
        amount += parseInt(expense.amount);
      } else if (
        moment(expense.created_at).format('YYYY-MM-DD') !== currentDate
      ) {
        {
          oldExpenses.push(expense);
          oldAmount += parseInt(expense.amount);
        }
      }
      // const descDates = currentExpenses.sort((a, b) => {
      //   return new Date(b).getTime() - new Date(a).getTime();
      // });
    });
    oldExpenses.sort((a, b) => moment(b.created_at).diff(moment(a.created_at)));
    currentExpenses.sort((a, b) =>
      moment(b.created_at).diff(moment(a.created_at)),
    );
    setOldExpenses(oldExpenses);
    setCurExpenses(currentExpenses);
    setTotalAmount(amount);
    setOldTotalAmount(oldAmount);
  }

  return (
    <>
      <SafeAreaView>
        <Header
          navigation={navigation}
          iLeft={'arrow-back'}
          title={`- ${cat.name}-  ` + ' Expenses'}
          amount={totalAmount + oldTotalAmount}
          // iconR={'add-circle'}
          // onPress={() => navigation.navigate('AddExpense')}
        />
      </SafeAreaView>
      <ScrollView>
        <View style={{}}>
          <View
            style={styles.sectionHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionTitle}>Today</Text>
              {curExpenses?.length > 0 && (
                <Text style={styles.badge.text}>
                  {curExpenses?.length < 10
                    ? '0' + curExpenses?.length
                    : curExpenses?.length}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      totalAmount < 0 ? light.brandDanger : light.brandPrimary,
                  },
                ]}>
                {totalAmount} XCFA
              </Text>
              
            </View>
            {curExpenses?.length > 4 && (
              <All
                onPress={() =>
                  navigation.navigate('All Expenses', {
                    items: curExpenses,
                    title: "Today's Expenditures",
                  })
                }
              />
            )}
          </View>
          <View style={{paddingBottom:20,}}>
            {curExpenses?.length < 1 ? (
              <Text style={styles.emptyText}>No expenditures made today</Text>
            ) : (
              <FlatList
                // style={{paddingBottom: 20}}
                data={curExpenses}
                keyExtractor={item => item.expense_id}
                renderItem={({item, index}) => [
                  // console.log('index: ',index),
                  index < 5 && (
                    <ExpenseItem
                      item={item}
                      categories={categories}
                      navigation={navigation}
                      deleteExpense={deleteExpense}
                      getExpenses={getExpenses}
                    />
                  ),
                ]}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
        <View style={{marginTop: -20}}>
          <View
            style={[styles.sectionHeader]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionTitle}>Past</Text>
              {oldExpenses?.length > 0 && (
                <Text style={styles.badge.text}>
                  {oldExpenses?.length < 10
                    ? '0' + oldExpenses?.length
                    : oldExpenses?.length}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      oldTotalAmount < 0 ? light.brandDanger : light.brandPrimary,
                  },
                ]}>
                {oldTotalAmount} XCFA
              </Text>
              
            </View>
            {oldExpenses?.length > 4 && (
              <All
                onPress={() =>
                  navigation.navigate('All Expenses', {
                      items: oldExpenses,
                      title: 'Past expenditures',
                    })
                }
              />
            )}
          </View>
          <View>
            {oldExpenses?.length < 1 ? (
              <Text style={styles.emptyText}>Your passed expenditures will appear there</Text>
            ) : (
              <FlatList
                // style={{marginBottom: 10}}
                data={oldExpenses}
                keyExtractor={item => item.expense_id}
                renderItem={({item, index}) =>
                  index < 5 && (
                    <ExpenseItem
                      item={item}
                      navigation={navigation}
                      deleteExpense={deleteExpense}
                      getExpenses={getExpenses}
                    />
                  )
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <FabIcon onPress={() => navigation.navigate('AddExpense', {cat: cat})} />
    </>
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
    fontWeight: '900',
  },
  sectionHeader:{
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal:16,
    marginBottom: 15,
    backgroundColor: light.brandLight
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ubuntu-bold',
    fontWeight: '900',
    marginBottom: 15,
    marginTop: 20,
    color: light.textColor,
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
  badge: {
    backgroundColor: light.whiteGrey,
    height: 20,
    text: {
      fontSize: 8,
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
    color: light.placeholder,
    textAlign: 'center',
    marginVertical: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  deleteExpense: dispatch.expenses.deleteExpense,
});
const mapStateToProps = state => ({
  expenses: state.expenses.expenses,
  categories: state.categories.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
