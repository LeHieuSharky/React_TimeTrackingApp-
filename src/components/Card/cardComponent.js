import styles from './styles';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateHourOfMember,
  updateMinuteOfMember,
} from '../../redux/HomeScreen/Members/memberSlice';

export default function CardComponent(props) {
  const [hourInput, setHourInput] = useState('--');
  const [minuteInput, setMinuteInput] = useState('--');
  const dispatch = useDispatch();
  const [color, setColor] = useState('#D9D9D9');

  useEffect(() => {
    setHourInput(props.hour);
    setMinuteInput(props.minute);
  }, []);

  useEffect(() => {
    setHourInput(props.hour);
    setMinuteInput(props.minute);
    setColor(props.color);
  }, [props.hour, props.minute, props.color]);

  useEffect(() => {
    const newColor = compareColor();
    setColor(newColor);
  }, [hourInput, minuteInput]);

  const compareColor = () => {
    const timeA = `${hourInput}:${minuteInput}`;
    const listTime = ['08:00', '08:30', '09:00'];
    const currentDate = new Date();

    const dateA = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      parseInt(timeA.split(':')[0], 10),
      parseInt(timeA.split(':')[1], 10),
    );
    const dateB = time =>
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        parseInt(time.split(':')[0], 10),
        parseInt(time.split(':')[1], 10),
      );

    if (dateA < dateB(listTime[0])) {
      return '#56CCF2';
    } else if (dateA < dateB(listTime[1])) {
      return '#6FCF97';
    } else if (dateA < dateB(listTime[2])) {
      return '##F2C94C';
    } else if (dateA >= dateB(listTime[2])) {
      return '#EB5757';
    } else {
      return '#D9D9D9 ';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circleAndName}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: color,
              },
            ]}
          />
          <View style={styles.fullNameAndTitleColumn}>
            <Text style={styles.fullName}>{props.fullName}</Text>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        <View style={styles.timePickerRow}>
          <TextInput
            style={styles.timeInput}
            onChangeText={value => {
              dispatch(
                updateHourOfMember({
                  id: props.id,
                  hour: value,
                }),
              );
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
            onChangeText={value => {
              dispatch(
                updateMinuteOfMember({
                  id: props.id,
                  minute: value,
                }),
              );
              setMinuteInput(value);
            }}
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
