import { ToastAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

  export async function CreateExpense(expense,{navigation}) {
    if (expense.amount === '' || expense.title === '' || expense.category_id === undefined) {
      ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
      return;
    }
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
        // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Expenses(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, category_id INTEGER, description VARCHAR(255),created_at DATETIME )',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,amount,category_id,description,created_at) VALUES (:title,:amount,:category_id,:description,:created_at)',
          // 'INSERT INTO Expenses (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
          [expense.title, expense.amount, expense.category_id, expense.description,expense.created_at],
        );
      });
      navigation.navigate('Home');
      ToastAndroid.show('task created successfully', ToastAndroid.LONG);
    } catch (error) {
      setReqError(`An error occurred saving the expense : ${error.message}`);
      console.log('error occurred: ', error);
    }
  }

  export function listExpenses (){
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
  }

  export function deleteExpense(id) {}
  export function updateExpense(id,expense) {}
  export function CreateExpenseList(expenses) {
    if (expense.amount === '' || expense.title === '' || expense.category_id === undefined) {
      ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
      return;
    }
    try {
      db.transaction(function (txn) {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS ExpensesList(id INTEGER PRIMARY KEY NOT NULL, title VARCHAR(30),amount INTEGER, category_id INTEGER, description VARCHAR(255),created_at DATETIME )',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,amount,category_id,description,created_at) VALUES (:title,:amount,:category_id,:description,:created_at)',
          // 'INSERT INTO Expenses (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
          [expense.title, expense.amount, expense.category_id, expense.description,expense.created_at],
        );
      });
      navigation.navigate('Home');
      ToastAndroid.show('task created successfully', ToastAndroid.LONG);
    } catch (error) {
      setReqError(`An error occurred saving the expense : ${error.message}`);
      console.log('error occurred: ', error);
    }
  }