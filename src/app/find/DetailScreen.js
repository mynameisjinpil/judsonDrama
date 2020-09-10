import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      performance: props.route.params.performance,
    };
  }

  componentDidMount() {
    console.log(this.state.performance);
  }

  render() {
    const {performance} = this.state;
    console.log(performance);

    return (
      <View style={styles.view}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              url:
                'http://101.101.208.57:8080/api/image/read/' +
                performance.image,
            }}
            style={styles.titleContainer}>
            <Text style={styles.title}>{performance.title}</Text>
          </ImageBackground>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{performance.date}</Text>
        </View>
        <ScrollView style={styles.body}>
          <Text style={styles.bodyText}>{performance.body}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: 'rgba(221, 151, 34, 1.0)',
            }}
            onPress={() => {
              console.log(performance.title);
              this.props.navigation.navigate('로그북', {
                parents: performance.title,
              });
            }}>
            <Text style={styles.buttonText}>로그북</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.constructor({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  dateContainer: {
    height: '5%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: '30%',
    backgroundColor: 'steelblue',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  body: {
    height: '50%',
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  date: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },
  title: {
    color: 'rgba(0, 0, 0, 1.0)',
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bodyText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 13,
  },
  openButton: {
    borderRadius: 5,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailScreen;
