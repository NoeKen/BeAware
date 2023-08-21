// import { Picker } from '@react-native-community/picker';
import moment from 'moment/moment';
import {Container, Content, Icon, Picker, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {DataTable} from 'react-native-paper';
// import SQLite from 'react-native-sqlite-2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/UI/header';
import light from '../constants/theme/light';
import {connect} from 'react-redux';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';

const Dashboard = ({
  navigation,
  expenses,
  deleteExpense,
  categories,
  replaceSelectedCategory,
}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  // const [expenses, setExpenses] = useState([]);
  const [dashExpenses, setDashExpenses] = useState([]);
  const dimension = useWindowDimensions();
  console.log('categories', dashExpenses);

  const barData = [
    {value: 54, text: '54%'},
    {value: 40, text: '30%'},
    {value: 20, text: '26%'},
  ];

  async function removeItem(id) {
    console.log('id to delete:', id);
    await deleteExpense(id);
    navigation.replace('Dashboard');
    // getExpenses();
  }

  function transformData() {
    var cats = [];
    categories?.map(category => {
      var temp = {id: '', label: '', value: 0};
      expenses?.map(expense => {
        if (expense?.category_id === category.id) {
          var formatNumber = 0
            if (expense.amount >= 1000000) {
              formatNumber = (expense.amount/ 1000000).toFixed(2) + 'M';
            } else if (expense.amount >= 1000) {
              formatNumber = (expense.amount / 1000).toFixed(1) + 'K';
            } else {
              return expense.amount;
            }
          
          console.log('formatNmber:', formatNumber)
          temp.id = category.id;
          temp.label = category.name;
          temp.value +=parseInt(expense.amount);
        }
      });
      cats.push(temp);
    });
    return cats;
  }
  const yAxisLabels = dashExpenses.map(item => `${item.value} (${item.label.length} chars)`);

  useEffect(() => {
    setDashExpenses(transformData());
  }, [expenses]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <Container style={styles.container}>
      <Header title={'Dashboard'} />
      <View
        style={{
          // height: 320,
          width:'100%',
          elevation: 10,
          maxHeight:400,
          // backgroundColor: '#333340',
          // flexDirection: 'column',
          padding: 16,
          overflow: 'scroll',

          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <BarChart
          data={dashExpenses}
          barWidth={20}
          roundedTop
          noOfSections={5}
          barBorderRadius={2}
          isAnimated
          autoShiftLabels
          frontColor={'rgba(3, 96, 112, 1)'}
          yAxisLabelWidth={50}
          yAxisLabels={yAxisLabels}
          disablePress
        />
      </View>
      <Content style={styles.content}>
        <DataTable>
          <DataTable.Header
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: light.whiteGrey,
            }}>
            <DataTable.Title textStyle={styles.tableHeader}>
              Num
            </DataTable.Title>
            <DataTable.Title
              style={{alignSelf: 'center'}}
              textStyle={styles.tableHeader}>
              Title
            </DataTable.Title>
            <DataTable.Title style={{}} textStyle={styles.tableHeader}>
              Amount
            </DataTable.Title>
            <DataTable.Title style={{}} textStyle={styles.tableHeader}>
              Date
            </DataTable.Title>
          </DataTable.Header>
          {expenses?.length < 1 ? (
            <View
              style={{
                justifyContent: 'center',
                height: Dimensions.get('screen').height * 0.5,
              }}>
              <Text style={{color: light.inactiveTab, textAlign: 'center'}}>
                All your expenses will appear in this table
              </Text>
            </View>
          ) : (
            <>
              {expenses?.map((expense, index) => {
                return (
                  <DataTable.Row
                    key={expense.id}
                    onPress={() => {
                      replaceSelectedCategory();
                      navigation.navigate('Expense Detail', {item: expense});
                    }}
                    onLongPress={() =>
                      Alert.alert(
                        'Delete item',
                        'Are you sure you want to delete this item?',
                        [
                          {
                            text: 'No',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'Yes', onPress: () => removeItem(expense.id)},
                        ],
                      )
                    }>
                    <DataTable.Cell
                      style={{
                        backgroundColor: light.whiteGrey,
                        marginLeft: -15,
                        justifyContent: 'center',
                      }}
                      textStyle={styles.tableHeader}
                      numeric>
                      {index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={[styles.messageColumn, {}]}
                      accessibilityHint="press"
                      textStyle={styles.tableValue}>
                      {expense.title}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableValue}>
                      {expense.amount}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.tableValue}>
                      {moment(expense.created_at).calendar('date')}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </>
          )}
        </DataTable>
        <View style={{height: 40}} />
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  expenses: state.expenses.expenses,
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
  deleteExpense: dispatch.expenses.deleteExpense,
  replaceSelectedCategory: dispatch.categories.replaceSelectedCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 12,
  },
  tableHeader: {
    color: light.brandSecond,
    // textShadowColor: light.brandPrimary,
    fontSize: 16,
  },
  tableValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    refreshText: {
      textAlign: 'right',
      color: light.brandPrimary,
      marginVertical: 16,
    },
  },
});
