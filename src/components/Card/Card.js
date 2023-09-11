import styles from './styles';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
function Card(params) {
  const [hourInput, setHourInput] = useState('--');
  const [minuteInput, setMinuteInput] = useState('--');

  const compareTime = () => {
    const timeA = `${hourInput}:${minuteInput}`;
    const timeB = '08:30';

    const dateA = new Date(`2023-01-01T${timeA}:00`);
    const dateB = new Date(`2023-01-01T${timeB}:00`);

    if (dateA < dateB) {
      return '#56CCF2';
    } else if (dateA > dateB) {
      return '#F2C94C';
    } else {
      return '#D9D9D9';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circleAndName}>
          <View style={[styles.circle, {backgroundColor: compareTime()}]} />
          <View style={styles.fullNameAndTitleColumn}>
            <Text style={styles.fullName}>{params.fullName}</Text>
            <Text style={styles.title}>{params.title}</Text>
          </View>
        </View>
        <View style={styles.timePickerRow}>
          <TextInput
            style={styles.timeInput}
            onChangeText={value => {
              setHourInput(value);
            }}
            value={hourInput}
            maxLength={2}
            keyboardType="numeric"
            onFocus={() => {
              if (hourInput === '--') {
                setHourInput('');
              }
            }}
            onBlur={() => {
              if (hourInput === '') {
                setHourInput('--');
              }
            }}
          />
          <Text style={styles.timeInput}>:</Text>
          <TextInput
            style={styles.timeInput}
            onChangeText={value => setMinuteInput(value)}
            value={minuteInput}
            keyboardType="numeric"
            maxLength={2}
            onFocus={() => {
              if (minuteInput === '--') {
                setMinuteInput('');
              }
            }}
            onBlur={() => {
              if (minuteInput === '') {
                setMinuteInput('--');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Card;
