// import {Input, TextArea} from 'native-base';
import moment from 'moment';
import {Container, Content, Icon, Input, Picker, Textarea} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import light from '../constants/theme/light';

// const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);

const AddExpense = ({navigation, replaceExpenses, expenses, categories}) => {
  const [error, setError] = useState('');
  const [reqError, setReqError] = useState('');
  const [selected, setSelected] = useState();
  const [expense, setExpense] = useState({
    id: uuid.v4(),
    title: '',
    description: '',
    amount: 0,
    category_id: '',
    created_at: new Date(),
  });

  function resetForm() {
    // setRest(true);
    setExpense({...expense, title: '', description: '', amount: ''});
    setSelected('related category')
    setError(''), setReqError('');
    // setTitle('');
    // setAmount('');
    // setDescription('');
  }

  async function createExpense() {
    try {
      await replaceExpenses([...expenses,expense]);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error when creating expense : ', error);
    }
  }

  // useEffect(() => {
  // }, []);
  return (
    <Container style={{flex: 1}}>
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
              placeholderIconColor="#007aff"
              selectedValue={selected}
              onValueChange={val => {
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
            </Picker>
          }
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
              await createExpense(), resetForm();
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
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  listButton: {
    backgroundColor: light.inverseTextColor,
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
const mapStateToProps = state => ({
  expenses: state.expenses.expenses,
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  replaceExpenses: dispatch.expenses.replaceExpenses,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
