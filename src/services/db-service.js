import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-2';
import {Alert } from 'react-native';

const tableName = 'expenses';
const dbName = 'beAware.db';

enablePromise(true);

export const getDBConnection = async () => {
  const db= await openDatabase({ name: dbName, location: 'default' });
  return db
};

export const createTables = async (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), description VARCHAR(512) DEFAULT null,amount INTEGER(15)
    )`;

  return await db.executeSql(query);
};

export const initDatabase = async ()=>{
  const db = await getDBConnection();
  await createTables(db);
  db.close();
}

export const getExpenses = async (db)=> {
  try {
    const expenses = [];
    const results = await db.executeQuery(`SELECT id,title,description FROM ${tableName}`);
    results.forEach(res => {
      for (let index = 0; index < res.rows.length; index++) {
        expenses.push(res.rows.item(index))
      }
    });
    return expenses;
  } catch (error) {
    console.error('error when getting expenses from database: ',error);
    // Alert.alert('Failed to get expensesItems !!!')
    throw Error('Failed to get expensesItems !!!');
  }
};

export const insertExpenses = async (db, expenseItem) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(title, description, amount) values` +
    `(${expenseItem.title}', '${expenseItem.description}','${expenseItem.amount}')`;
    // expenseItem.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};