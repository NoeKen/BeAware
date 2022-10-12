import { ToastAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

// export default{
  export async function CreateExpense(expense,{navigation}) {
    if (expense.amount === '' || expense.title === '') {
      ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
      return;
    }
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
        // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Expenses(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, description VARCHAR(255),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,amount,description) VALUES (:title,:amount,:description)',
          // 'INSERT INTO Expenses (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
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
// };
