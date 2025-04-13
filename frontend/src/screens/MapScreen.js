import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import NavBar from '../navigation/TabNavigator';

export default function MapScreen({ navigation }) {
     const [searchText, setSearchText] = useState('');
     const [location, setLocation] = useState(null);
     const [errorMsg, setErrorMsg] = useState(null);

     useEffect(() => {
          (async () => {
               let { status } = await Location.requestForegroundPermissionsAsync();
               if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
               }

               let location = await Location.getCurrentPositionAsync({});
               setLocation(location);
          })();
     }, []);

     const initialRegion = location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
     } : {
          latitude: 26.4739,  // FGCU's coordinates as default
          longitude: -81.7748,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
     };

     return (
          <View style={styles.container}>
               {/* Logo */}
               <Image
                    source={require('../../assets/images/logo-white.png')}
                    style={styles.logo}
               />

               {/* Search bar */}
               <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search for something..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
               />

               {/* Map */}
               <View style={styles.mapContainer}>
                    <MapView
                         style={styles.map}
                         initialRegion={initialRegion}
                         showsUserLocation={true}
                         showsMyLocationButton={true}
                         showsCompass={true}
                    >
                         <Marker
                              coordinate={initialRegion}
                              title="Current Location"
                         >
                              <View style={styles.markerContainer}>
                                   <Image
                                        source={require('../../assets/pictures/navbar/4.png')}
                                        style={styles.markerImage}
                                   />
                                   <Text style={styles.markerText}>You are here</Text>
                              </View>
                         </Marker>
                    </MapView>
               </View>

               {/* NavBar pinned to bottom */}
               <NavBar onChatPress={() => navigation.navigate('Chat')} />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#4A4522',
     },
     logo: {
          width: 150,
          height: 40,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 60,
          marginBottom: 20,
     },
     searchInput: {
          backgroundColor: '#fff',
          borderRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginHorizontal: 20,
          marginBottom: 20,
          fontSize: 16,
     },
     mapContainer: {
          flex: 1,
          overflow: 'hidden',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
     },
     map: {
          width: Dimensions.get('window').width,
          height: '100%',
     },
     markerContainer: {
          alignItems: 'center',
          padding: 5,
     },
     markerImage: {
          width: 30,
          height: 30,
          resizeMode: 'contain',
          marginBottom: 5,
     },
     markerText: {
          color: '#4A4522',
          fontSize: 12,
          fontWeight: 'bold',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 4,
     }
});
