import {createNativeStackNavigator} from '@react-navigation/native-stack';
import light from '../constants/theme/light';
import AllExpenses from '../containers/allExpenses';
import Dashboard from '../containers/Dashboard';
import Expenses from '../containers/Expenses';
import Home from '../containers/Home';

const Stack = createNativeStackNavigator();
export function ExpensesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        headerTitleStyle: {color: light.brandPrimary},
        headerBackVisible: true,
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
        headerTitleStyle: {color: light.brandPrimary},
        headerBackVisible: false,
        statusBarColor:light.brandPrimary
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
