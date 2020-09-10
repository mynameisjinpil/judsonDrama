import React, {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  TouchableHighlight,
  Platform, ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

const DATA = [
  {
    id: '1',
    class: 'title',
    ui: 'input-text',
    title: '공연 ',
    placeholder: '공연의 이름을 입력해주세요.',
  },
  {
    id: '2',
    class: 'creator',
    ui: 'input-text',
    title: '숨긴이',
    placeholder: '숨긴이의 성함을 입력해주세요',
  },
  {
    id: '3',
    class: 'date',
    ui: 'input-date',
    title: '날짜',
    placeholder: 'ex) 2020/08/20 3:30 ~ 2020/08/22 3:30',
  },
  {
    id: '4',
    class: 'body',
    ui: 'input-multi-text',
    title: '상세 내용',
    placeholder: '작업의 내용에 대해 상세하게 기술해주세요.',
  },
  {
    id: '5',
    class: 'location',
    ui: 'button-text',
    title: '좌표 지정(필수)',
  },
  {
    id: '6',
    class: 'image_url',
    ui: 'button-text',
    title: '이미지 첨부(필수)',
  },
  {
    id: '7',
    class: 'url',
    ui: 'input-text',
    title: 'URL',
    placeholder: '참조할만한 URL을 입력해주세요.(필수아님)',
  },
  {
    id: '8',
    class: 'button',
    ui: 'buttons',
    title: 'buttons',
  },
];

const createFormData = photo => {
  const data = new FormData();

  const url =
    Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: url,
  });

  console.log('[data]:', data._parts);

  return data;
};

class EditHideScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.user = props.route.params.user;
    var toggle = false;

    if (this.user.date === '상시') {
      toggle = true;
    }

    this.state = {
      title: this.user.title,
      creator: this.user.creator,
      date: '',
      body: this.user.body,
      address: this.user.address,
      location: {
        longitude: this.user.longitude,
        latitude: this.user.latitude,
      },
      location_body: '',
      image_url: this.user.image,
      url: this.user.url,
      show: false,
      toggleCheckBox: toggle,
      modalVisible: false,
      modalText: '',
      disabled: false,
    };
  }

  getUserToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken', (err, value) => {
      if (err) {
        console.log(err);
        return err;
      }
      return JSON.parse(value);
    });
    return userToken;
  };

  renderedItem = ({item}) => {
    switch (item.ui) {
      case 'input-text':
        return this.InputTextItem(item);
      case 'input-multi-text':
        return this.InputMutilTextItem(item);
      case 'input-date':
        return this.InputDateItem(item);
      case 'button-text':
        var image = null;
        if (item.title === '이미지 첨부(필수)') {
          image = require('../../../../asset/outline_add_photo_alternate_black_24pt/outline_add_photo_alternate_black_24pt_2x.png');
        } else {
          image = require('../../../../asset/outline_explore_black_24pt/outline_explore_black_24pt_2x.png');
        }

        return this.InputButtonItem(item, image);
      case 'buttons':
        return this.ButtonsItem();
    }
  };

  InputButtonItem = (classification, image) => {
    const showPicker = () => {
      const options = {
        title: '이미지 선택',
        takePhotoButtonTitle: '사진 촬영',
        chooseFromLibraryButtonTitle: '갤러리에서 가져오기',
      };

      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('취소');
        } else if (response.error) {
          console.log('에러: ', response.error);
        } else if (response.customButton) {
          console.log('버튼 선택: ', response.customButton);
        } else {
          const image = {url: 'data:image/jpeg;base64,' + response.data};
          console.log('이미지 선택 성공');
          this.setState({image_url: image});
        }
      });
    };

    const showMap = () => {
      return this.navigation.navigate('위치수정', {
        onReturn: (address, selected) => {
          console.log('return');
          this.setState({address: address, location: selected});
        },
      });
    };

    return (
      <TouchableOpacity
        style={styles.inputButtonContainer}
        onPress={classification.class === 'location' ? showMap : showPicker}>
        <Image style={styles.icon} source={image} />
        <Text style={styles.buttonText}>{classification.title}</Text>
      </TouchableOpacity>
    );
  };

  InputDateItem = classification => {
    const checkImage = require('../../../../asset/check/baseline_check_box_black_24pt_2x.png');
    const unCheckImage = require('../../../../asset/un_check/baseline_check_box_outline_blank_black_24pt_2x.png');

    return (
      <View>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>{classification.title}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => {
              this.setState({date: text});
            }}
            placeholderTextColor={'#7b7b7b'}
            placeholder={classification.placeholder}
          />
        </View>
        <TouchableOpacity
          style={styles.inputButtonContainer}
          onPress={() => {
            if (this.state.toggleCheckBox) {
              this.setState({
                toggleCheckBox: !this.state.toggleCheckBox,
                date: '',
              });
            } else {
              this.setState({
                toggleCheckBox: !this.state.toggleCheckBox,
                date: '상시',
              });
            }
          }}>
          {this.state.toggleCheckBox === true ? (
            <Image style={styles.icon} source={checkImage} />
          ) : (
            <Image style={styles.icon} source={unCheckImage} />
          )}
          <Text style={styles.buttonText}> 상시공연 체크</Text>
        </TouchableOpacity>
      </View>
    );
  };

  InputMutilTextItem = classification => {
    return (
      <View style={styles.multiTextInputContainer}>
        <Text style={styles.text}>{classification.title}</Text>
        <TextInput
          multiline
          style={styles.multiTextInput}
          onChangeText={text => {
            if (classification.class === 'body') {
              this.setState({body: text});
            } else if (classification.class === 'location_body') {
              this.setState({location_body: text});
            }
          }}
          value={
            classification.class === 'body'
              ? this.state.body
              : this.state.location_body
          }
          placeholderTextColor={'#7b7b7b'}
          placeholder={classification.placeholder}
        />
      </View>
    );
  };

  InputTextItem = classification => {
    return (
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>{classification.title}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            if (classification.class === 'title') {
              this.setState({title: text});
            } else if (classification.class === 'creator') {
              this.setState({creator: text});
            } else {
              this.setState({url: text});
            }
          }}
          value={
            classification.class === 'title'
              ? this.state.title
              : classification.class === 'creator'
              ? this.state.creator
              : this.state.url
          }
          placeholderTextColor={'#7b7b7b'}
          placeholder={classification.placeholder}
        />
      </View>
    );
  };

  ButtonsItem = () => {
    return (
      <TouchableOpacity
        style={styles.buttonsContainer}
        onPress={() => {
          if (this.checkValidate()) {
            this.upload(this.navigation);
          }
        }}>
        <Text style={{color: 'white', fontWeight: '900'}}> 확인 </Text>
      </TouchableOpacity>
    );
  };

  checkValidate = () => {
    var validate = false;

    if (this.state.title === '') {
      this.setState({
        modalVisible: true,
        modalText: '공연 제목이 입력되지않았습니다.',
      });
    } else if (this.state.creator === '') {
      this.setState({
        modalVisible: true,
        modalText: '숨긴이가 입력되지않았습니다.',
      });
    } else if (this.state.date === '') {
      this.setState({
        modalVisible: true,
        modalText: '날짜가 입력되지않았습니다.',
      });
    } else if (this.state.body === '') {
      this.setState({
        modalVisible: true,
        modalText: '상세설명이 입력되지않았습니다.',
      });
    } else if (
      this.state.location.longitude === 0.0 ||
      this.state.location.latitude === 0.0
    ) {
      this.setState({
        modalVisible: true,
        modalText: '좌표가 입력되지않았습니다.',
      });
    } else if (this.state.addrress === '') {
      this.setState({
        modalVisible: true,
        modalText: '주소가 입력되지않았습니다.',
      });
    } else if (this.state.image === '') {
      this.setState({
        modalVisible: true,
        modalText: '이미지가 입력되지않았습니다.',
      });
    } else {
      validate = true;
    }

    return validate;
  };

  send = navigation => {
    var self = this;

    return axios
      .put('http://101.101.208.57:8080/api/perform/' + self.user.title, {
        title: this.state.title,
        creator: this.state.creator,
        date: this.state.date,
        address: this.state.address,
        body: this.state.body,
        longitude: this.state.location.longitude,
        latitude: this.state.location.latitude,
        image: this.state.title,
        url: this.state.url,
        id: this.state.id,
      })
      .then(function(res) {
        const {result} = res.data;
        if (result === 'already has') {
          self.setState({
            modalVisible: true,
            modalText: '이미등록된 공연 이름입니다..',
          });
        } else {
          console.log('success post perform');

          self.setState({
            title: '',
            creator: '',
            date: '',
            body: '',
            address: ' ',
            location: {
              longitude: 126.977011,
              latitude: 37.564362,
            },
            location_body: '',
            image_url: '',
            image: '',
            url: '',
            disabled: false,
          });

          navigation.goBack();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  upload = navigation => {
    console.log('upload...');
    this.setState({disabled: true});
    setTimeout(() => this.post(navigation), 2000);
  };

  post = navigation => {
    const data = createFormData({
      ...this.state.image,
      fileName: this.state.title,
    });

    console.log(data);

    var config = {
      method: 'post',
      url: 'http://101.101.208.57:8080/api/image/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios(config)
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(err => console.log('[IMAGE UPLOAD ERR]', err));
  };

  componentDidMount() {
    this.getUserToken().then(res => {
      if (res === null) {
        console.log('[HideScreen]NO TOKEN. CHECK TOKEN ID IN getUserToken().');
      } else {
        this.setState({id: JSON.parse(res).id});
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.listContainer}>
        {this.state.disabled ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{this.state.modalText}</Text>
                  <Text style={styles.modalText}>
                    확인후 다시 시도해주세요.
                  </Text>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: 'rgba(221, 151, 34, 1.0)',
                    }}
                    onPress={() => {
                      this.setState({modalVisible: false});
                    }}>
                    <Text style={styles.textStyle}>확인</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <KeyboardAwareFlatList
              data={DATA}
              renderItem={this.renderedItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 0,
    marginRight: 0,
    height: '100%',
    backgroundColor: 'white',
  },
  textInputContainer: {
    marginTop: 15,
    marginRight: 10,
    padding: 0,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  multiTextInputContainer: {
    marginTop: 15,
    marginRight: 10,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  inputButtonContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '35%',
    marginLeft: '64%',
    marginRight: 10,
    marginTop: 10,
  },
  datePickerContainer: {
    marginTop: 15,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  buttonsContainer: {
    marginTop: 30,
    marginRight: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    height: 40,
    marginLeft: 25,
  },
  text: {
    marginRight: 10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '800',
  },
  textInput: {
    padding: 10,
    marginRight: 10,
    borderColor: '#999999',
    borderWidth: 0.5,
    borderRadius: 5,
    width: '90%',
    color: 'black',
  },
  multiTextInput: {
    height: 250,
    marginRight: 10,
    width: '90%',
    paddingTop: 10,
    padding: 10,
    borderColor: '#999999',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  icon: {
    tintColor: 'black',
    width: 22,
    height: 22,
    marginRight: 5,
  },
  buttonText: {
    color: 'black',
  },
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
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default EditHideScreen;
