import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';
import settings from './settings';
import thunk from 'redux-thunk';

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
      settings
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;