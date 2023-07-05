import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Popover from 'react-native-popover-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../../constants/theme/light';
import DeviceInfo from 'react-native-device-info';

export default function ExpenseItem({
  item,
  categories,
  deleteExpense,
  navigation,
  getExpenses,
}) {

  const device = DeviceInfo.getDeviceType();

  async function removeItem() {
    await deleteExpense(item.id);
    navigation.replace('index');
    getExpenses();
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        left: 0,
        flex: 1,
        height: device === 'Handset' ? 62: 72,
        backgroundColor: light.brandPrimary,
        justifyContent: 'space-between',
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Expense Detail', {
            item: item,
            categories: categories,
          });
        }}
        style={{
          backgroundColor: light.whiteGrey,
          height: device === 'Handset' ? 57: 65,
          borderRadius: 8,
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 0.85,
          borderTopEndRadius: 30,
          borderBottomRightRadius: 30,
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
              fontWeight: 'bold',
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
          <Text
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: light.textColor,
            }}>
            {[
              moment(item.created_at).format('YYYY-MM-DD') ===
              moment(new Date()).format('YYYY-MM-DD')
                ? moment(item.created_at).format('hh:mm:ss a')
                : moment(item.created_at).format('YYYY-MM-DD'),
            ]}
          </Text>
          <Text
            style={{
              color: item.amount>0?light.brandPrimary:light.brandDanger,
              alignSelf: 'flex-end',
              fontFamily: 'ubuntu-bold',
              fontSize: 16,
              overflow: 'hidden',
              fontWeight: 'bold',
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
              style={{
                fontSize: 18,
                marginVertical: 5,
                textAlign: 'center',
                color: light.textColor,
              }}>
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal:12,
                }}
                // onPress={()=> navigation.navigate('Update Expense')}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  style={{fontSize: 15, color: light.placeholder}}
                />
                <Text style={{fontSize: 15, color: light.placeholder}}>
                  update
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal:12
                }}
                onPress={() => removeItem()}>
                <MaterialCommunityIcons
                  name="trash-can"
                  style={{fontSize: 18, color: light.brandDanger}}
                />
                <Text style={{fontSize: 18, color: light.brandDanger}}>
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
