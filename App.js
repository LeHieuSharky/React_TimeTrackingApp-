import React from 'react';
import HomeScreen from './src/screens/Home/HomeScreen';
import {Provider} from 'react-redux';
import store from './src/redux/HomeScreen/stores';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );

  // return <HomeScreen />;
}
