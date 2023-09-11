import React from 'react';
const {TouchableOpacity, Text} = require('react-native');
import styles from './styles';

function TouchableOpacityComponent(params) {
  return (
    <TouchableOpacity style={styles.button} onPress={params.onPress}>
      <Text style={styles.content}>{params.content}</Text>
    </TouchableOpacity>
  );
}

export default TouchableOpacityComponent;
