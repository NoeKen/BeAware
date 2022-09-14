import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../constants/theme/light';
import AddExpense from '../containers/AddExpense';
import Dashboard from '../containers/Dashboard';
import { DashboardNav, ExpensesNav } from './nav';

const Tab = createBottomTabNavigator();

export default function routes() {
  return (
    <Tab.Navigator
      initialRouteName="Expenses"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: light.brandPrimary,
        tabBarHideOnKeyboard:true
      }}
    >
      <Tab.Screen
        name="Expense"
        component={ExpensesNav}
        options={{
          headerShown:false,
          headerTitleStyle:{color:light.brandPrimary},
          tabBarLabel: 'Expenses',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          tabBarLabel: 'AddExpense',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardNav}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      />
      
    </Tab.Navigator>
  );
}