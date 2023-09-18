import styles from './styles';
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateHourOfMember,
  updateMinuteOfMember,
} from '../../redux/HomeScreen/Members/memberSlice';

export default function CardComponent(props) {
  const [hourInput, setHourInput] = useState('--');
  const [minuteInput, setMinuteInput] = useState('--');
  const [checkFuture, setCheckFuture] = useState('');
  const minuteInputRef = useRef(null);
  const hourInputRef = useRef(null);
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
    setCheckFuture(props.checkFuture);
  }, [props.hour, props.minute, props.color, props.checkFuture]);

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
      return '#F2C94C';
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
            ref={hourInputRef}
            style={styles.timeInput}
            onChangeText={value => {
              if (value.length === 2) {
                minuteInputRef.current.focus();
              }
              dispatch(
                updateHourOfMember({
                  id: props.id,
                  hour: value,
                }),
              );
              setHourInput(value);
            }}
            value={checkFuture === 'future' ? '--' : hourInput}
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
            ref={minuteInputRef}
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
            value={checkFuture === 'future' ? '--' : minuteInput}
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
