import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.authAsync();
    const {navigation} = this.props;
    navigation.addListener('focus', this._handleStateChange);
  }

  _handleStateChange = state => {
    this.authAsync();
  };

  authAsync = async () => {
    const {navigation} = this.props;
    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? '앱' : '인증');
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }
}

export default LoadingScreen;
