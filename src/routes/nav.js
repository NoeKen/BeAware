import {createNativeStackNavigator} from '@react-navigation/native-stack';
import light from '../constants/theme/light';
import AddAList from '../containers/addAList';
import AddExpense from '../containers/AddExpense';
import AllExpenses from '../containers/allExpenses';
import Dashboard from '../containers/Dashboard';
import Expenses from '../containers/Expenses';
import expensesList from '../containers/expensesList';
import Home from '../containers/Home';
import ListDetails from '../containers/ListDetails';

const Stack = createNativeStackNavigator();
export function ExpensesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        // headerSearchBarOptions:{tintColor:'red'},
        headerTitleStyle: {color: light.brandSecond},
        headerBackVisible: true,
        headerBackTitle:'back',
        statusBarColor:light.brandPrimary
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="All Expenses" component={AllExpenses} />
    </Stack.Navigator>
  );
}

export function DashboardNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        headerTitleStyle: {color: light.brandSecond},
        headerBackVisible: false,
        statusBarColor:light.brandPrimary
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export function ListNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        headerTitleStyle: {color: light.brandSecond},
        headerBackVisible: false,
        statusBarColor:light.brandPrimary
      }}>
      <Stack.Screen name="Expenses list" component={expensesList} />
      <Stack.Screen name="ListDetails" component={ListDetails} options={{
        presentation: 'modal',

      }} />
    </Stack.Navigator>
  );
}
export function AddNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        headerTitleStyle: {color: light.brandSecond},
        animation:'slide_from_bottom',
        headerBackVisible: true,
        statusBarColor:light.brandPrimary,
      }}>
      <Stack.Screen name="AddExpense" component={AddExpense} options={{
        title: 'Add Expense',
        headerTitleStyle: {color: light.brandSecond},
        headerBackTitle:'back',
        headerBackTitleStyle: {color: light.brandPrimary},
      }} />
      {/* <Stack.Screen name="AddAList" component={AddAList} options={{
        title: 'Add AList',
        headerTitleStyle: {color: light.brandPrimary},
        headerBackTitle:'back',
        headerBackTitleStyle: {color: light.brandPrimary},
        // navigationBarColor:light.brandPrimary
      }}  /> */}
    </Stack.Navigator>
  );
}
