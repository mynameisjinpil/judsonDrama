// TEXT INPUT VIEW
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

function TextInputView(item, callback) {
  return (
    <View style={styles.textInputViewContainer}>
      <Text style={styles.text}>{item.title}</Text>
      <TextInput
        secureTextEntry={item.isPw}
        style={styles.textInput}
        onChangeText={text => callback(text)}
      />
    </View>
  );
}

const styles = StyleSheet.constructor({
  textInputViewContainer: {
    marginTop: 15,
    width: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInput: {
    padding: 10,
    marginTop: 5,
    borderColor: '#999999',
    borderWidth: 0.5,
    borderRadius: 5,
    width: '100%',
    color: 'black',
  },
});

export default TextInputView;
