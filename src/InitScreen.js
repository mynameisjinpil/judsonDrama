import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const TextInputView = (item, callback) => {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.text}>{item.title}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={item.placeholder}
        onChangeText={(text) => callback(text)}
      />
    </View>
  );
};

const InitScreen: () => React$Node = () => {
  const [image, setImage] = useState({});
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  function showGallery() {
    const options = {
      title: '이미지 선택',
      takePhotoButtonTitle: '사진 촬영',
      chooseFromLibraryButtonTitle: '갤러리에서 가져오기',
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('[IMAGE PICKER: MESSAGE] - DID CANCEL');
      } else if (response.error) {
        console.log('[IMAGE PICKER: ERROR] - ', response.error);
      } else if (response.customButton) {
        console.log('[IMAGE PICKER: BUTTON CHOOSE] - ', response.customButton);
      } else {
        console.log('[IMAGE PICKER: SUCCESS] - IMAGE SELECTED');
        setImage(response);
      }
    });
  }

  function upload() {
    const data = new FormData();

    const path = image.uri.replace('file://', '');

    data.append('photo', {
      name: 'upload_work_test_2',
      type: image.type,
      uri: path,
    });

    console.log('[SEND DATA] - ', data._parts);

    let config = {
      method: 'post',
      url: 'http://101.101.208.57:8080/api/image/upload',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios(config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {TextInputView(
        {
          title: '공연',
          placeholder: '공연 이름을 입력해 주세요.',
        },
        text => setTitle(text),
      )}
      {TextInputView(
        {
          title: '숨긴이',
          placeholder: ' ',
        },
        text => setName(text),
      )}
      {TextInputView(
        {
          title: '날짜',
          placeholder: 'ex) 2020/08/20 3:30 ~ 2020/08/22 3:30',
        },
        (text) => setDate(text),
      )}
      <TouchableOpacity
        onPress={() =>
          date === '상시공연' ? setDate('') : setDate('상시공연')
        }>

        <Image
          source={
            date === '상시공연'
              ? require('../asset/check/baseline_check_box_black_24pt_2x.png')
              : require('../asset/un_check/baseline_check_box_outline_blank_black_24pt_2x.png')
          }
        />
        <Text>상시공연 체크</Text>
      </TouchableOpacity>
      <Button title={'갤러리'} onPress={() => showGallery()} />
      <Button title={'업로드'} onPress={() => upload()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    height: 50,
    marginTop: 15,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  textInput: {
    padding: 10,
    marginRight: 10,
    borderColor: '#999999',
    borderWidth: 0.5,
    borderRadius: 5,
    width: '90%',
    height: 40,
  },
});

export default InitScreen;
