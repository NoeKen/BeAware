// import { Picker } from '@react-native-community/picker';
import moment from 'moment/moment';
import {Container, Content, Icon, Picker, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <View style={styles.itemsContenair}>
          <Text style={styles.textLabel}>State</Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.textValue}
            placeholder="State"
            placeholderIconColor="#007aff"
            placeholderTextColor="#707070"
            // selectedValue={state}
            onValueChange={async val => {
              console.log('=============== val state =====================');
              console.log('val state: ', val);
              console.log('=============== val state =====================');
              // setState(val);
              // val === null ? setModalVisible(true) : setModalVisible(false);
              // await replaceCreateBookUser({...createBookUser, state: val});
            }}>
            <Picker.Item
              label="state value "
              value=""
              key="id"
              style={{color: light.inactiveTab}}
            />
            <Picker.Item label="New" value="new" key="N" />
            <Picker.Item label="second" value="second" key="S" />
            <Picker.Item label="Old" value="old" key="O" />
            <Picker.Item label="Degraded" value="degraded" key="D" />
          </Picker>
        </View>
        <Picker
          onValueChange={async val => {
            console.log('=============== val state =====================');
            console.log('val state: ', val);
            console.log('=============== val state =====================');
          }}>
          <Picker.Item label="New" value="new" key="N" />
          <Picker.Item label="second" value="second" key="S" />
          <Picker.Item label="Old" value="old" key="O" />
          <Picker.Item label="Degraded" value="degraded" key="D" />
        </Picker>
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
              Date
            </DataTable.Title>
            <DataTable.Title
              style={{}}
              textStyle={{color: light.brandSecond, fontSize: 16}}>
              Descript°
            </DataTable.Title>
          </DataTable.Header>
          {expenses.map((expense, index) => {
            return (
              <DataTable.Row
                key={expense.id}
                onPress={() => {
                  console.log(`selected account ${expense.title}`);
                  navigation.navigate('Expense Detail', {item: expense});
                }}>
                <DataTable.Cell
                  style={{
                    backgroundColor: light.whiteGrey,
                    marginLeft: -15,
                    justifyContent: 'center',
                  }}
                  textStyle={{color: light.brandSecond, fontSize: 16}}
                  numeric>
                  {index + 1}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.messageColumn, {marginVertical: 10}]}
                  accessibilityHint="press"
                  textStyle={{fontSize: 16}}>
                  {expense.title}
                </DataTable.Cell>
                <DataTable.Cell>{expense.amount}</DataTable.Cell>
                <DataTable.Cell>
                  {moment(expense.created_at).calendar('date')}
                  {/* {moment(expense.created_at).format('YYYY-MM-DD')} */}
                </DataTable.Cell>
                <DataTable.Cell>
                  {expense.description === '' ? 'empty' : expense.description}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
        {/* <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) =>
            // setSelectedLanguage(itemValue)
            console.log('item elected: ',itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
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
    alignItems: 'center',
    refreshText: {
      textAlign: 'right',
      color: light.brandPrimary,
      marginVertical: 16,
    },
  },
  itemsContenair: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textValue: {
    borderLeftWidth: 1,
    borderLeftColor: light.inactiveTab,
    textAlign: 'right',
    fontFamily: 'Montserrat-Regular',
    width: '60%',
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  textLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: light.inactiveTab,
    width: '40%',
  },
});
