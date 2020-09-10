import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap/index';
import GetLocation from 'react-native-get-location';

class NavigationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      performance: props.route.params.performance,
      location: {
        longitude: 0.0,
        latitude: 0.0,
      },
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

  render() {
    const {performance} = this.state;
    return (
      <View>
        <NaverMapView
          style={styles.map}
          showsMyLocationButton={true}
          compass={true}
          scaleBar={false}
          center={{...this.state.location, zoom: 13}}
          onCameraChange={(e) =>
            console.log('onCameraChange', JSON.stringify(e))
          }>
          <Marker
            coordinate={this.state.location}
          />
          <Marker
            image={require('../../../asset/marker.png')}
            coordinate={performance.location}
          />
          <Path
            coordinates={[this.state.location, performance.location]}
            color={'red'}
            onClick={() => console.warn('onClick! polyline')}
          />
        </NaverMapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default NavigationScreen;
