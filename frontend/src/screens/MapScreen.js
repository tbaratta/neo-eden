import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import NavBar from '../navigation/TabNavigator';

export default function MapScreen({ navigation }) {
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
                    placeholder="Search for something..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
               />

               {/* Map */}
               <View style={styles.mapContainer}>
                    <MapView
                         style={styles.map}
                         showsUserLocation={true}
                         showsCompass={true}
                         initialRegion={{
                              latitude: 37.78825,
                              longitude: -122.4324,
                              latitudeDelta: 0.05,
                              longitudeDelta: 0.05,
                         }}
                    >
                         <Marker
                              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                              title="Custom Marker"
                              description="This is a callout description"
                         >
                              <Image
                                   source={require('../../assets/pictures/navbar/4.png')}
                                   style={styles.markerImage}
                              />
                              <Callout>
                                   <View>
                                        <Text>This is San Francisco</Text>
                                   </View>
                              </Callout>
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
          flex: 1,
          width: '100%',
          height: '100%',
     },
     markerImage: {
          width: 30,
          height: 30,
          resizeMode: 'contain',
     },
});