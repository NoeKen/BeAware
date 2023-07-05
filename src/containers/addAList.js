import {Container, Content, Icon} from 'native-base';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import Spacer from '../ui/Spacer';

const AddAList = ({expensesList, replaceExpensesList, navigation}) => {
  const [items, setItems] = useState({
    title: '',
    created_at: new Date(),
    total_price: 0,
    list: [],
  });
  const [Item, setItem] = useState({
    id: '',
    name: '',
    price: 0,
  });
  const [shouldScroll, setShouldScroll] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editable, setEditable] = useState(false);

  return (
    <Container style={{flex: 1}}>
      <Header
        navigation={navigation}
        iLeft={'arrow-back'}
        title="Add A List"
        iconR={'save'}
        CStyles={{
          color:
            items.title == '' || items.list.length == 0
              ? light.inactiveTab
              : light.brandPrimary,
        }}
        onPress={() => {
          if (items.title == '' && items.list.length == 0) {
            setError(true);
            setErrorMessage('Please fill the title and add items to the list');
          } else if (items.title == '' && items.list.length > 0) {
            setError(true);
            setErrorMessage('Please fill the list title');
          } else if (items.title !== '' && items.list.length === 0) {
            setError(true);
            setErrorMessage('Please add items to the list');
          } else {
            replaceExpensesList([...expensesList, items]);
            setItems({...items, title: '', list: [], total_price: 0});
            navigation.navigate('List');
          }
          // navigation.navigate('List')
        }}
      />

      <ScrollView scrollEnabled={shouldScroll}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 5,
            paddingVertical: 14,
          }}>
          <Text
            style={{color: light.textColor, fontWeight: '600', fontSize: 20}}>
            Amount
          </Text>
          <Text
            style={{color: light.brandSecond, fontWeight: '600', fontSize: 20}}>
            {items.total_price} XCFA
          </Text>
        </View>
        <View
          style={{
            height: useWindowDimensions().height * 0.64,
            backgroundColor: light.brandLight,
            borderRadius: 25,
            elevation: 10,
            margin: 16,
            // padding: 20,
          }}>
          <TextInput
            style={{
              borderBottomColor: light.brandSecond,
              color: light.inactiveTab,
              fontSize: 20,
              borderBottomWidth: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              marginHorizontal: 20,
            }}
            value={items.title}
            placeholder="Title list"
            placeholderTextColor={light.inactiveTab}
            onChangeText={text => setItems({...items, title: text})}
          />
          <View
            style={{}}>
            {/* <TouchableOpacity
              style={{
                position: 'absolute',
                end: 20,
                top: 10,
                backgroundColor: light.placeholder,
                borderRadius: 20,
                padding: 5,
              }}
              onPress={() => {
                setEditable(!editable);
              }}>
              <Icon
                name={editable ? 'create' : 'create-outline'}
                type="Ionicons"
                style={{color: light.inactiveTab, fontSize: 20}}
              />
            </TouchableOpacity> */}

            <FlatList
              data={items.list}
              keyExtractor={(item)=>item.id}
              renderItem={(elt,index) => {
                return (
                  <View
                    // key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: light.placeholder,
                      // marginBottom: 5,
                      paddingVertical: 5,
                      overflow: 'scroll',
                      marginHorizontal: 20,
                      // backgroundColor: 'red',
                    }}>
                    <Text
                      style={{
                        color: light.inactiveTab,
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                      // editable={editable}
                      // value={'notre'}
                      // value=
                    // >jlwf</Text>
                    >{elt.name}</Text>

                    <Text
                      style={{
                        color: light.brandSecond,
                        fontSize: 16,
                        fontWeight: '600',
                      }}
                      // editable={editable}
                      // value={elt.price}
                    >{elt.price}</Text>
                  </View>
                );
              }}
            />
            <Spacer />
          </View>
        </View>
        <Spacer />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 70,

            marginHorizontal: 16,
            alignItems: 'center',
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: 25,
              flex: 0.88,
              overflow: 'hidden',
              height: 50,
              shadowOffset: {
                width: 0,
                height: -100,
              },
              elevation: 5,
            }}>
            <TextInput
              placeholder="Name"
              value={Item.name}
              placeholderTextColor={light.inactiveTab}
              style={{
                bottom: 0,
                flex: 0.77,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRightWidth: 4,
                borderRightColor: light.placeholder,
                color: light.textColor,
              }}
              onKeyPress={e => setShouldScroll(!shouldScroll)}
              onChangeText={val => {
                setItem({...Item, name: val});
              }}
            />
            <TextInput
              placeholder="Price"
              value={Item.price}
              keyboardType="numeric"
              placeholderTextColor={light.inactiveTab}
              style={{
                bottom: 0,
                flex: 0.23,
                color: light.textColor,
                backgroundColor: 'white',
              }}
              onKeyPress={e => setShouldScroll(!shouldScroll)}
              // onTextInput={() => console.warn('input price pressed')}
              onChangeText={val => {
                setItem({...Item, price: val});
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 0.12,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (Item.name !== '' && Item.price !== '') {
                setItems({
                  ...items,
                  total_price: items.total_price + parseInt(Item.price),
                  list: [...items.list, Item],
                });
                // setTotalPrice(totalPrice + parseInt(Item.price));
                setError(false);
                setItem({...Item, price: '', name: ''});
              } else {
                setError(true);
                setErrorMessage('Please fill all fields in the input');
              }
            }}>
            <Icon
              name="send"
              style={{
                color: light.brandPrimary,
                elevation: 10,
                shadowColor: 'black',
                fontSize: 30,
              }}
            />
          </TouchableOpacity>
        </View>
        {error ? (
          <Text
            style={{
              color: light.brandDanger,
              fontSize: 15,
              textAlign: 'center',
              marginTop: -10,
            }}>
            {errorMessage}
          </Text>
        ) : null}
        {/* </Content> */}
      </ScrollView>
    </Container>
  );
};
const mapStateToProps = state => ({
  expensesList: state.expenses.expensesList,
});
const mapDispatchToProps = dispatch => ({
  replaceExpensesList: dispatch.expenses.replaceExpensesList,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddAList);
