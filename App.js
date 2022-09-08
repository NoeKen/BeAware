import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { extendTheme, NativeBaseProvider } from 'native-base';
// import { extendTheme, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LightTheme } from './src/constants/theme/light';

import routes from './src/routes';
// import { initDatabase } from './src/services/db-service';

const App = () => {

  useEffect(function() {
    // async function init(){
    //   await initDatabase();
    // }
    // init();
  }, [])
  const Stack = createNativeStackNavigator();
  
  // const theme = extendTheme({ colors: LightTheme });
  return (
    // <Router>
    <NavigationContainer>
      {/* <NativeBaseProvider theme={theme} > */}
        <Stack.Navigator>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}>
            {routes}
          </Stack.Screen>
        </Stack.Navigator>
      {/* </NativeBaseProvider> */}
    </NavigationContainer>
    // </Router>
  );
};

const styles = StyleSheet.create({});

export default App;
