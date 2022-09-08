import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import light from '../constants/theme/light';
import AddExpense from '../containers/AddExpense';
import Dashboard from '../containers/Dashboard';
import Expenses from '../containers/Expenses';
import Home from '../containers/Home';

const Tab = createBottomTabNavigator();

export default function routes() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: light.brandPrimary,
      }}
    >
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
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
        component={Dashboard}
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