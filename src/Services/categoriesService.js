import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);


export async function CreateCategory(category,{navigation}) {
    if (category.amount === '' || category.title === '') {
      ToastAndroid.show('there is at least one obligated field empty', ToastAndroid.LONG);
      return;
    }
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Categories', []);
        // txn, executeSql('DROP DATABASE IF EXISTS beAware.db');
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS Categories(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), image VARCHAR(255), description VARCHAR(255),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)',
          [],
          );
          txn.executeSql(
            'INSERT INTO Categories (name,image,description) VALUES (:name,:image,:description)',
          // 'INSERT INTO Categories (title,amount,description,created_at) VALUES (:title,:amount,:description,:created_at)',
          [category.name,category.image,category.description],
          );
        });
      navigation.navigate('Home');
      ToastAndroid.show('category created successfully', ToastAndroid.LONG);
      console.log('category created');
    } catch (error) {
      // setReqError(`An error occurred saving the category : ${error.message}`);
      console.log('error occurred: ', error);
    }
  }

  var categories = []
  export function CategoriesList (){
    categories=[]
    db.transaction(txn => {
      const cats = txn.executeSql(
        'select * from Categories',
        // 'select * from Categories ORDER BY date(created_at)',
        [],
        (txn, res) => {
          var len = res.rows.length;
          var cat = []
          if (len > 0) {
            for (let i = 0; i < len; ++i) {
                categories.push(res.rows.item(i));
                // console.log('<=====> category: <==========> ',res.rows.item(i));
              }
          }
          // categories = cat
        }
        );
      });
      // console.log("===> Categories: ",categories);
      return categories;
  }

  export const DeleteItem = async (cat) => {
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Categories', []);
        txn.executeSql(`DELETE FROM Categories WHERE id==${cat.id}`, []);
        // console.log(`item id: ${item.id} was successfully deleted`);
       });
      //   navigation.navigate('Categories');
      ToastAndroid.show(
        `item ${cat.name} was successfully deleted`,
        ToastAndroid.LONG,
      );
    } catch (error) {
      ToastAndroid.show(
        'An error occurred',
        ToastAndroid.LONG,
      );
      //   setReqError(`An error occurred when deleting the expense : ${error.message}`);
      console.log('error occurred when deleting the category : ', error);
    }
  };