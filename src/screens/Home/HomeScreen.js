import React, {useEffect, useState} from 'react';
import styles from './styles';
import {MOCK_DATA} from '../../mocks/items';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import Card from '../../components/Card/Card';

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(preState => {
    setModalVisible(!preState);
  }, []);

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
        <Text style={styles.sayHello}>Hello, Lan Chi Team</Text>

        {/* List of member card */}
        <FlatList
          style={styles.listCard}
          data={MOCK_DATA}
          renderItem={({item}) => <Card title={item.title} />}
          keyExtractor={item => item.id}
        />

        {/*  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styless.centeredView}>
            <View style={styless.modalView}>
              {/* Sign in to your account */}
              <View style={styles.titleModal}>
                <Text style={styles.signIn}>Sign in</Text>
                <Text style={styles.toYourAccount}>to your account</Text>
              </View>
              {/* Text input for userName password */}
              <View style={styles.columnInput}>
                <TextInput
                  style={styles.timeInput}
                  onChangeText={() => {}}
                  placeholder="068C121214"
                  keyboardType="default"
                />
                <TextInput
                  style={styles.timeInput}
                  onChangeText={() => {}}
                  placeholder="vcsc1234"
                  keyboardType="default"
                />
              </View>
              <Pressable
                style={[styless.button, styless.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styless.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    paddingHorizontal: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingTop: 50,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;
