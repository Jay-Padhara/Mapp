import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
} from 'react-native-maps';
import {GOOGLE_API_KEY} from './GoogleApi';
import MapViewDirections from 'react-native-maps-directions';

export default function App() {
  const [pin, setPin] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    async function handleLocation() {
      {
        Platform.OS === 'android'
          ? await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
          : null;
      }
    }

    handleLocation();
  }, []);

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const [cord, setCord] = useState({
    pickupcord: {
      latitude: 21.20477314319576,
      longitude: 72.81642509624362,
    },
    dropcord: {
      latitude: 21.223393880125933,
      longitude: 72.90030045434833,
    },
  });

  const {pickupcord, dropcord} = cord;

  return (
    <View style={{flex: 1}}>
      <View>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={region => {
            console.log(region);
          }}
          onPress={region => {
            console.log(region.nativeEvent.coordinate);
            setLongitude(region.nativeEvent.coordinate.longitude);
            setLatitude(region.nativeEvent.coordinate.latitude);
          }}
          showsUserLocation
          showsMyLocationButton
          showsTraffic
          showsBuildings
          showsCompass
          showsScale
          mapType="hybrid">
          {/* 
          <Marker
            coordinate={{ longitude: pickupcord.longitude, latitude: pickupcord.latitude }}
            title='I am pick up point.'
            pinColor='green'
            draggable={true}
            onDragStart={(e) => console.log(e.nativeEvent.coordinate)}
            onDragEnd={(e) => setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })}
          />

          <Marker
            coordinate={{ longitude: dropcord.longitude, latitude: dropcord.latitude }}
            title='I am drop point.'
            pinColor='blue'
            draggable={true}
            onDragStart={(e) => console.log(e.nativeEvent.coordinate)}
            onDragEnd={(e) => setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })}
          /> */}

          {/* <MapViewDirections
            origin={pickupcord}
            destination={dropcord}
            apikey={GOOGLE_API_KEY}
            strokeColor='red'
            strokeWidth={6}
          /> */}

          <Marker
            coordinate={{longitude: longitude, latitude: latitude}}
            title="I am point"
            pinColor="blue">
            <Callout>
              <Text>Latitude : {latitude}</Text>
              <Text>Longitude : {longitude}</Text>
            </Callout>
          </Marker>

          <Circle
            center={{longitude: pin.longitude, latitude: pin.latitude}}
            radius={1000}
            strokeColor="black"
            strokeWidth={2}
          />
        </MapView>
      </View>
    </View>
  );
}
