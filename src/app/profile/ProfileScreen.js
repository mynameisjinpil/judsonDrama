import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Menu = [
  {
    id: '1',
    title: '숨긴공연 관리',
  },
  {
    id: '2',
    title: '로그정보 관리',
  },
];

async function getUserToken() {
  const userToken = await AsyncStorage.getItem('userToken', (err, value) => {
    if (err) {
      console.log(err);
      return err;
    }
    return JSON.parse(value);
  });
  return userToken;
}

function ProfileScreen({navigation}) {
  const [user, setUser] = useState({email: '', name: '', id: '', message: ''});

  useEffect(() => {
    getUserToken().then((res) => {
      if (res === null) {
        console.log('[ProfileScreen]NO TOKEN. CHECK TOKEN ID IN getUserToken().');
      } else {
        setUser(JSON.parse(res));
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profile}
          source={require('../../../asset/outline_account_circle_black_24pt/outline_account_circle_black_24pt_3x.png')}
        />
        <Text style={styles.name}>{user.name}</Text>
        <View
          style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          <Image
            style={{marginHorizontal: 5, tintColor: 'white'}}
            source={require('../../../asset/outline_email_black_24pt/outline_email_black_24pt_1x.png')}
          />
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <FlatList
          data={Menu}
          renderItem={({item}) => {
            return (
              <View style={styles.menuItemContainer}>
                <View style={styles.menu}>
                  <Button
                    style={styles.menuText}
                    title={item.title}
                    color={'#000000'}
                    onPress={() =>
                      navigation.navigate(item.title, {
                        user: user,
                      })
                    }
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.menuItemContainer}>
        <View style={{...styles.menu, ...styles.logOut}}>
          <Button
            style={{...styles.menuText}}
            title={'로그아웃'}
            color={'red'}
            onPress={() => {
              AsyncStorage.removeItem('userToken');
              navigation.navigate('로딩');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(244, 244, 244, 0.5)',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    height: 300,
    backgroundColor: 'rgba(221, 151, 34, 1.0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  menuItemContainer: {
    marginTop: 3,
    height: 60,
    justifyContent: 'center',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
  },
  name: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '900',
    color: 'white',
  },
  email: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  menu: {
    height: '100%',
    marginHorizontal: 10,
    justifyContent: 'center',
    borderColor: 'rgba(150, 150, 150, 1.0)',
    borderBottomWidth: 0.7,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '900',
    marginHorizontal: 20,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  logOut: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(250, 250, 250, 1.0)',
    borderTopWidth: 0.1,
    borderBottomWidth: 0.1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ProfileScreen;
