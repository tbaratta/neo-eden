import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
     const [searchText, setSearchText] = useState('');

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
                    placeholder="Search locations..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
               />

               {/* Map content */}
               <View style={styles.content}>
                    <MapView
                         style={styles.map}
                         initialRegion={{
                              latitude: 26.4739,
                              longitude: -81.7748,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                         }}
                    >
                         <Marker
                              coordinate={{
                                   latitude: 26.4739,
                                   longitude: -81.7748,
                              }}
                         >
                              <Image
                                   source={require('../../assets/pictures/navbar/4.png')}
                                   style={styles.markerImage}
                              />
                         </Marker>
                    </MapView>
               </View>
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
     content: {
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
     },
     map: {
          width: '100%',
          height: '100%',
     },
     markerImage: {
          width: 30,
          height: 30,
          resizeMode: 'contain',
     },
});
