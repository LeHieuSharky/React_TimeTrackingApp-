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

  // return <HomeScreen />;
}

// listDateTime:
[
  {
    time: 'Thu Sep 14',
    members: [
      '706592db-a07d-4b04-b502-9ed0903fe306',
      'fc00a7a5-fa79-4a4e-8b6a-fbba066baa09',
      '64298da1-9244-47ad-aafb-e5c1bac919fa',
    ],
  },
  {
    time: 'Thu Jan 08',
    members: [
      '8d4c1b4f-8bc4-4445-9118-f1d04ccdd1f8',
      '8a13d669-e5a3-475c-af20-ae3c1392da64',
    ],
  },
];

// members:
[
  {
    leaderId: '9c3d1c74-c9f1-41ee-9db8-b44a9384f708',
    memberId: '706592db-a07d-4b04-b502-9ed0903fe306',
    fullName: '123',
    title: 'Hieu',
  },
  {
    leaderId: 'b2282cc8-b585-4aa6-afd7-58906fd9156f',
    memberId: 'fc00a7a5-fa79-4a4e-8b6a-fbba066baa09',
    fullName: '       Hieu',
    title: 'Intern',
  },
  {
    leaderId: 'b2282cc8-b585-4aa6-afd7-58906fd9156f',
    memberId: '64298da1-9244-47ad-aafb-e5c1bac919fa',
    fullName: 'Le',
    title: 'Intern2',
  },
  {
    leaderId: '6b63b9c2-b038-4e13-8b24-487b998b0497',
    memberId: '8d4c1b4f-8bc4-4445-9118-f1d04ccdd1f8',
    fullName: 'Nguyen',
    title: 'Intern3 ',
  },
  {
    leaderId: '6b63b9c2-b038-4e13-8b24-487b998b0497',
    memberId: '8a13d669-e5a3-475c-af20-ae3c1392da64',
    fullName: 'Nguyen 222',
    title: '5',
  },
];

// logger user:
[
  {id: ''},
  {id: '9c3d1c74-c9f1-41ee-9db8-b44a9384f708'},
  {id: ''},
  {id: '83a2d549-fc3f-4467-b3eb-d5e15beaac8d'},
  {id: '83a2d549-fc3f-4467-b3eb-d5e15beaac8d'},
  {id: '83a2d549-fc3f-4467-b3eb-d5e15beaac8d'},
  {id: ''},
  {id: 'a0b48a41-71f2-432f-b96b-cf8af83d9282'},
  {id: ''},
  {id: ''},
  {id: ''},
  {id: 'cad262b4-1e61-4af7-9897-782b570e0bf5'},
  {id: 'cad262b4-1e61-4af7-9897-782b570e0bf5'},
  {id: 'd2feda1c-9505-4b2f-93b5-d114538a160f'},
  {id: 'd2feda1c-9505-4b2f-93b5-d114538a160f'},
  {id: '87ae4c3e-dccd-4c4f-af2e-3c1602792cbe'},
  {id: '87ae4c3e-dccd-4c4f-af2e-3c1602792cbe'},
  {id: '87ae4c3e-dccd-4c4f-af2e-3c1602792cbe'},
  {id: '62a6867e-d84e-4763-8c44-6683c8097be9'},
  {id: ''},
  {id: 'b2282cc8-b585-4aa6-afd7-58906fd9156f'},
  {id: 'b2282cc8-b585-4aa6-afd7-58906fd9156f'},
  {id: '6b63b9c2-b038-4e13-8b24-487b998b0497'},
];
[
  {
    time: 'Thu Sep 14',
    members: [
      '246f09ca-a5d0-4d2d-8184-043580a7813e',
      '0ae0327d-01ae-4606-80bb-fd613aeb8fa1',
    ],
  },
];
[{time: 'Wed Nov 26', members: ['027e790c-0619-4dba-b6f2-2badff963982']}];

[
  {
    leaderId: '7427c877-1c3e-4e73-833c-3ce81edf51b6',
    memberId: '83c9a688-ebc7-4105-aa13-f46b8253f7c9',
    fullName: '123',
    title: '123',
  },
  {
    leaderId: 'ac6136a7-d6d3-4592-a031-ee8eb2261394',
    memberId: 'd9fc71aa-6ba8-4c42-98aa-4ca63f59552b',
    fullName: '12321`',
    title: '123123',
  },
  {
    leaderId: '0a09f1c8-ac88-4c68-ac91-7a86a81fdf15',
    memberId: 'a96f3b17-32bb-4d5c-b47a-e34cc08ae89c',
    fullName: 'Hieu',
    title: 'Intern',
  },
  {
    leaderId: '6b524876-f1bc-4d54-8b65-ceaccca82620',
    memberId: 'fae6376c-849e-41a3-8f4f-3689394c1a81',
    fullName: '123',
    title: '321',
  },
];
