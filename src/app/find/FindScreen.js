import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap/index';
import GetLocation from 'react-native-get-location';
import * as Alert from 'react-native';
import axios from 'axios';

function Performance(
  title,
  creator,
  date,
  location,
  body,
  address,
  image,
  url,
) {
  this.title = title;
  this.creator = creator;
  this.date = date;
  this.location = location;
  this.body = body;
  this.address = address;
  this.image = image;
  this.url = url;
}

class FindScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      performances: [],
      location: {
        longitude: 126.977011,
        latitude: 37.564362,
      },
      showModal: false,
      current: new Performance(),
      updated: '',
    };
  }

  componentDidMount() {
    this.getLocation();
    this.fetchPerformance();

    const {navigation} = this.props;
    navigation.addListener('focus', this._handleStateChange);
  }

  _handleStateChange = () => {
    console.log('work..');
    this.fetchPerformance();
  };

  fetchPerformance = () => {
    axios
      .get('http://101.101.208.57:8080/api/perform/')
      .then(response => {
        const {data} = response;
        const arr = [];

        for (var i = 0; i < data.length; i++) {
          const p = new Performance(
            data[i].title,
            data[i].creator,
            data[i].date,
            {
              latitude: Number(data[i].latitude),
              longitude: Number(data[i].longitude),
            },
            data[i].body,
            data[i].address,
            data[i].image,
            data[i].url,
          );
          arr.push(p);
        }

        this.setState({
          performances: arr,
        });
      })
      .catch((error) => {
        console.log('Fetch Error' + error);
      });
  };

  getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({
          location: location,
        });
      })
      .catch((error) => {
        console.log('실패');
        const {code, message} = error;
        console.log(code, message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <NaverMapView
          style={styles.map}
          showsMyLocationButton={true}
          compass={true}
          scaleBar={true}
          center={{
            ...this.state.location,
            zoom: 13,
          }}
          // center={{...this.state.location, zoom: 13}}
        >
          {this.state.performances.map((p) => {
            return (
              <Marker
                image={require('../../../asset/marker.png')}
                key={p.title}
                coordinate={p.location}
                onClick={() => {
                  this.setState({
                    showModal: !this.state.showModal,
                    current: p,
                  });
                }}
              />
            );
          })}
          {
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent
                visible={this.state.showModal}
                onRequestClose={() => {
                  Alert.Alert('Modal has been closed.');
                }}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({showModal: false})}>
                  <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.bottomView}>
                  <View style={styles.modalView}>
                    <View style={{alignItems: 'flex-start'}}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 15,
                        }}>
                        <Text style={{...styles.titleText}}>
                          {this.state.current.title}
                        </Text>
                        <Button
                          title={'X'}
                          color={'black'}
                          onPress={() => this.setState({showModal: false})}
                        />
                      </View>
                      <Text style={styles.modalText}>
                        숨긴이: {this.state.current.creator}
                      </Text>
                      <Text style={styles.modalText}>
                        일시: {this.state.current.date}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          backgroundColor: 'rgba(221, 151, 34, 1.0)',
                        }}
                        onPress={() => {
                          this.setState({showModal: false});
                          this.props.navigation.navigate('길안내', {
                            performance: this.state.current,
                          });
                        }}>
                        <Text style={styles.textStyle}>길안내</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          backgroundColor: 'rgba(221, 151, 34, 1.0)',
                        }}
                        onPress={() => {
                          this.setState({showModal: false});
                          console.log('current: ' + this.state.current);
                          this.props.navigation.navigate('상세정보', {
                            performance: this.state.current,
                          });
                        }}>
                        <Text style={styles.textStyle}>상세정보</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          }
        </NaverMapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  bottomView: {
    top: '70%',
    height: '30%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0.0,0.0,0.0,0.0)',
  },
  openButton: {
    borderRadius: 5,
    padding: 10,
    width: '40%',
    elevation: 2,
    marginHorizontal: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    textAlign: 'center',
    color: 'rgba(204, 38, 19, 1.0)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FindScreen;
