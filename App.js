import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import light from './src/constants/theme/light';
import ExpenseDetails from './src/containers/Expense details';
import {PersistGate} from 'redux-persist/es/integration/react';

import {Root} from 'native-base';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import AddCategory from './src/containers/addCategory';
import routes from './src/routes';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import AddAList from './src/containers/addAList';
import RNPrintExample from './src/containers/generatePDF';
import expensesList from './src/containers/expensesList';
import PushNotification from 'react-native-push-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import About from './src/containers/about';
import Webview from './src/containers/webView';

const App = () => {
  const {persistor, store} = configureStore();
  useEffect(function () {
    SplashScreen.hide();
    handleCameraPermission();
    createChannel();
  }, []);
  const Stack = createNativeStackNavigator();
  const handleCameraPermission = async () => {
    // !ask && (ask = null)
    await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not rerequestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('permission error: ', error);
      });
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'beAware test channel',
      // channelDescription: 'default',
      // importance: 'high',
    });
  };
  // const theme = extendTheme({ colors: LightTheme });
  return (
    <Root>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar backgroundColor={light.brandPrimary} />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                    // title:false
                    headerTitleStyle: {color: light.brandPrimary},
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                  }}>
                  {routes}
                </Stack.Screen>
                <Stack.Screen
                  name="Expense Detail"
                  component={ExpenseDetails}
                  options={{
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Add Category"
                  component={AddCategory}
                  options={{
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="About"
                  component={About}
                  options={{
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                    headerShown: false,
                    presentation: 'fullScreenModal',
                  }}
                />
                <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
                  <Stack.Screen
                    name="AddAList"
                    component={AddAList}
                    options={{
                      headerShown: false,
                      title: 'Add AList',
                      headerTitleStyle: {color: light.brandPrimary},
                      headerBackTitle: 'back',
                      headerBackTitleStyle: {color: light.brandPrimary},
                      statusBarColor: light.brandPrimary,
                      // statusBarStyle: 'dark',
                      // mode: 'modal',
                      presentation: 'fullScreenModal',
                      // navigationBarColor:light.brandPrimary
                    }}
                  />
                </Stack.Group>
                <Stack.Screen
                  name="Generate PDF"
                  component={RNPrintExample}
                  options={{
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Webview"
                  component={Webview}
                  options={{
                    statusBarColor: light.brandPrimary,
                    orientation: 'portrait',
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </Root>
  );
};

const styles = StyleSheet.create({});

export default App;
