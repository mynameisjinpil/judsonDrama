import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import TextInputView from './common/TextInputView';
import AreaButton from './common/AreaButton';
import ModalView from './common/ModalView';
import AsyncStorage from '@react-native-community/async-storage';

async function send(data, callback) {
  console.log('[SEND DATA] - ', data);

  return axios
    .post('http://101.101.208.57:8080/api/login', {
      email: data.email,
      pw: data.pw,
    })
    .then(res => {
      const {result} = res.data;
      console.log('[LOGIN: RESPONSE - ]', result);

      if (result.message === '로그인 성공') {
        callback('success', result);
      } else {
        callback('fail', result);
      }
    })
    .catch(err => console.log('[LOGIN: ERROR - ]', err));
}

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidate, setIsValidate] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {ModalView({title: message}, !isValidate, () => setIsValidate(true))}
      <View style={styles.titleContainer}>
        <Text style={styles.title}> JUDSON DRAMA</Text>
      </View>
      <View style={styles.inputsContainer}>
        {TextInputView({title: 'email', isPw: false}, text => setEmail(text))}
        {TextInputView({title: 'pw', isPw: true}, text => setPw(text))}
      </View>
      {AreaButton(
        {title: '로그인'},
        {
          button: {...styles.filled_button},
          text: {...styles.buttonText},
        },
        () => {
          send({email: email, pw: pw}, (message, result) => {
            if (message === 'success') {
              console.log('[LOGIN: SUCCESS]');
              const token = JSON.stringify(result);
              AsyncStorage.setItem('userToken', token);
              navigation.navigate('로딩');
            } else if (message === 'fail') {
              console.log('[LOGIN: FAIL]');
              setIsValidate(false);
              setMessage('잘못된 이메일 혹은 비밀번호입니다.');
            } else {
              console.log('[LOGIN: UNEXPECTED]');
              setIsValidate(false);
              setMessage('예상하지 못한 에러가 발생했습니다.');
            }
          });
        },
      )}
      {AreaButton(
        {title: '아직 회원이 아니신가요? 회원가입'},
        {
          button: {...styles.inline_button},
          text: {...styles.buttonText, color: 'rgb( 84, 131, 251)'},
        },
        () => navigation.navigate('회원가입'),
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.constructor({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '15%',
  },
  inputsContainer: {
    width: 330,
    marginTop: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: '900',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  filled_button: {
    backgroundColor: 'black',
    padding: 10,
    width: '100%',
    height: 40,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline_button: {
    backgroundColor: 'clear',
    padding: 10,
    width: '100%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
  },
});

export default LoginScreen;
