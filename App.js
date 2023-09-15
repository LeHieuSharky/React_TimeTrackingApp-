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
  [
    {
      leaderId: '068C121214',
      memberId: 'd41a7c17-be59-4247-8d6e-538fef020101',
      fullName: '123',
      title: '321',
    },
    {
      leaderId: '068C121214',
      memberId: '6bf2786f-f641-493d-94cd-f8aad66959c6',
      fullName: '12321',
      title: '321',
    },
    {
      leaderId: '068C121214',
      memberId: '2c70b4b8-ef0d-4517-ab92-07734ec83340',
      fullName: '23',
      title: '312',
    },
  ],
];
