/* global */
import AsyncStorage from '@react-native-community/async-storage';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import createPersistPlugin, { getPersistor } from '@rematch/persist';
import * as models from '../models';

// Create plugins
const persistPlugin = createPersistPlugin({
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
});
const loadingPlugin = createLoadingPlugin({});
//  AsyncStorage.removeItem('root')
// AsyncStorage.clear()

const configureStore = () => {
  const store = init({
    models,
    redux: {
      middlewares: [],
    },
    plugins: [persistPlugin, loadingPlugin],
  });

  const persistor = getPersistor();
  const { dispatch } = store;

  return { persistor, store, dispatch };
};

export default configureStore;
