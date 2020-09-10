import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function HideListScreen({route, navigation}) {
  const isFocused = useIsFocused();
  const {user} = route.params;
  const [perform, setPerform] = useState([]);
  const [isEditing, setEditing] = useState(false);

  console.log(user);

  const Item = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.menuContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>제목: </Text>
          <Text style={styles.text}>{item.title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>창작자: </Text>
          <Text style={styles.text}>{item.creator}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>상세내용: </Text>
          <Text style={styles.text}>{item.body}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>주소: </Text>
          <Text style={styles.text}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('공연정보 수정', {
              user: item,
            })
          }>
          <Image
            style={styles.icon}
            source={require('../../../../asset/baseline_create_black_24pt/baseline_create_black_24pt_1x.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => del(item)}>
          <Image
            style={styles.icon}
            source={require('../../../../asset/baseline_delete_black_24pt/baseline_delete_black_24pt_1x.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  function del({title}) {
    const uri = 'http://101.101.208.57:8080/api/perform/' + title;
    const encoded = encodeURI(uri);

    axios
      .delete(encoded)
      .then(() => {
        console.log('deleted');
        setEditing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const fetchPerform = async () => {
      const result = await axios.get(
        'http://101.101.208.57:8080/api/perform/' + user.id,
      );
      const data = result.data;
      setPerform(data);
      setEditing(false);
      console.log(perform);
    };
    fetchPerform();
  }, [isEditing, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={perform}
        renderItem={Item}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(240, 240, 240, 1.0)',
    marginHorizontal: 20,
  },
  itemContainer: {
    width: '100%',
    padding: 30,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
  },
  menuContainer: {
    flex: 2,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  icon: {
    tintColor: 'rgba(204, 38, 19, 1.0)',
  },
});

export default HideListScreen;
