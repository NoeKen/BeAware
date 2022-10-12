import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);


export async function CreateCategory(category,{navigation}) {
    if (expense.amount === '' || expense.title === '') {
      ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
      return;
    }
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
        // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Categories(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), image VARCHAR(255), description VARCHAR(255),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
          [],
        );
        txn.executeSql(
          'INSERT INTO Expenses (title,image,description) VALUES (:title,:image,:description)',
          // 'INSERT INTO Expenses (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
          [category.name,category.image,category.description],
        );
      });
      navigation.navigate('Home');
      ToastAndroid.show('task created successfully', ToastAndroid.LONG);
    } catch (error) {
      setReqError(`An error occurred saving the expense : ${error.message}`);
      console.log('error occurred: ', error);
    }
  }