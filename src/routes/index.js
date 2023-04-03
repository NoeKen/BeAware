import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../constants/theme/light';
import AddExpense from '../containers/AddExpense';
import expensesList from '../containers/expensesList';
import Settings from '../containers/Settings';
import {AddNav, DashboardNav, ExpensesNav, ListNav} from './nav';

const Tab = createBottomTabNavigator();

export default function routes() {
  return (
    <Tab.Navigator
      initialRouteName="Expense"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: light.brandPrimary,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        // tabBarActiveBackgroundColor:'red'
        // tabBarStyle: {
        //   borderTopWidth: 0,
        //   elevation: 0,
        //   shadowColor: 'transparent',
        //   backgroundColor:'transparent',
        //   backfaceVisibility: 'hidden',

        // },
        // tabBarAccessibilityLabel:'home',
        // tabBarItemStyle: {
        //   elevation: 5,
        //   backgroundColor: 'white',
        //   borderRadius: 15,
        //   width: 50,
        //   marginHorizontal: 15,
        //   marginBottom: 20,
        // },
      }}>
      <Tab.Screen
        name="Expense"
        component={ExpensesNav}
        options={{
          headerShown: false,
          headerTitleStyle: {color: light.brandPrimary},
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-type"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={AddNav}
        options={{
          tabBarLabel: 'AddExpenseNav',
          headerShown: false,
          headerTitleStyle: {color: light.brandPrimary},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DashboardNav"
        component={DashboardNav}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
          // tabBarBadge: 3,
        }}
      />

      <Tab.Screen
        name="List"
        component={ListNav}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color, size}) => (
            // <MaterialCommunityIcons name="settings" color={color} size={size} />
            <Icon name="list" style={{color: color, fontSize: size}} />
          ),
          // tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}
