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

const DATA = [
  {title: '이메일', isPw: false, placeholder: ''},
  {title: '비밀번호', isPw: true, placeholder: '6~12자리.'},
  {title: '닉네임', isPw: false, placeholder: ''},
];

async function send(data, callback) {
  console.log('[SEND DATA] - ', data);

  return axios
    .post('http://101.101.208.57:8080/api/signup', {
      email: data.email,
      pw: data.pw,
      name: data.name,
    })
    .then(res => {
      const {result} = res.data;
      console.log('[SIGN UP: RESPONSE - ]', result);

      if (result === 'success') {
        callback('success');
      } else {
        callback('duplicate');
      }
    })
    .catch(err => console.log('[SIGN UP: ERROR - ]', err));
}

function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [message, setMessage] = useState('');
  const [isValidate, setIsValidate] = useState(true);

  function checkEmailValidate() {
    var validate = false;

    // check email
    if (email.includes('@') && email.includes('.')) {
      validate = true;
    } else {
      setIsValidate(false);
      setMessage('이메일 양식이 다릅니다.');
    }

    return validate;
  }

  function checkPasswordValidate() {
    var validate = false;

    // check pw
    if (pw.length > 5 && pw.length < 12) {
      validate = true;
    } else {
      setIsValidate(false);
      setMessage('비밀번호 양식이 다릅니다.');
    }

    return validate;
  }

  const checkValidate = () => {
    return checkEmailValidate() && checkPasswordValidate();
  };

  return (
    <SafeAreaView style={styles.container}>
      {ModalView({title: message}, !isValidate, () => setIsValidate(true))}
      <View style={styles.titleContainer}>
        <Text style={styles.title}> JUDSON DRAMA</Text>
      </View>
      <View style={styles.inputsContainer}>
        {TextInputView(
          {title: '이메일', isPw: false, placeholder: ''},
          text => setEmail(text),
        )}
        {TextInputView(
          {title: '비밀번호', isPw: true, placeholder: '6~12자리.'},
          text => setPw(text),
        )}
        {TextInputView(
          {title: '닉네임', isPw: false, placeholder: ''},
          text => setNickName(text),
        )}
      </View>
      {AreaButton(
        {title: '회원가입'},
        {
          button: {...styles.filled_button},
          text: {...styles.buttonText},
        },
        () => {
          if (checkValidate()) {
            send({email: email, pw: pw, name: nickName}, message => {
              console.log(message);
              if (message === 'success') {
                // DUPLICATE JOB
                console.log('[SIGN UP: SUCCESS]');
                navigation.navigate('로그인');
              } else if (message === 'duplicate') {
                // DUPLICATE JOB
                console.log('[SIGN UP: DUPLICATE]');
                setIsValidate(false);
                setMessage('이미 등록되어있는 이메일입니다.');
              } else {
                // UNEXPECTED JOB
                console.log('[SIGN UP: UNEXPECTED ERROR]');
                setIsValidate(false);
                setMessage('예측하지 못한 에러가 발생했습니다.');
              }
            });
          }
        },
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
  buttonText: {
    color: 'white',
    fontWeight: '900',
  },
});

export default SignUpScreen;
