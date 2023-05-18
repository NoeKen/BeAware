import {Tab, Text, View} from 'native-base';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import ExpenseItem from '../components/expenses/ExpenseItem';
import Header from '../components/UI/header';

const AllExpenses = ({route, navigation}) => {
  const {items} = route.params;
  // const arr =  items.getParams('arr',[])
  // console.log("name: ",JSON.stringify(items[0].amount));
  return (
    <SafeAreaView>
      <Header
        navigation={navigation}
        iLeft={'arrow-back'}
        title={'All expenses'}
      />
      <View style={{marginTop: 20, paddingHorizontal: 16}}>
        <FlatList
          data={items}
          renderItem={item => [
            <ExpenseItem key={item.id} item={item.item} navigation={navigation} />,
          ]}
          key={(item)=>item.id}
          keyExtractor={(item)=>item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllExpenses;
