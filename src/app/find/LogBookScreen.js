import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

function Comment(parents, count, word, name, date) {
  this.parents = parents;
  this.count = count;
  this.word = word;
  this.name = name;
  this.date = date;
}

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.word}</Text>
      <View style={styles.horizontalContainer}>
        <Text style={styles.date}>{item.date.slice(0, 4)}년 {item.date.slice(5, 7)}월  {item.date.slice(8, 10)}일</Text>
        <Text style={styles.date}> by.{item.name}</Text>
      </View>
    </View>
  );
};

class LogBookScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parents: props.route.params.parents,
      count: 0,
      word: '',
      name: '',
      comments: [],
      user: {},
    };
  }

  componentDidMount() {
    this.fetch();
    this.getUserToken().then((res) => {
      if (res === null) {
        console.log('[HideScreen]NO TOKEN. CHECK TOKEN ID IN getUserToken().');
      } else {
        console.log(res);
        this.setState({user: JSON.parse(res)});
      }
    });
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

  fetch = () => {
    console.log();
    axios
      .get('http://101.101.208.57:8080/api/comment/' + this.state.parents)
      .then((response) => {
        const {data} = response;
        const arr = [];

        for (var i = 0; i < data.length; i++) {
          const temp = new Comment(
            data[i].parents,
            data[i].count,
            data[i].word,
            data[i].name,
            data[i].date,
          );

          arr.push(temp);
        }

        const reverse = arr.reverse();

        this.setState({
          comments: reverse,
          count: data.length,
        });

        console.log(this.state.comments);
      })
      .catch((error) => {
        console.log('Fetch Error: ' + error);
      });
  };

  send = () => {
    const date = Date.now();
    console.log(date);
    axios
      .post('http://101.101.208.57:8080/api/comment', {
        parents: this.state.parents,
        count: this.state.count + 1,
        word: this.state.word,
        name: this.state.user.name,
        date: date,
        id: this.state.user.id,
      })
      .then((response) => {
        this.setState({word: ''});
        this.componentDidMount();
      })
      .catch((err) => {
        console.log('Post Err: ' + err);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <View style={styles.textInput}>
              <TextInput
                multiline
                onChangeText={(text) => {
                  this.setState({word: text});
                }}
                value={this.state.word}
                placeholderTextColor={'#7b7b7b'}
                placeholder={'댓글을 입력해주세요.'}
                style={{
                  flex: 8,
                  padding: 10,
                  paddingTop: 10,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 2,
                  borderWidth: 0.3,
                  borderColor: '#7b7b7b',
                  backgroundColor: 'rgba(221, 151, 34, 1.0)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                }}
                onPress={this.send}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '900',
                    fontSize: 15,
                  }}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          style={styles.listContainer}
          data={this.state.comments}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item item={item} />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: '15%',
    backgroundColor: 'rgba(238, 238, 238, 1.0)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textInputContainer: {
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  listContainer: {
    marginHorizontal: 10,
    marginTop: 3,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    bottom: '90%',
    height: '10%',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
  },
  date: {
    fontSize: 15,
  },
});

export default LogBookScreen;
