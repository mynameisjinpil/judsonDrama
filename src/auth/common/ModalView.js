import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';
import React from 'react';

function ModalView(item, visible, callback) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{item.title}</Text>
          <Text style={styles.modalText}> 확인후 다시 시도해주세요.</Text>
          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: 'rgba(221, 151, 34, 1.0)',
            }}
            onPress={() => {
              callback(false);
            }}>
            <Text style={styles.textStyle}>확인</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.constructor({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalView;
