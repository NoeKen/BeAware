import moment from 'moment';
import {Container, Content} from 'native-base';
import React from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ListItem from '../components/expenses/listItem';
import {expensesListPDF} from '../components/pdf/expensesPDF';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import Spacer from '../ui/Spacer';

const ExpensesList = ({expensesList,navigation}) => {
  return (
    <Container style={styles.Container}>
      <SafeAreaView>
        <Header
          title="Expenses List"
          iconR={'print'}
          onPress={() => expensesListPDF(expensesList[0])}
        />
      </SafeAreaView>
      {expensesList.length < 1 ? 
      <Text style={styles.emptyList} >Your lists will appear here</Text>
        :<FlatList
        style={styles.flatList}
        data={expensesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return <ListItem item={item.item} navigation={navigation} />;
        }}
      />}
    </Container>
  );
};

const mapStateToProps = state => ({
  expensesList: state.expenses.expensesList,
});

export default connect(mapStateToProps)(ExpensesList);

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: light.background,
    },
    flatList:{
        marginVertical:20,
    },
    emptyList:{
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 200,
        color: light.inactiveTab,
    }
})