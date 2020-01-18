import React from 'react';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/Loading';
import Main from './containers/Main';

export default function App() {

  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
