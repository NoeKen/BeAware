// import {Input, TextArea} from 'native-base';
import moment from 'moment';
import {
  Container,
  Content, Icon,
  Input,
  Picker, Textarea
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity, View
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import { CreateExpense } from '../Services/expensesService';


const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

 const AddExpense=({navigation}) => {
  const [error, setError] = useState('');
  const [reqError, setReqError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState();
  const [expense, setExpense] = useState({
    title: '',
    description: '',
    amount: '',
    category_id: '',
    created_at : moment(new Date()).format('YYYY-MM-DD','HH:MM')
  });

  db.transaction(txn => {
    const cats = txn.executeSql(
      'select * from Categories',
      // 'select * from Categories ORDER BY date(created_at)',
      [],
      (txn, res) => {
        var len = res.rows.length;
        var cat = [];
        if (len > 0) {
          for (let i = 0; i < len; ++i) {
            cat.push(res.rows.item(i));
            // console.log('<=====> category: <==========> ',res.rows.item(i));
          }
        }
        setCategories(cat);
        // console.log('categories:',categories);
        // categories = cat
      },
    );
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
    try {
      CreateExpense(expense, (navigation = {navigation}));
    } catch (error) {
      console.log('error when creating expense : ', error);
    }
  }
  const [tasks, setTask] = useState([{}]);

  // useEffect(() => {
  // }, []);
  return (
    <Container style={{flex: 1}}>
      <Header title={'New expense'} />
      <Content>
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
              setExpense({...expense, amount: val});
            }}
          />

          <View style={[styles.inputHeader, {marginTop: 20}]}>
            <Text style={styles.inputHeader.text}>Category :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary, marginEnd: 20}}
            />
          </View>
          {
            // cat
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select a category"
            style={[
              {height: 50, borderRadius: 10, backgroundColor: light.whiteGrey},
            ]}
            placeholderIconColor="#007aff"
            selectedValue={selected}
            onValueChange={val => {
              console.log('cat selected: ', val);
              setSelected(val), setExpense({...expense, category_id: val});
            }}>
            <Picker.Item
              label="Related category"
              key={-1}
              value={undefined}
              style={{color: light.inactiveTab}}
              color={light.placeholder}
            />
            {categories.map(item => {
              return <Picker.Item label={item.name} value={item.id} />;
            })}
          </Picker>}
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.inputHeader.text}>Description</Text>
          <Textarea
            placeholder="expense description"
            value={expense.description}
            style={styles.textarea}
            onChangeText={val => {
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
              navigation.goBack();
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: light.brandPrimary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    alignItems: 'center',
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
      color: light.textColor,
    },
  },
  input: {
    borderRadius: 10,
    backgroundColor: light.whiteGrey,
    paddingLeft: 10,
  },
  textarea: {
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    backgroundColor: light.whiteGrey,
  },
  image: {
    flex: 1,
  },
});

export default AddExpense;