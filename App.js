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

[
  {
    'Wed Sep 13': [
      {
        userID: '3505f4cc-6508-4244-a5a2-7408e9a25708',
        members: [
          {
            id: '1cfa68e3-65a9-446a-a0ad-d61244c0c6e4',
            fullName: 'Hieu2',
            title: 'Intern2',
          },
        ],
      },
    ],
  },
];
//   {
//     'Wed Sep 13': [
//       {
//         id: '3505f4cc-6508-4244-a5a2-7408e9a25708',
//         members: [
//           {
//             id: '56d2d044-749a-423d-8bf3-4e2d216d7166',
//             fullName: 'Hieu3',
//             title: 'Intern3',
//           },
//         ],
//       },
//     ],
//   },
// [
//   [
//     {
//       id: '764db2d3-0e96-4ffd-a3d2-df03a3f4241e',
//       members: [
//         {
//           id: '0645132a-4282-4f4a-90bd-6646b92dd34a',
//           fullName: '111',
//           title: '222',
//         },
//       ],
//     },
//   ],
// ];
