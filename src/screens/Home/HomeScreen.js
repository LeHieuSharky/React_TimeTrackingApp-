import React, {useEffect, useState} from 'react';
import styles from './styles';
import {MOCK_DATA} from '../../mocks/items';
import Card from '../../components/Card/card';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import InputField from '../../components/InputField/inputField';
import TouchableOpacityComponent from '../../components/TouchableOpacity/touchableOpacity';
import jwt_decode from 'jwt-decode';

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [sayHello, setSayHello] = useState('');

  useEffect(preState => {
    setModalVisible(!preState);
  }, []);

  const signIn = async () => {
    try {
      console.log(`UserName: ${userName}`);
      console.log(`Password: ${password}`);
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
            password: password,
          }),
        },
      );
      const json = await response.json();
      const decodeData = jwt_decode(json.data.token);
      if (decodeData !== undefined) {
        setModalVisible(!modalVisible);
      }
      setSayHello(`Hello, ${decodeData.customerName}`);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.parrentColumn}>
        {/* row  include: date, month, year and timePickerButton*/}
        <View style={styles.rowDateTime}>
          <Text style={styles.timeDateMonth}>7 September</Text>
          <Text style={styles.timeYear}>2023</Text>
          <TouchableOpacity onPress={currentStatus => {}}>
            <Text>DropDown</Text>
          </TouchableOpacity>
        </View>

        {/* weekday*/}
        <Text style={styles.weeksDay}>Wednesday</Text>

        {/* say Hello useName */}
        <Text style={styles.sayHello}>{sayHello}</Text>

        {/* List of member card */}
        {sayHello === '' ? null : (
          <FlatList
            style={styles.listCard}
            data={MOCK_DATA}
            renderItem={({item}) => <Card title={item.title} />}
            keyExtractor={item => item.id}
          />
        )}

        {/*  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalPosition}>
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
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
