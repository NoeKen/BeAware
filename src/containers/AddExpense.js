// import {Input, TextArea} from 'native-base';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import light from '../constants/theme/light';
import {getDBConnection, getExpenses} from '../services/db-service';
import {Content, Input, Tab, Textarea} from 'native-base';

// const db = openDatabase({
//   name: 'baAware',location:'default'
// });

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
// const db = SQLite.openDatabase('test.db', '1.0', '', 1);
export default function AddExpense({navigation}) {
  const [error, setError] = useState('');
  const [reqError, setReqError] = useState('');
  //   const [reset, setRest] = useState(false);
  //   const [title, setTitle] = useState();
  //   const [amount, setAmount] = useState();
  //   const [description, setDescription] = useState();
  const [expense, setExpense] = useState({
    title: '',
    description: '',
    amount: '',
  });

  function resetForm() {
    // setRest(true);
    setExpense({...expense, title: '', description: '', amount: ''});
    setError(''), setReqError('');
    // setTitle('');
    // setAmount('');
    // setDescription('');
  }

  async function createExpense() {
    if (expense.amount === '' || expense.title === '') {
      setError('This field is required');
      return;
    }
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
        // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Expenses(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, description VARCHAR(30),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,amount,description) VALUES (:title,:amount,:description)',
          [expense.title, expense.amount, expense.description],
        );
        // txn.executeSql('SELECT * FROM `Expenses`', [], function (tx, res) {
        //         for (let i = 0; i < res.rows.length; ++i) {
        //           // setTask({...tasks,res.rows,item(i)})
        //           Alert.alert(`item ${i}:`, res.rows.item(i));
        //         //   resul.push(res.rows.item(i));
        //         }
        //       });
      });
      navigation.navigate('Expenses');
      ToastAndroid.show('task created successfully', ToastAndroid.LONG);
    } catch (error) {
      setReqError(`An error occurred saving the expense : ${error.message}`);
      console.log('error occurred: ', error);
    }
  }
  const [tasks, setTask] = useState([{}]);

  useEffect(() => {
    
    // resetForm();
    // createTables();
    // var resul = [];
    // db.transaction(function (txn) {
    //   txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
    //   txn.executeSql(
    //     'CREATE TABLE IF NOT EXISTS Expenses(expense_id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, description VARCHAR(30))',
    //     [],
    //   );
    //   txn.executeSql(
    //     "INSERT INTO Expenses (title,amount,description) VALUES ('manger',5005,'est un concour de danse')",
    //   );
    //   txn.executeSql(
    //     "INSERT INTO Expenses (title,amount,description) VALUES ('LAPTOP',500,'Acheter un laptop')",
    //   );
    //   // txn.executeSql('INSERT INTO Users (name,email) VALUES (:name,:email)', ['Julio','kenfaclnoe@gmai.com'])
    //   txn.executeSql('SELECT * FROM `Expenses`', [], function (tx, res) {
    //     for (let i = 0; i < res.rows.length; ++i) {
    //       // setTask({...tasks,res.rows,item(i)})
    //       console.log(`item ${i}:`, res.rows.item(i));
    //       resul.push(res.rows.item(i));
    //     }
    //   });
    // });
    // setTask(resul);
  }, []);
  //   console.log('tasks: ', tasks);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        {/* {ToastAndroid.show('plateform: '+Platform.os)} */}
        <MaterialCommunityIcons
          name={Platform.OS == 'android' ? 'arrow-left' : 'chevron-left'}
          style={{fontSize: 25, color: light.brandPrimary, marginEnd: 10}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: light.brandPrimary,
          }}>
          New expense
        </Text>
      </View>
      <Content style={{}}>
        <View
          style={{padding: 16, marginTop: 40, justifyContent: 'space-between'}}>
          <View style={styles.inputHeader}>
            <Text style={styles.inputHeader.text}>Title :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary}}
            />
          </View>
          <Input
            placeholder="title"
            value={expense.title}
            style={styles.input}
            onChangeText={val => {
              //   setTitle(val);
              setExpense({...expense, title: val});
            }}
          />
          <Text style={styles.error}>{error}</Text>

          <View style={styles.inputHeader}>
            <Text style={styles.inputHeader.text}>Amount :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary}}
            />
          </View>
          <Input
            placeholder="amount"
            value={expense.amount}
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={val => {
              //   setAmount(val);
              setExpense({...expense, amount: val});
            }}
          />
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.inputHeader.text}>Description</Text>
          <Textarea
            placeholder="expense description"
            value={expense.description}
            style={styles.textarea}
            onChangeText={val => {
              //   setDescription(val);
              setExpense({...expense, description: val});
            }}
          />
          <Text style={styles.error}>{reqError}</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              createExpense(), resetForm();
            }}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={async () => {
              resetForm();
              navigation.navigate('Expenses');
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text>{expense.title}</Text>
        <Text>{expense.amount}</Text>
        <Text>{expense.description}</Text>
      </Content>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    // justifyContent:'center',
    paddingLeft: 16,
    // borderWidth:1,
    flexDirection: 'row',
    // backgroundColor: '#eab07ea9',

    alignItems: 'center',
  },
  saveButton: {
    // marginHorizontal: 16,
    backgroundColor: light.brandPrimary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    // marginHorizontal: 16,
    // backgroundColor: light.brandPrimary,
    // paddingVertical: 14,
    alignItems: 'center',
    // marginTop:-10,
    marginTop: 25,
  },
  error: {
    color: light.brandPrimary,
  },
  saveText: {
    color: light.inverseTextColor,
    fontFamily: 'ubuntu-bold',
    fontSize: 20,
  },
  cancelText: {
    color: light.inactiveTab,
    fontFamily: 'ubuntu',
    fontSize: 18,
    fontWeight: '700',
  },
  inputHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    text: {
      fontWeight: 'bold',
    },
  },
  input: {
    // borderWidth:0.5,
    borderRadius: 10,
    backgroundColor: '#e91e6216',
    paddingLeft: 10,
  },
  textarea: {
    // borderWidth:0.5,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    backgroundColor: '#e91e6216',
  },
  image: {
    flex: 1,
  },
  // text: {
  //   color: 'white',
  //   fontSize: 42,
  //   lineHeight: 120,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   backgroundColor: '#783c3cc0',
  // },
});
