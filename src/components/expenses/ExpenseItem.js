import moment from 'moment';
import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import light from '../../constants/theme/light';

const db = SQLite.openDatabase('beAware.db', '1.0', '', 1);
export default function ExpenseItem({item, navigation}) {
  const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
  // console.log(('date: ',item.created_at));
  const deleteItem = async () => {
    try {
      db.transaction(function (txn) {
        // txn.executeSql('DROP TABLE IF EXISTS Expenses', []);
        txn.executeSql(`DELETE FROM expenses WHERE id==${item.id}`, []);
        console.log(`item id: ${item.id} was successfully deleted`);
        // txn.executeSql(
        //   'INSERT INTO Expenses (title,amount,description) VALUES (:title,:amount,:description)',
        //   [expense.title, expense.amount, expense.description],
        // );
        // txn.executeSql('SELECT * FROM `Expenses`', [], function (tx, res) {
        //         for (let i = 0; i < res.rows.length; ++i) {
        //           // setTask({...tasks,res.rows,item(i)})
        //           Alert.alert(`item ${i}:`, res.rows.item(i));
        //         //   resul.push(res.rows.item(i));
        //         }
        //       });
      });
      //   navigation.navigate('Expenses');
      ToastAndroid.show(
        `item ${item.id} was successfully deleted`,
        ToastAndroid.LONG,
      );
    } catch (error) {
      //   setReqError(`An error occurred when deleting the expense : ${error.message}`);
      console.log('error occurred when deleting the expense : ', error);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        left: 0,
        // borderWidth: 1,
        flex: 1,
        backgroundColor: light.brandPrimary,
        justifyContent: 'space-between',
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Expense Detail', {item: item}),
            console.log('item pressed');
        }}
        style={{
          backgroundColor: light.whiteGrey,
          height: 60,
          borderRadius: 8,
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 0.85,
          borderTopEndRadius: 30,
          borderBottomRightRadius: 30,
          //   borderWidth: 1,
        }}>
        <View
          style={{
            flex: 0.7,
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: light.textColor,
              fontFamily: 'ubuntu-bold',
              fontSize: 18,
            }}
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={{
              color: item.description === '' ? '#70707052' : light.inactiveTab,
              fontFamily: 'Montserrat-Medium',
            }}
            numberOfLines={1}>
            {item.description === ''
              ? 'Aucune description fournie'
              : item.description}
          </Text>
        </View>
        <View
          style={{flex: 0.3, paddingEnd: 5, justifyContent: 'space-between'}}>
          <Text style={{textAlign: 'right', color: light.textColor}}>
            {[
              // console.log('curent date: ',item.created_at) ,
              moment(item.created_at).format('YYYY-MM-DD') ===
              moment(new Date()).format('YYYY-MM-DD')
                // ? date.toLocaleDateString('en-us')
                ? moment(item.created_at).format('hh:mm a')
                : moment(item.created_at).format('YYYY-MM-DD'),
            ]}
            {/* {moment(item.created_at).calendar()} */}
            {/* {moment(item.created_at).format("HH:MM")} */}
          </Text>
          <Text
            style={{
              color: light.brandPrimary,
              alignSelf: 'flex-end',
              fontFamily: 'ubuntu-bold',
              fontSize: 16,
              overflow: 'hidden',
              // fontWeight:'bold'
            }}
            numberOfLines={1}>
            {item.amount}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: light.brandPrimary,
          //   borderWidth: 1,
        }}>
        <Popover
          // isVisible={true}
          from={
            <TouchableOpacity>
              <Text style={{color: light.inverseTextColor, fontWeight: 'bold'}}>
                more..
              </Text>
            </TouchableOpacity>
          }>
          <View style={{width: 110, height: 150}}>
            <Text
              style={{fontSize: 20, marginVertical: 5, textAlign: 'center'}}>
              Options
            </Text>
            <View
              style={{
                height: 2,
                backgroundColor: light.inactiveTab,
                width: '100%',
              }}
            />
            <View style={{justifyContent: 'space-evenly', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                // onPress={()=> navigation.navigate('Update Expense')}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  style={{fontSize: 20, color: light.whiteGrey}}
                />
                <Text style={{fontSize: 20, color: light.whiteGrey}}>edit</Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                onPress={() => deleteItem()}>
                <MaterialCommunityIcons
                  name="trash-can"
                  style={{fontSize: 20, color: light.brandSecond}}
                />
                <Text style={{fontSize: 20, color: light.brandSecond}}>
                  delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Popover>
        {/* <TouchableOpacity>
          <Text style={{color: light.inverseTextColor, fontWeight: 'bold'}}>
            more..
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
