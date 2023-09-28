import React, {useEffect, useState, useRef} from 'react';
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
import {rememberLoggedIn} from '../../redux/HomeScreen/Auth/authSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import database from '@react-native-firebase/database';

import {
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
  const loggedInState = useSelector(state => state.loggedIn);
  const choosedTime = showTime.toString().substring(0, 15);
  const [showMember, setShowMember] = useState([]);
  const [compareToday, setCompareToday] = useState('today');
  const [listAllMemberOfLeader, setListAllMemberOfLeader] = useState([]);
  const [validateFullName, setValidateFullName] = useState(false);
  const [listDateTimeId, setListDateTimeId] = useState([]);
  const [visibilityAddMemberButton, setVisibilityAddMemberButton] =
    useState(false);
  const todayTime = new Date();
  const [signInValidation, setSignInValidation] = useState(false);
  const moment = require('moment');
  var Buffer = require('buffer/').Buffer;
  const dateTimeId = encodeDate(choosedTime);
  const titleRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (loggedInState.isLoggedIn) {
      setUserName(loggedInState.userName);
    }
  }, []);

  useEffect(() => {
    return () => {
      const dateTimeRef = database().ref(`/dateTimes/${dateTimeId}`);
      dateTimeRef.child('members').set(showMember);
    };
  }, []);

  useEffect(() => {
    database()
      .ref('/members')
      .once('value')
      .then(snapshot => {
        try {
          const memberRealtime = Object.values(snapshot.val());
          const memberOfLeader = memberRealtime.filter(
            member => member.leaderId === idUser,
          );
          setListAllMemberOfLeader([...memberOfLeader]);

          database()
            .ref(`/dateTimes/${dateTimeId}`)
            .once('value')
            .then(dateTimeSnapshot => {
              try {
                const dateTimeRealTime = Object.values(
                  dateTimeSnapshot.val().members,
                );
                const listMemberAdded = dateTimeRealTime.filter(
                  member => member.leaderId === idUser,
                );
                setShowMember([...listMemberAdded]);
              } catch (err) {
                const dateTimeRef = database().ref(`/dateTimes/${dateTimeId}`);
                dateTimeRef.child('members').set(memberOfLeader);
                setShowMember([...memberOfLeader]);
                console.log(err);
              }
            });
        } catch (err) {
          console.log(err);
        }
      });

    database()
      .ref('/dateTimes')
      .once('value')
      .then(snapshot => {
        try {
          let listId = [];
          const dateTimeRealTime = Object.values(snapshot.val());
          dateTimeRealTime.forEach(date => {
            listId.push(date.dateTimeId);
          });
          setListDateTimeId([...listId]);
        } catch (err) {
          console.log(err);
        }
      });
    return () => {};
  }, [showSignInModal]);

  console.log('datetimeeeeee: ', JSON.stringify(listDateTimeId));

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

  useEffect(() => {
    if (compareToday === 'future') {
      database()
        .ref('/members')
        .once('value', snapshot => {
          try {
            const memberRealtime = Object.values(snapshot.val());
            const memberOfLeader = memberRealtime.filter(
              member => member.leaderId === idUser,
            );
            setShowMember([...memberOfLeader]);
          } catch (err) {
            console.log(err);
          }
        });
    } else if (compareToday === 'pastday') {
      let pastDayList = [];
      database()
        .ref(`/dateTimes/${dateTimeId}`)
        .once('value')
        .then(dateTimeSnapshot => {
          try {
            const dateTimeRealTime = Object.values(
              dateTimeSnapshot.val().members,
            );
            const dateTimeMember = dateTimeRealTime.filter(
              member => member.leaderId === idUser,
            );
            let pastDayListMember = [];
            database()
              .ref('/members')
              .once('value')
              .then(snapshot => {
                const memberRealtime = Object.values(snapshot.val());
                const memberOfLeader = memberRealtime.filter(
                  member => member.leaderId === idUser,
                );
                memberOfLeader.forEach(memberLeader => {
                  dateTimeMember.forEach(timeMember => {
                    if (memberLeader.memberId === timeMember.memberId) {
                      console.log('111111');
                      pastDayListMember.push({...timeMember});
                    } else {
                      console.log('2222222');
                      pastDayListMember.push({...memberLeader});
                    }
                  });
                });
              });
            console.log('past dat: ', pastDayListMember);
            setShowMember([...pastDayListMember]);
          } catch (err) {
            database()
              .ref('/members')
              .once('value')
              .then(snapshot => {
                const memberRealtime = Object.values(snapshot.val());
                pastDayList = memberRealtime.filter(
                  member => member.leaderId === idUser,
                );
                setShowMember([...pastDayList]);
              });
            console.log(err);
          }
        });
      const dateTimeRef = database().ref(`/dateTimes/${dateTimeId}`);
      dateTimeRef.child('members').set([...pastDayList]);
    } else {
      database()
        .ref(`/dateTimes/${dateTimeId}`)
        .once('value')
        .then(dateTimeSnapshot => {
          try {
            const dateTimeRealTime = Object.values(
              dateTimeSnapshot.val().members,
            );
            const dateTimeMember = dateTimeRealTime.filter(
              member => member.leaderId === idUser,
            );
            setShowMember([...dateTimeMember]);
          } catch (err) {
            console.log(err);
          }
        });
    }
  }, [compareToday]);

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

  function encodeDate(dateString) {
    const encoded = Buffer.from(dateString, 'utf-8').toString('base64');
    return encoded;
  }

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
            username: userName,
            // password: password,
            password: 'vcsc1234',
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

      const dateTimeDataToSend = {
        dateTimeId: dateTimeId,
        time: choosedTime,
      };

      database()
        .ref(`/dateTimes/${dateTimeId}`)
        .once('value')
        .then(snapshot => {
          const dateTimeSnapShot = snapshot.val();
          if (dateTimeSnapShot === null) {
            const ref = database().ref(`/dateTimes/${dateTimeId}`);
            ref.set(dateTimeDataToSend);
          }
        });
      setIdUser(decodeData.accountNo);
      setSayHello(`Hello, ${decodeData.customerName}`);

      dispatch(
        rememberLoggedIn({
          userName: userName,
          isLoggedIn: true,
        }),
      );

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
      minute: '--',
      color: '#D9D9D9',
    };

    setShowMember([...showMember, memberDataToSend]);

    database()
      .ref(`/members/${idNewMember}`)
      .once('value')
      .then(snapshot => {
        const ref = database().ref(`/members/${idNewMember}`);
        ref.set(memberDataToSend);
      });
    const dateTimeRef = database().ref(`/dateTimes/${dateTimeId}`);
    dateTimeRef.transaction(currentData => {
      if (!currentData) {
        currentData = {};
      }

      if (!currentData.members) {
        currentData.members = [];
      }

      if (compareToday === 'today') {
        currentData.members.push(memberDataToSend);
      } else {
        const dateTimeDataToSend = {
          dateTimeId: dateTimeId,
          time: choosedTime,
        };

        let newListMemberOfLeader = [
          ...listAllMemberOfLeader,
          memberDataToSend,
        ];
        dateTimeRef.set(dateTimeDataToSend);
        dateTimeRef.child('members').set(newListMemberOfLeader);
      }

      return currentData;
    });

    const toDay = Date().toString().substring(0, 15);
    const toDayId = encodeDate(toDay);
    const toDayRef = database().ref(`/dateTimes/${toDayId}`);
    console.log('to day idddd: ', toDayId);
    toDayRef.transaction(toDayTrans => {
      if (!toDayTrans) {
        toDayTrans = {};
      }

      if (!toDayTrans.members) {
        toDayTrans.members = [];
      }
      if (compareToday !== 'today') {
        toDayTrans.members.push(memberDataToSend);
      }

      return toDayTrans;
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

  const updateHourMinute = (memberId, value, isHour) => {
    const newShowMember = showMember.map(member => {
      if (member.memberId === memberId) {
        return {
          ...member,
          hour: isHour ? value : member.hour,
          minute: !isHour ? value : member.minute,
        };
      }
      return member;
    });
    const dateTimeRef = database().ref(`/dateTimes/${dateTimeId}`);
    setShowMember(newShowMember);
    dateTimeRef.child('members').set(newShowMember);
    console.log('show membersssss: ', newShowMember);
  };

  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight + 16}}>
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
              data={showMember}
              renderItem={({item}) => (
                <CardComponent
                  fullName={item.fullName}
                  title={item.title}
                  id={item.memberId}
                  hour={item.hour}
                  minute={item.minute}
                  color={'#D9D9D9'}
                  dateTimeId={dateTimeId}
                  leaderId={idUser}
                  checkFuture={compareToday}
                  updateHour={value => {
                    updateHourMinute(item.memberId, value, true);
                  }}
                  updateMinute={value => {
                    updateHourMinute(item.memberId, value, false);
                  }}
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
                  autoFocus
                  selectionColor={'#2D9CDB'}
                  validateColor={validateFullName ? '#EB5757' : null}
                  title={validateFullName ? 'Full name *' : 'Full name'}
                  onChangeText={newText => {
                    setValidateFullName(false);
                    setFullName(newText);
                  }}
                  returnKeyType="next"
                  value={fullName}
                  validateMessage={'Full name is required'}
                  checkFullNameIsNull={validateFullName}
                  onSubmit={() => {
                    titleRef.current.focus();
                  }}
                />
                {/* title */}
                <InputField
                  placeholder={'Enter your member title'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  title={'Title'}
                  inputRef={titleRef}
                  returnKeyType="done"
                  onChangeText={newText => setTitle(newText)}
                  value={title}
                  onSubmit={() => {}}
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
                  placeholder={'Enter your username'}
                  validateColor={signInValidation ? '#EB5757' : null}
                  keyboardType={'default'}
                  autoFocus
                  selectionColor={'#2D9CDB'}
                  title={'Username'}
                  returnKeyType="next"
                  onChangeText={newText => setUserName(newText)}
                  value={userName}
                  validateMessage={'Username or password is not corrent'}
                  checkFullNameIsNull={signInValidation}
                  onSubmit={() => {
                    passwordRef.current.focus();
                  }}
                />

                {/* password */}
                <InputField
                  placeholder={'Enter your password'}
                  keyboardType={'default'}
                  selectionColor={'#2D9CDB'}
                  validateColor={validateFullName ? '#EB5757' : null}
                  title={'Password'}
                  inputRef={passwordRef}
                  returnKeyType="done"
                  onChangeText={newText => setPassword(newText)}
                  value={password}
                  onSubmit={() => {}}
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
    </View>
  );
}

export default HomeScreen;
