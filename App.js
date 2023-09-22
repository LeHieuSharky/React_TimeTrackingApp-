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
  'Wed Sep 20',
  [
    {
      color: '#D9D9D9',
      fullName: 'Hieu ne',
      hour: '--',
      leaderId: '068C121214',
      memberId: 'ae22fda9-e294-4688-971e-1d90c7cb5066',
      minute: '--',
      title: 'Intern',
    },
    {
      color: '#D9D9D9',
      fullName: 'Le ne',
      hour: '--',
      leaderId: '068C121214',
      memberId: '1d00b879-519e-4779-903c-59ce3555ac97',
      minute: '--',
      title: 'Intern',
    },
    {
      color: '#D9D9D9',
      fullName: 'Le nam',
      hour: '--',
      leaderId: '068C121213',
      memberId: '97da2dbb-c476-4d92-88de-e00db90e1777',
      minute: '--',
      title: 'Intern',
    },
  ],
  'V2VkIFNlcCAyMA==',
];
