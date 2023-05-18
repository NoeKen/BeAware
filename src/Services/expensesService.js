import {Alert} from 'react-native';

export function getCatExpenses(expenses, catId) {
  const realExpenses = [];
  expenses?.forEach(expense => {
    if (expense.category_id === catId) {
      realExpenses.push(expense);
    }
  });
  return realExpenses;
}

export function deleteExpense(array, id) {
  console.log('array', array,'id', id);
  const index = array.findIndex(item => item.id === id);
  if (index !== -1) {
    array.splice(index, 1);
    Alert.alert('Item was successfully deleted');
  } else {
    console.log(`item with id ${id} was not found`);
  }
}

export function deleteCascadeExpenses(expenses, catId) {
  expenses.map((item, index) =>{
    if(item.category_id === catId){
      expenses.splice(index, 1);
    }
  })
}

export function generateUniqueID() {
  return Math.random().toString(36).substr(2, 9) + (new Date().getTime()).toString(36);
}