const {TextInput, View, Text} = require('react-native');
import React, {useState} from 'react';
import styles from './styles';

function InputField(params) {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => {
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const focusColor = () => (isFocused ? '#2D9CDB' : '#828282');

  return (
    <View style={styles.column}>
      <Text
        style={[
          styles.title,
          {
            color:
              params.validateColor === null
                ? focusColor()
                : params.validateColor,
          },
        ]}>
        {params.title}
      </Text>
      <TextInput
        ref={params.inputRef}
        style={[styles.field, {borderBottomColor: focusColor()}]}
        onChangeText={params.onChangeText}
        value={params.value}
        autoFocus={params.autoFocus === true}
        placeholder={params.placeholder}
        keyboardType={params.keyboardType}
        numberOfLines={1}
        returnKeyType={params.returnKeyType}
        onFocus={() => {
          handleOnFocus();
        }}
        onBlur={() => {
          handleOnBlur();
        }}
        onSubmitEditing={() => {
          params.onSubmit();
        }}
      />
      {!params.checkFullNameIsNull ? null : (
        <Text style={[styles.validateMessage]}>{params.validateMessage}</Text>
      )}
    </View>
  );
}
export default InputField;
