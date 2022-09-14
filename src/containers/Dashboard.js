import * as React from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Constants from 'expo-constants';
import {DataTable} from 'react-native-paper';
import light from '../constants/theme/light';
import SQLite from 'react-native-sqlite-2';
import {Container, Content} from 'native-base';
import { TouchableOpacity } from 'react-native';

const optionsPerPage = [2, 3, 4];
const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

export default Dashboard = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  const [expenses, setExpenses] = useState([]);

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
      <Content style={styles.content}>
        <TouchableOpacity style={styles.refreshContainer} onPress={()=>GetExpenses()} >
          <MaterialCommunityIcons name="chevron-right" style={{fontSize: 20}} />
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
              textStyle={{color: light.brandSecond, fontSize: 16}}>
              Num
            </DataTable.Title>
            <DataTable.Title
              style={{alignSelf: 'center'}}
              textStyle={{color: light.brandSecond, fontSize: 16}}>
              Title
            </DataTable.Title>
            <DataTable.Title
              style={{}}
              textStyle={{color: light.brandSecond, fontSize: 16}}>
              Amount
            </DataTable.Title>
            <DataTable.Title
              style={{}}
              textStyle={{color: light.brandSecond, fontSize: 16}}>
              Descript°
            </DataTable.Title>
          </DataTable.Header>
          {expenses.map(expense => {
            return (
              <DataTable.Row
                key={expense.id}
                onPress={() => {
                  console.log(`selected account ${expense}`);
                }}>
                <DataTable.Cell>{expense.id}</DataTable.Cell>
                <DataTable.Cell style={styles.messageColumn}>
                  {expense.title}
                </DataTable.Cell>
                <DataTable.Cell>{expense.amount}</DataTable.Cell>
                <DataTable.Cell>
                  {expense.description === '' ? 'empty' : expense.description}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
          {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      /> */}
        </DataTable>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    // paddingTop: 16,
    // backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    refreshText: {
      textAlign: 'right',
      color: light.brandPrimary,
      marginVertical: 16,
    },
  },
});
