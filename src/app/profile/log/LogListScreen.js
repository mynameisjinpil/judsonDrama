import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

function LogListScreen({navigation, route}) {
  const {user} = route.params;
  const [comments, setComments] = useState([])
  const [isEditing, setEditing] = useState(false);
  const isFocused = useIsFocused();

  const Item = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>로그된 보물: </Text>
            <Text>{item.parents}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>날짜: </Text>
            <Text style={styles.text}>{item.date.slice(0, 4)}년 {item.date.slice(5, 7)}월  {item.date.slice(8, 10)}일</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>로그 내용</Text>
            <Text style={styles.text}>{item.word}</Text>
          </View>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => del(item)}
          >
            <Image
              style={styles.icon}
              source={require('../../../../asset/baseline_delete_black_24pt/baseline_delete_black_24pt_2x.png')}
            />
          </TouchableOpacity>
        </View>
        <Text></Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchComment = async () => {
      const result = await axios.get(
        'http://101.101.208.57:8080/api/comment/id/' + user.id,
      );
      const data = result.data;
      setComments(data);
      setEditing(false);
      console.log(comments);
    };

    fetchComment();
  }, [isFocused, isEditing]);

  function del({parents, count}) {
    axios
      .delete('http://101.101.208.57:8080/api/comment/' + parents + '/' + count)
      .then(() => {
        console.log('deleted');
        setEditing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={Item}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.constructor({
  container: {
    flex: 1,
    backgroundColor: 'rgba(240, 240, 240, 1.0)',
    marginHorizontal: 20,
  },
  itemContainer: {
    width: '100%',
    padding: 30,
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
    marginTop: 20,
  },
  textContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
  },
});

export default LogListScreen;
