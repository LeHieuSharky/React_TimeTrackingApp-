import styles from './styles';
import React from 'react';
import {Text, TextInput, View} from 'react-native';
function Card(params) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circleAndName}>
          <View style={styles.circle} />
          <View style={styles.fullNameAndTitleColumn}>
            <Text style={styles.fullName}>{params.title}</Text>
            <Text style={styles.title}>Product Owner</Text>
          </View>
        </View>
        <View style={styles.timePickerRow}>
          <TextInput
            style={styles.timeInput}
            onChangeText={() => {}}
            placeholder="08"
            keyboardType="numeric"
          />
          <Text style={styles.timeInput}>:</Text>
          <TextInput
            style={styles.timeInput}
            onChangeText={() => {}}
            placeholder="00"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
}

export default Card;
