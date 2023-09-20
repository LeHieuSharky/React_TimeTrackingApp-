import React from 'react';
import HomeScreen from './src/screens/Home/HomeScreen';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/HomeScreen/stores';
import {PersistGate} from 'redux-persist/integration/react';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
}

[
  {
    '068C121213': {id: '068C121213', members: [1, 2, 3]},
  },
];
