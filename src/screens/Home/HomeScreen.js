import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import InputField from '../../components/InputField/inputField';
import TouchableOpacityComponent from '../../components/TouchableOpacity/touchableOpacity';
import jwt_decode from 'jwt-decode';
import DatePicker from 'react-native-date-picker';
import {useKeyboard} from '../../services/heightKeyboard';
import CardComponent from '../../components/Card/cardComponent';
import {useDispatch, useSelector} from 'react-redux';
import {addMember} from '../../redux/HomeScreen/Members/memberSlice';
import {addLeader} from '../../redux/HomeScreen/Auth/authSlice';
import {addNewDateTime} from '../../redux/HomeScreen/DateTime/dateTimeSlice';
import {updateMemberOfLeader} from '../../redux/HomeScreen/Auth/authSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

function HomeScreen() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [sayHello, setSayHello] = useState('');
  const [showTime, setShowTime] = useState(new Date());
  const [showDateTimePicker, setDateTimePicker] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [showAddMemnberModal, setShowAddMemberModal] = useState(false);
  const keyboardHeight = useKeyboard();
  const dispatch = useDispatch();
  const members = useSelector(state => state.members);
  const leaders = useSelector(state => state.leaders);
  const listDateTime = useSelector(state => state.listDateTime);
  const choosedTime = showTime.toString().substring(0, 10);
  const [showMember, setShowMember] = useState([]);
  const [compareToday, setCompareToday] = useState('today');
  const [validateFullName, setValidateFullName] = useState(false);
  const [visibilityAddMemberButton, setVisibilityAddMemberButton] =
    useState(false);
  const [randomeState, setRandomState] = useState(false);
  const todayTime = new Date();
  const moment = require('moment');

  useEffect(() => {
    const membersListener = database()
      .ref('/members/')
      .on('value', snapshot => {
        console.log(`Members firebase: ${JSON.stringify(snapshot.val())}`);
      });

    const leadersListener = database()
      .ref('/leaders/')
      .on('value', snapshot => {
        console.log(`leaders firebase: ${JSON.stringify(snapshot.val())}`);
      });

    const dateTimesListener = database()
      .ref('/dateTimes/')
      .on('value', snapshot => {
        console.log(`dateTimes firebase: ${JSON.stringify(snapshot.val())}`);
      });
    return () => {
      database().ref('/members/').off('value', membersListener);
      database().ref('/leaders/').off('value', leadersListener);
      database().ref('/dateTimes/').off('value', dateTimesListener);
    };
  }, [showMember]);

  useEffect(preState => {
    setShowSignInModal(!preState);
  }, []);

  const convertDate = date => {
    const originalDate = new Date(date);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // useEffect(() => {
  //   if (compareToday === 'future') {
  //     setRandomState(!randomeState);
  //     let showListMember = [];

  //     const leader = leaders.find(item => item.id === idUser);

  //     if (leader !== undefined) {
  //       let memberArray = [...leader.members];

  //       memberArray.forEach(memberID => {
  //         members.forEach(member => {
  //           if (member.memberId === memberID && member.leaderId === idUser) {
  //             const newMember = {...member};
  //             newMember.hour = '--';
  //             newMember.minute = '--';
  //             showListMember.push(newMember);
  //           }
  //         });
  //       });
  //       setShowMember(showListMember);
  //     }
  //   } else if (compareToday === 'pastday') {
  //     setShowMember([]);
  //     const choosedTimeData = listDateTime.filter(
  //       time => time.time === choosedTime,
  //     );
  //     let memberArray = [];
  //     if (choosedTimeData.length > 0) {
  //       memberArray = choosedTimeData[0].members;
  //     }
  //     let showListMember = [];
  //     memberArray.forEach(memberID => {
  //       members.forEach(member => {
  //         if (member.memberId === memberID && member.leaderId === idUser) {
  //           showListMember.push(member);
  //         }
  //       });
  //     });
  //     setShowMember([showListMember]);
  //   } else {
  //     let showListMember = [];
  //     const leader = leaders.find(item => item.id === idUser);
  //     if (leader !== undefined) {
  //       let memberArray = [...leader.members];
  //       memberArray.forEach(memberID => {
  //         members.forEach(member => {
  //           if (member.memberId === memberID && member.leaderId === idUser) {
  //             showListMember.push(member);
  //           }
  //         });
  //       });
  //       setShowMember(showListMember);
  //     }
  //   }
  // }, [compareToday]);

  // useEffect(() => {
  //   let showListMember = [];
  //   const leader = leaders.find(item => item.id === idUser);
  //   if (leader !== undefined) {
  //     let memberArray = [...leader.members];
  //     memberArray.forEach(memberID => {
  //       members.forEach(member => {
  //         if (member.memberId === memberID && member.leaderId === idUser) {
  //           showListMember.push(member);
  //         }
  //       });
  //     });
  //     setShowMember(showListMember);
  //   }
  // }, [showSignInModal]);

  useEffect(() => {
    const today = convertDate(todayTime);
    const newTime = convertDate(showTime);
    if (today === newTime) {
      setVisibilityAddMemberButton(false);
      setCompareToday('today');
    } else if (moment(today).isAfter(newTime)) {
      setCompareToday('pastday');
      setVisibilityAddMemberButton(true);
    } else {
      setCompareToday('future');
      setVisibilityAddMemberButton(false);
    }
  }, [showTime]);

  const signIn = async () => {
    try {
      const response = await fetch(
        'https://mt-qc.vietcap.com.vn/api/iam-external-service/v1/authentication/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'grant-type': 'password',
            'client-id': '8202ca6a-6d69-44c9-ad17-cb5596b92015',
            'client-secret': 'FJ2jHe8exf8zyRm',
          },
          body: JSON.stringify({
            username: '068C121214',
            password: 'vcsc1234',
            // username: userName,
            // password: password,
          }),
        },
      );
      const json = await response.json();
      const decodeData = jwt_decode(json.data.token);
      const leaderId = decodeData.accountNo;

      const leaderDataToSend = {
        id: leaderId,
      };

      database()
        .ref(`/leaders/${leaderId}`)
        .once('value')
        .then(snapshot => {
          const leaderSnapShot = snapshot.val();
          if (leaderSnapShot === null) {
            const ref = database().ref(`/leaders/${leaderId}`);
            ref.set(leaderDataToSend);
          }
        });
      const dateTimeId = uuidv4();

      const dateTimeDataToSend = {
        dateTimeId: dateTimeId,
        time: choosedTime,
      };

      database()
        .ref(`/dateTimes/${choosedTime}`)
        .once('value')
        .then(snapshot => {
          const dateTimeSnapShot = snapshot.val();
          if (dateTimeSnapShot === null) {
            const ref = database().ref(`/dateTimes/${choosedTime}`);
            ref.set(dateTimeDataToSend);
          }
        });
      setIdUser(decodeData.accountNo);
      setSayHello(`Hello, ${decodeData.customerName}`);

      setShowSignInModal(!showSignInModal);
    } catch (error) {
      console.error(error);
    }
  };

  const formatMonth = month => {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  };

  const formatDay = day => {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[day];
  };

  const marginOfModal = () =>
    keyboardHeight === 0
      ? Dimensions.get('window').height / 3.5
      : Dimensions.get('window').height / 1.7 - keyboardHeight;

  const addMemberToList = () => {
    const idNewMember = uuidv4();

    const memberDataToSend = {
      leaderId: idUser,
      memberId: idNewMember,
      fullName: fullName,
      title: title,
      hour: '--',
      minite: '--',
      color: '#D9D9D9',
    };
    database()
      .ref(`/members/${idNewMember}`)
      .once('value')
      .then(snapshot => {
        const ref = database().ref(`/members/${idNewMember}`);
        ref.set(memberDataToSend);
      });

    const dateTimeRef = database().ref(`/dateTimes/${choosedTime}`);
    // dateTimeRef.child('members').push(memberDataToSend);
    dateTimeRef.transaction(currentData => {
      if (!currentData) {
        currentData = {};
      }

      if (!currentData.members) {
        currentData.members = [];
      }
      currentData.members.push(memberDataToSend);

      return currentData;
    });

    const leaderRealTime = database().ref(`/leaders/${idUser}`);
    leaderRealTime.child('members').push(idNewMember);

    setShowAddMemberModal(false);
  };

  const saveMember = () => {
    if (fullName === '') {
      setValidateFullName(true);
    } else {
      setValidateFullName(false);
      addMemberToList();
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />

      <View style={styles.parrentColumn}>
        <TouchableOpacity
          onPress={() => {
            setDateTimePicker(true);
          }}>
          {/* row  include: date, month, year and timePickerButton*/}
          <View style={styles.rowDateTime}>
            <Text
              style={
                styles.timeDateMonth
              }>{`${showTime.getDate()} ${formatMonth(
              showTime.getMonth(),
            )}`}</Text>
            <Text style={styles.timeYear}>{showTime.getFullYear()}</Text>
            <Image source={require('../../assets/images/dropDown.png')} />
          </View>

          {/* weekday*/}
          <Text style={styles.weeksDay}>{formatDay(showTime.getDay())}</Text>
        </TouchableOpacity>

        {/* say Hello useName */}
        <Text style={styles.sayHello}>{sayHello}</Text>

        {/* List of member card */}
        {sayHello === '' ? null : (
          <KeyboardAwareScrollView>
            <FlatList
              style={[styles.listCard]}
              data={compareToday === 'pastday' ? showMember[0] : showMember}
              renderItem={({item}) => (
                <CardComponent
                  fullName={item.fullName}
                  title={item.title}
                  id={item.memberId}
                  hour={item.hour}
                  minute={item.minute}
                  color={'#D9D9D9'}
                  checkFuture={compareToday}
                />
              )}
              keyExtractor={item => item.id}
            />
          </KeyboardAwareScrollView>
        )}

        {/* Date time picker */}
        <DatePicker
          modal
          open={showDateTimePicker}
          date={showTime}
          mode="date"
          onConfirm={date => {
            setShowTime(date);

            setDateTimePicker(false);
          }}
          onCancel={() => {
            setDateTimePicker(false);
          }}
        />

        {/* add new member Modal */}

        <ReactNativeModal
          animationType="slide"
          transparent={true}
          style={{marginHorizontal: 40}}
          onBackdropPress={() => {
            setShowAddMemberModal(false);
          }}
          visible={showAddMemnberModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowSignInModal(!showAddMemnberModal);
          }}>
          <View
            style={
              (styles.modalPositionAddMember,
              {
                marginBottom: keyboardHeight === 0 ? 0 : 200,
              })
            }>
            <View style={styles.modalView}>
              {/* add new member */}
              <View style={styles.titleModal}>
                <Text style={styles.signIn}>Add a member</Text>
                <Text style={styles.toYourAccount}>to your team</Text>
              </View>
              {/* Text input for fullName and Title*/}
              <View style={styles.columnInput}>
                {/* fullName */}
                <InputField
                  placeholder={'Enter your member name'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  validateColor={validateFullName ? '#EB5757' : null}
                  title={validateFullName ? 'Full name *' : 'Full name'}
                  onChangeText={newText => {
                    setValidateFullName(false);
                    setFullName(newText);
                  }}
                  value={fullName}
                  validateMessage={'Full name is required'}
                  checkFullNameIsNull={validateFullName}
                />
                {/* title */}
                <InputField
                  placeholder={'Enter your member title'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  title={'Title'}
                  onChangeText={newText => setTitle(newText)}
                  value={title}
                />
              </View>
              {/* save button */}
              <View style={styles.buttonModal}>
                <TouchableOpacityComponent
                  content={'Save'}
                  onPress={() => {
                    setFullName('');
                    setPassword('');
                    saveMember();
                  }}
                />
              </View>
            </View>
          </View>
        </ReactNativeModal>

        {/* floating button */}
        {sayHello === '' || visibilityAddMemberButton ? null : (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowAddMemberModal(true)}>
            <Image source={require('../../assets/images/plus.png')} />
          </TouchableOpacity>
        )}
      </View>

      {/* Sign in Modal */}
      <View style={{backgroundColor: '#BDBDBD', height: '100%'}}>
        <ReactNativeModal
          animationType="slide"
          transparent={true}
          visible={showSignInModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowSignInModal(!showSignInModal);
          }}>
          <View
            style={[
              styles.modalPosition,
              {
                marginTop: marginOfModal(),
              },
            ]}>
            <View style={styles.modalView}>
              {/* Sign in to your account */}
              <View style={styles.titleModal}>
                <Text style={styles.signIn}>Sign in</Text>
                <Text style={styles.toYourAccount}>to your account</Text>
              </View>
              {/* Text input for userName password */}
              <View style={styles.columnInput}>
                {/* useName */}
                <InputField
                  placeholder={'068C121214'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  title={'Username'}
                  onChangeText={newText => setUserName(newText)}
                  value={userName}
                />
                {/* password */}
                <InputField
                  placeholder={'vcsc1234'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  title={'Password'}
                  onChangeText={newText => setPassword(newText)}
                  value={password}
                />
              </View>
              {/* Sign in button */}
              <View style={styles.buttonModal}>
                <TouchableOpacityComponent
                  content={'Sign in'}
                  onPress={() => {
                    signIn();
                  }}
                />
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
