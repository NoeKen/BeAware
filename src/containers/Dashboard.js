// import { Picker } from '@react-native-community/picker';
import moment from 'moment/moment';
import {Container, Content, Icon, Picker, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/UI/header';
import light from '../constants/theme/light';

const optionsPerPage = [2, 3, 4];
const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

export default Dashboard = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  const [expenses, setExpenses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();

  function GetExpenses() {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM Expenses', [], (txn, res) => {
        var len = res.rows.length;
        // console.log('current Date : ', currentDate);
        if (len > 0) {
          var expenses = [];
          var amount = 0;
          for (let i = 0; i < len; ++i) {
            // if (
            //   moment(res.rows.item(i).created_at).format('YYYY-MM-DD') ===
            //     currentDate
            // ) {
            //   currentExpenses.push(res.rows.item(i));
            //   amount += res.rows.item(i).amount;
            // } else if (
            //   moment(res.rows.item(i).created_at).format('YYYY-MM-DD') !==
            //     currentDate
            // ) {
            //   {
            //   }
            // }
            expenses.push(res.rows.item(i));
            amount += res.rows.item(i).amount;
            // console.log(`item ${i}:`, res.rows.item(i));
            // expenses.push(res.rows.item(i));
          }
          setExpenses(expenses);
        }
        // return result;
      });
    });
  }

  React.useEffect(() => {
    GetExpenses();
    // console.log('expense: ', expenses[0].title);
    setPage(0);
  }, [itemsPerPage]);

  return (
    <Container style={styles.container}>
      <Header title={'Dashboard'} />
      <Content style={styles.content}>
        <TouchableOpacity
          style={styles.refreshContainer}
          onPress={() => GetExpenses()}>
          <MaterialCommunityIcons
            name="table-refresh"
            style={{fontSize: 20, color: light.brandPrimary}}
          />
          <Text style={styles.refreshContainer.refreshText}>Refresh</Text>
        </TouchableOpacity>
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
            <DataTable.Title
              style={{}}
              textStyle={styles.tableHeader}>
              Amount
            </DataTable.Title>
            <DataTable.Title
              style={{}}
              textStyle={styles.tableHeader}>
              Date
            </DataTable.Title>
            <DataTable.Title
              style={{}}
              textStyle={styles.tableHeader}>
              Descript°
            </DataTable.Title>
          </DataTable.Header>
          {expenses.map((expense, index) => {
            return (
              <DataTable.Row
                key={expense.id}
                onPress={() => {
                  // console.log(`selected account ${expense.title}`);
                  navigation.navigate('Expense Detail', {item: expense});
                }}>
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
                
                <DataTable.Cell textStyle={styles.tableValue}>{expense.amount}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableValue}>
                  {moment(expense.created_at).calendar('date')}
                  {/* {moment(expense.created_at).format('YYYY-MM-DD')} */}
                </DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableValue}>
                  {expense.description === '' ? 'empty' : expense.description}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 12,
  },
  tableHeader:{
    color: light.brandPrimary, 
    fontSize: 16
  },
  tableValue:{
    fontSize:14,
    marginLeft:5
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
