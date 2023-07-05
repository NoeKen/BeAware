// import { Picker } from '@react-native-community/picker';
import moment from 'moment/moment';
import {Container, Content, Icon, Picker, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {DataTable} from 'react-native-paper';
// import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import {connect} from 'react-redux';

const optionsPerPage = [2, 3, 4];
// const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

const Dashboard = ({navigation, expenses,deleteExpense, replaceSelectedCategory}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  // const [expenses, setExpenses] = useState([]);
  const [dashExpenses, setDashExpenses] = useState([]);

  async function removeItem(id) {
    console.log('id to delete:', id);
    await deleteExpense(id);
    navigation.replace('Dashboard');
    // getExpenses();
  }

  useEffect(()=>{
    setDashExpenses(expenses)
  },[expenses])

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <Container style={styles.container}>
      <Header title={'Dashboard'} />
      <Content style={styles.content}>
        {/* <TouchableOpacity
          style={styles.refreshContainer}
          // onPress={() => GetExpenses()}
          >
          <MaterialCommunityIcons
            name="table-refresh"
            style={{fontSize: 20, color: light.brandPrimary}}
          />
          <Text style={styles.refreshContainer.refreshText}>Refresh</Text>
        </TouchableOpacity> */}
        <DataTable>
          <DataTable.Header
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: light.whiteGrey,
            }}>
            <DataTable.Title
              // style={{justifyContent: 'center'}}
              textStyle={styles.tableHeader}>
              Num
            </DataTable.Title>
            <DataTable.Title
              style={{alignSelf: 'center'}}
              textStyle={styles.tableHeader}>
              Title
            </DataTable.Title>
            <DataTable.Title style={{}} textStyle={styles.tableHeader}>
              Amount
            </DataTable.Title>
            <DataTable.Title style={{}} textStyle={styles.tableHeader}>
              Date
            </DataTable.Title>
            {/* <DataTable.Title style={{}} textStyle={styles.tableHeader}>
              Descript°
            </DataTable.Title> */}
          </DataTable.Header>
          {dashExpenses.length < 1 ? (
            <View
              style={{
                justifyContent: 'center',
                height: Dimensions.get('screen').height * 0.5,
              }}>
              <Text style={{color: light.inactiveTab, textAlign: 'center'}}>
                All your expenses will appear in this table
              </Text>
            </View>
          ) : (
            <>
              {expenses.map((expense, index) => {
                return (
                  <DataTable.Row
                    key={expense.id}
                    onPress={() => {
                      // console.log(`selected account ${expense.title}`);
                      replaceSelectedCategory();
                      navigation.navigate('Expense Detail', {item: expense});
                    }}
                    onLongPress={() =>
                      Alert.alert('Delete item', 'Are you sure you want to delete this item?', [
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => removeItem(expense.id)},
                      ])
                    }>
                    <DataTable.Cell
                      style={{
                        backgroundColor: light.whiteGrey,
                        marginLeft: -15,
                        justifyContent: 'center',
                      }}
                      textStyle={styles.tableHeader}
                      numeric>
                      {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.messageColumn, {}]}
                      accessibilityHint="press"
                      textStyle={styles.tableValue}>
                      {expense.title}
                    </DataTable.Cell>

                    <DataTable.Cell textStyle={styles.tableValue}>
                      {expense.amount}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableValue}>
                      {moment(expense.created_at).calendar('date')}
                      {/* {moment(expense.created_at).format('YYYY-MM-DD')} */}
                    </DataTable.Cell>
                    {/* <DataTable.Cell textStyle={styles.tableValue}>
                      {expense.description === ''
                        ? 'empty'
                        : expense.description}
                    </DataTable.Cell> */}
                  </DataTable.Row>
                );
              })}
            </>
          )}
        </DataTable>
        <View style={{height: 40}} />
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  expenses: state.expenses.expenses,
});

const mapDispatchToProps = dispatch => ({
  deleteExpense: dispatch.expenses.deleteExpense,
  replaceSelectedCategory: dispatch.categories.replaceSelectedCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 12,
  },
  tableHeader: {
    color: light.brandSecond,
    // textShadowColor: light.brandPrimary,
    fontSize: 16,
  },
  tableValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    refreshText: {
      textAlign: 'right',
      color: light.brandPrimary,
      marginVertical: 16,
    },
  },
});
