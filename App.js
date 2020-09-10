import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// FIND STACK
const FindStack = createStackNavigator();

import FindScreen from './src/app/find/FindScreen';
import DetailScreen from './src/app/find/DetailScreen';
import LogBookScreen from './src/app/find/LogBookScreen';
import NavigationScreen from './src/app/find/NavigationScreen';

function FindStackView() {
  // find screen +---+ detail screen +---+ map screen
  //                                 |
  //                                 |
  //                                 +---+ log screen
  return (
    <FindStack.Navigator>
      <FindStack.Screen
        name={'찾기'}
        component={FindScreen}
        options={{headerShown: false}}
      />
      <FindStack.Screen name={'상세정보'} component={DetailScreen} />
      <FindStack.Screen name={'로그북'} component={LogBookScreen} />
      <FindStack.Screen name={'길안내'} component={NavigationScreen} />
    </FindStack.Navigator>
  );
}

// HIDE STACK
const HideStack = createStackNavigator();
import CautionScreen from './src/app/hide/CautionScreen';
import HideScreen from './src/app/hide/HideScreen';
import LocationSelectScreen from './src/app/hide/LocationSelectScreen';

function HideStackScreen() {
  // hide screen +---+ address select screen
  //             |
  //             |
  //             +---+ photo select screen
  console.log('?!?!?!?!?!?!?');

  return (
    <HideStack.Navigator>
      <HideStack.Screen
        name={'주의사항'}
        component={CautionScreen}
        options={{headerShown: false}}
      />
      <HideStack.Screen
        name={'숨기기'}
        component={HideScreen}
        options={{headerShown: false}}
      />
      <HideStack.Screen
        name={'위치선택'}
        component={LocationSelectScreen}
      />
    </HideStack.Navigator>
  );
}

// PROFILE STACK
const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={'프로필'} component={ProfileScreen} options={{headerLeft: false}}/>
      <ProfileStack.Screen name={'숨긴공연 관리'} component={HideListScreen} />
      <ProfileStack.Screen name={'로그정보 관리'} component={LogListScreen} />
      <ProfileStack.Screen name={'공연정보 수정'} component={EditHideScreen} />
      <ProfileStack.Screen name={'위치수정'} component={LocationEditSelectScreen} />
    </ProfileStack.Navigator>
  );
}

// THIS STACK IS SINGLE COMPONENT BUT I PACK FOR NAVIGATOR BAR
const UsageStack = createStackNavigator();
const DescriptionStack = createStackNavigator();
import UsageScreen from './src/app/usage/UsageScreen';
import DescriptionScreen from './src/app/description/DescriptionScreen';

function UsageStackScreen() {
  return (
    <UsageStack.Navigator>
      <UsageStack.Screen
        name={'사용법'}
        component={UsageScreen}
        options={{headerLeft: null}}
      />
    </UsageStack.Navigator>
  );
}

function DescriptionStackScreen() {
  return (
    <DescriptionStack.Navigator>
      <DescriptionStack.Screen
        name={'프로젝트'}
        component={DescriptionScreen}
        options={{headerLeft: null}}
      />
    </DescriptionStack.Navigator>
  );
}

// APP STACK
const AppTabStack = createBottomTabNavigator();

// TODO: IMPORT FIND, HIDE, USAGE, DESCRIPTION, PROFILE COMPONENT
function AppTabStackScreen() {
  return (
    <AppTabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '찾기') {
            iconName = require('./asset/outline_search_black_24pt/outline_search_black_24pt_1x.png');
          } else if (route.name === '숨기기') {
            iconName = require('./asset/baseline_room_black_24pt/baseline_room_black_24pt_1x.png');
          } else if (route.name === '사용법') {
            iconName = require('./asset/outline_touch_app_black_24pt/outline_touch_app_black_24pt_1x.png');
          } else if (route.name === '프로젝트') {
            iconName = require('./asset/outline_info_black_24pt/outline_info_black_24pt_1x.png');
          } else if (route.name === '프로필') {
            iconName = require('./asset/outline_account_circle_black_24pt/outline_account_circle_black_24pt_1x.png');
          }

          return <Image style={{tintColor: color}} source={iconName} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(221, 151, 34, 1.0)',
        inactiveTintColor: 'gray',
      }}>
      <AppTabStack.Screen name={'찾기'} component={FindStackView} />
      <AppTabStack.Screen name={'숨기기'} component={HideStackScreen} />
      <AppTabStack.Screen name={'사용법'} component={UsageStackScreen} />
      <AppTabStack.Screen name={'프로젝트'} component={DescriptionStackScreen} />
      <AppTabStack.Screen name={'프로필'} component={ProfileStackScreen} />
    </AppTabStack.Navigator>
  );
}

// USER AUTH STACK
const AuthStack = createStackNavigator();

import LoginScreen from './src/auth/LoginScreen';
import SignUpScreen from './src/auth/SignUpScreen';

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={'로그인'}
        component={LoginScreen}
        options={{headerShown: false, headerTintColor: 'black'}}
      />
      <AuthStack.Screen name={'회원가입'} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

// MAIN NAVIGATOR
const AppStack = createStackNavigator();

import InitScreen from './src/InitScreen';
import LoadingScreen from './src/LoadingScreen';
import ProfileScreen from './src/app/profile/ProfileScreen';
import HideListScreen from './src/app/profile/hide/HideListScreen';
import LogListScreen from './src/app/profile/log/LogListScreen';
import EditHideScreen from './src/app/profile/hide/EditHideScreen';
import LocationEditSelectScreen from './src/app/profile/hide/LocationEditSelectScreen';

function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name={'로딩'}
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name={'인증'}
          component={AuthStackScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen name={'앱'} component={AppTabStackScreen} options={{headerShown: false}} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
