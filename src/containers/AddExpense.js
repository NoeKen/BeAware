import {Input, TextArea} from 'native-base';
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
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import light from '../constants/theme/light';
import {getDBConnection, getExpenses} from '../services/db-service';

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
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Expenses(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, description VARCHAR(30))',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,amount,description) VALUES (:title,:amount,:description)',
          [expense.title, expense.amount, expense.description],
        );
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
        <ImageBackground
          source={require('../../assets/pictures/tirelire.png')}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.text}>BeAware</Text>
        </ImageBackground>
      </View>
      <View style={{padding: 16, flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.inputHeader}>
          <Text>Title :</Text>
          <MaterialCommunityIcons
            name="asterisk"
            style={{fontSize: 10, color: light.brandPrimary}}
          />
        </View>
        <Input
          placeholder="title"
          value={expense.title}
          onChangeText={val => {
            //   setTitle(val);
            setExpense({...expense, title: val});
          }}
        />
        <Text style={styles.error}>{error}</Text>

        <View style={styles.inputHeader}>
          <Text>Amount :</Text>
          <MaterialCommunityIcons
            name="asterisk"
            style={{fontSize: 10, color: light.brandPrimary}}
          />
        </View>
        <Input
          placeholder="amount"
          value={expense.amount}
          onChangeText={val => {
            //   setAmount(val);
            setExpense({...expense, amount: val});
          }}
        />
        <Text style={styles.error}>{error}</Text>
        <Text>Description</Text>
        <TextArea
          placeholder="expense description"
          value={expense.description}
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    // backgroundColor: '#eab07ea9',
    marginBottom: 20,
  },
  saveButton: {
    // marginHorizontal: 16,
    backgroundColor: light.brandPrimary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    // marginHorizontal: 16,
    // backgroundColor: light.brandPrimary,
    // paddingVertical: 14,
    alignItems: 'center',
    // marginTop:-10,
    marginBottom: 25,
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
});
