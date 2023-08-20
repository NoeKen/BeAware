import {Container, Tab, Text, View} from 'native-base';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import ExpenseItem from '../components/expenses/ExpenseItem';
import Header from '../components/UI/header';

const AllExpenses = ({route, navigation}) => {
  const {items, title} = route.params;

  return (
    <>
      <SafeAreaView>
        <Header
          navigation={navigation}
          iLeft={'arrow-back'}
          title={title}
        />
      </SafeAreaView>
      {/* <View style={{}}> */}
      <FlatList
        data={items}
        renderItem={item => [
          <ExpenseItem
            key={item.id}
            item={item.item}
            navigation={navigation}
          />,
        ]}
        style={{ paddingBottom: 16, flex: 1}}
        key={item => item.id}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      {/* </View> */}
      {/* <View style={{height:16}}/> */}
    </>
  );
};

export default AllExpenses;
