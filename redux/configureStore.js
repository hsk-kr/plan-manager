import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import settings from './settings';
import plans from './plans';

/**
 * Create persistor and store then returns
 * @returns {object} { persistor, store }
 */
const configureStore = () => {
  const config = {
    key: 'root',
    storage: AsyncStorage
  };

  const store = createStore(
    persistCombineReducers(config, {
      settings,
      plans
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;