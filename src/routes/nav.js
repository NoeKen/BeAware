import {createNativeStackNavigator} from '@react-navigation/native-stack';
import light from '../constants/theme/light';
import AllExpenses from '../containers/allExpenses';
import Expenses from '../containers/Expenses';

const Stack = createNativeStackNavigator();
export function ExpensesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown:false,
        headerTitleStyle: {color: light.brandPrimary},
        headerBackVisible: false,
        // statusBarColor:light.brandPrimary
      }}>
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="All Expenses" component={AllExpenses} />
    </Stack.Navigator>
  );
}
