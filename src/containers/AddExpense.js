// import {Input, TextArea} from 'native-base';
import moment from 'moment';
import {Container, Content, Icon, Input, Picker, Textarea} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import light from '../constants/theme/light';
import Header from '../components/UI/header';
import {v4 as uuidv4} from 'uuid';
import {generateUniqueID} from '../Services/expensesService';
// import {v4 as uuid } from 'uuid';

// const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

const AddExpense = ({navigation, replaceExpenses, expenses, categories}) => {
  const [titleError, setTitleError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [error, setError] = useState('This field is required');
  const [reqError, setReqError] = useState('');
  const [selected, setSelected] = useState();

  const [expense, setExpense] = useState({
    // id: generateUniqueID(),
    id: null,
    title: '',
    description: '',
    amount: 0,
    category_id: '',
    created_at: null,
  });

  function resetForm() {
    // setRest(true);
    setExpense({
      ...expense,
      id: null,
      title: '',
      description: '',
      amount: '',
      created_at: null,
    });
    // setSelected('related category');
    setError(''), setReqError('');
    // setTitle('');
    // setAmount('');
    // setDescription('');
  }

  async function createExpense() {
    // const MY_NAMESPACE =
    if (expense?.title === '') {
      setTitleError(true);
    }
    if (expense?.amount === '') {
      setAmountError(true);
    }
    if (expense?.category_id === undefined || expense?.category_id === 0) {
      setCategoryError(true);
    }
    if (
      expense?.title !== '' &&
      expense?.amount !== '' &&
      expense?.category_id !== undefined &&
      expense?.category_id !== 0
    ) {
      setTitleError(false);
      setAmountError(false);
      setCategoryError(false);
      try {
        setExpense({...expense, id: uuid.v4(), created_at: new Date()});
        await replaceExpenses([...expenses, expense]);
        resetForm();
        navigation.navigate("Expense");
        return 0
      } catch (error) {
        console.log('error when creating expense : ', error);
      }
    }
  }

  // useEffect(() => {
  // }, []);
  return (
    <Container style={{flex: 1}}>
      <Header title={'Add Expense'} />
      <Content>
        <TouchableOpacity
          style={styles.listButton}
          onPress={async () => {
            resetForm();
            navigation.navigate('AddAList');
          }}>
          <Text style={styles.listText}>Create a list</Text>
        </TouchableOpacity>
        <View
          style={{padding: 16, marginTop: 10, justifyContent: 'space-between'}}>
          <View style={styles.inputHeader}>
            <Text style={styles.inputHeader.text}>Title :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary}}
            />
          </View>
          <Text style={styles.labelDescription}>
            {'\t'}
            <Text style={{color: light.brandDanger}}>(</Text>Add the title of
            this expense
            <Text style={{color: light.brandDanger}}>)</Text>
          </Text>
          <Input
            placeholder="title"
            placeholderTextColor={light.placeholder}
            value={expense.title}
            style={styles.input}
            onChangeText={val => {
              setExpense({...expense, title: val});
              val !== '' && setTitleError(false);
            }}
          />
          {titleError && (
            <Text style={styles.error}>This field is required</Text>
          )}

          <View style={styles.inputHeader}>
            <Text style={styles.inputHeader.text}>Amount :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary}}
            />
          </View>
          <Text style={styles.labelDescription}>
            {'\t'}
            <Text style={{color: light.brandDanger}}>(</Text>Add the coast of
            this expense
            <Text style={{color: light.brandDanger}}>)</Text>
          </Text>
          <Input
            placeholder="amount"
            placeholderTextColor={light.placeholder}
            value={expense.amount}
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={val => {
              setExpense({
                ...expense,
                amount: val,
                id: uuid.v4(),
                created_at: "2023-05-25",
                // created_at: new Date(),
              });
              val !== '' && setAmountError(false);
            }}
          />
          {amountError && (
            <Text style={styles.error}>This field is required</Text>
          )}

          <View style={[styles.inputHeader]}>
            <Text style={styles.inputHeader.text}>Category :</Text>
            <MaterialCommunityIcons
              name="asterisk"
              style={{fontSize: 10, color: light.brandPrimary, marginEnd: 20}}
            />
          </View>
          <Text style={styles.labelDescription}>
            {'\t'}
            <Text style={{color: light.brandDanger}}>(</Text>Select or create
            the category in which you want to add this expense
            <Text style={{color: light.brandDanger}}>)</Text>
          </Text>
          {
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select a category"
              style={[
                {
                  color: light.textColor,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: light.whiteGrey,
                },
              ]}
              placeholderIconColor={light.brandPrimary}
              selectedValue={selected}
              onValueChange={val => {
                setSelected(val), setExpense({...expense, category_id: val});
                setCategoryError(false);
                if (val === 0) {
                  navigation.navigate('Add Category');
                }
              }}>
              <Picker.Item
                label="Related category"
                key={-1}
                value={undefined}
                color={light.placeholder}
              />
              {categories.map(item => {
                return <Picker.Item label={item.name} value={item.id} />;
              })}
              <Picker.Item
                label="Create category"
                key={-1}
                value={0}
                color={light.brandPrimary}
              />
            </Picker>
          }
          {categoryError && (
            <Text style={styles.error}>This field is required</Text>
          )}
          <Text style={styles.inputHeader.text}>Description</Text>
          <Text style={styles.labelDescription}>
            {'\t'}
            <Text style={{color: light.brandDanger}}>(</Text>Add more details
            about this expense
            <Text style={{color: light.brandDanger}}>)</Text>
          </Text>
          <Textarea
            placeholder="expense description"
            placeholderTextColor={light.placeholder}
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
              await createExpense();
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
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: light.brandPrimary,
    elevation: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowOffset: {
      height: -5,
      width: 0,
    },
    shadowRadius: 1,
  },
  listButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: light.brandSecond,
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 14,
  },
  error: {
    color: light.brandDanger,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  saveText: {
    color: light.inverseTextColor,
    fontFamily: 'ubuntu-bold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listText: {
    color: light.brandSecond,
    fontFamily: 'ubuntu-bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelText: {
    color: light.inactiveTab,
    fontFamily: 'ubuntu',
    fontSize: 18,
    fontWeight: '700',
  },
  inputHeader: {
    flexDirection: 'row',
    marginTop: 10,
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
  labelDescription: {
    fontSize: 10,
    marginBottom: 10,
    color: light.inactiveTab,
  },
});
const mapStateToProps = state => ({
  expenses: state.expenses.expenses,
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  replaceExpenses: dispatch.expenses.replaceExpenses,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
