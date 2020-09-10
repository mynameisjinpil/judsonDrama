// BUTTOn
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

function AreaButton(item, style, callback) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={() => callback()} style={style.button}>
        <Text style={style.text}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.constructor({
  buttonsContainer: {
    width: 330,
    marginTop: 30,
  },
});

export default AreaButton;
