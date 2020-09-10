import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap/index';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

class LocationEditSelectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      location: {
        longitude: 126.977011,
        latitude: 37.564362,
      },
      click: {
        longitude: 126.977011,
        latitude: 37.564362,
      },
      address: '유효하지 않은 주소',
    };
  }

  componentDidMount() {
    this.getLocation();
  }

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

  reverseGeoCoding = async (lat, lng) => {
    const latitude = lat.toFixed(7);
    const longitude = lng.toFixed(7);

    axios
      .get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?=request=coordsToaddr&coords='+ longitude + ',' + latitude + '&orders=addr&output=json', {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': 'ggbu61huj8',
            'X-NCP-APIGW-API-KEY': 'uY9UR52Po6NaFDhsN0DJmpid4nHlorJBp2yYS6qg',
          },
        },
      )
      .then((response) => {
        const address = response.data.results[0].region.area1.name + ' ' + response.data.results[0].region.area2.name + ' ' + response.data.results[0].region.area3.name;
        let number = '';

        if (response.data.results[0].land.number2 == '') {
          number = response.data.results[0].land.number1;
        } else {
          number = response.data.results[0].land.number1 + '-' + response.data.results[0].land.number2;
        }
        this.setState({address: address + ' ' + number, location: {latitude: Number(latitude), longitude: Number(longitude)}});
      })
      .catch((error) => {
        console.log('RG' + error);
      });
  };

  render() {
    const P0 = {latitude: 37.608518, longitude: 126.724265};

    return (
      <View>
        <NaverMapView
          style={styles.map}
          showsMyLocationButton={true}
          compass={true}
          scaleBar={true}
          center={{...this.state.location, zoom: 16}}
          onMapClick={(e) => {
            const data = e;
            this.reverseGeoCoding(data.latitude, data.longitude).then(() => {
              this.setState({
                isClicked: true,
                click: {
                  longitude: data.longitude,
                  latitude: data.latitude,
                },
              });
            });
          }}>
          {
            this.state.isClicked
              ?
              <Marker image={require('../../../../asset/marker.png')} coordinate={{longitude: this.state.click.longitude, latitude: this.state.click.latitude}} />
              :
              null
          }
        </NaverMapView>
        {
          this.state.isClicked
            ?
            <View style={{opacity: 0.8,backgroundColor: '#c2cadf', top: '70%', height: '30%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>{this.state.address}</Text>
              <View style={{flexDirection: 'row', marginTop: 30, width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Button
                  title={'선택'}
                  color={'#464D5F'}
                  onPress={()=> {
                    this.setState({isClicked: false});
                    this.props.route.params.onReturn(
                      this.state.address,
                      this.state.location,
                    );
                    this.props.navigation.goBack();
                  }}
                />
                <Button title={'취소'}
                        color={'#464D5F'}
                        onPress={()=>this.setState({isClicked: false})}
                />
              </View>
            </View>
            :
            null
        }
      </View>
    );
  }
}

const styles = StyleSheet.constructor({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LocationEditSelectScreen;
