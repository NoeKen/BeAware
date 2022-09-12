import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { extendTheme, NativeBaseProvider } from 'native-base';
// import { extendTheme, NativeBaseProvider } from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import light, {LightTheme} from './src/constants/theme/light';
import ExpenseDetails from './src/containers/Expense details';

import routes from './src/routes';
// import { initDatabase } from './src/services/db-service';

const App = () => {
  useEffect(function () {
    // async function init(){
    //   await initDatabase();
    // }
    // init();
  }, []);
  const Stack = createNativeStackNavigator();

  // const theme = extendTheme({ colors: LightTheme });
  return (
    // <Router>
    // <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {/* <NativeBaseProvider theme={theme} > */}
        <Stack.Navigator>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              // title:false
              headerTitleStyle:{color:light.brandPrimary},
              statusBarColor:light.brandPrimary,
              orientation:'portrait'
            }}
            
            >
            {routes}
          </Stack.Screen>
          <Stack.Screen name="Expense Detail" component={ExpenseDetails} options={{headerTintColor:light.brandPrimary}} />
        </Stack.Navigator>
        {/* </NativeBaseProvider> */}
      </NavigationContainer>
    // </GestureHandlerRootView>
    // </Router>
  );
};

const styles = StyleSheet.create({});

export default App;
