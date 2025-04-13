import React, { useState, useEffect, useRef } from 'react';
import {
     View,
     StyleSheet,
     TextInput,
     Keyboard,
     TouchableOpacity,
     Text,
     ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const waterSources = [
     { id: 'w1', latitude: 40.7128, longitude: -74.0060 },
     { id: 'w2', latitude: 37.7749, longitude: -122.4194 },
];

const radiationZones = [
     { id: 'r1', latitude: 41.8781, longitude: -87.6298 },
     { id: 'r2', latitude: 34.0522, longitude: -118.2437 },
];

const farmingZones = [
     { id: 'f1', latitude: 36.1627, longitude: -86.7816 },
     { id: 'f2', latitude: 39.7392, longitude: -104.9903 },
];

export default function MapScreen() {
     const mapRef = useRef(null);
     const [searchText, setSearchText] = useState('');
     const [userLocation, setUserLocation] = useState(null);
     const [mapRegion, setMapRegion] = useState({
          latitude: 39.8283,
          longitude: -98.5795,
          latitudeDelta: 60,
          longitudeDelta: 60,
     });
     const [loading, setLoading] = useState(true);
     const [errorMsg, setErrorMsg] = useState(null);
     const [activeFilters, setActiveFilters] = useState(['water', 'radiation', 'farming']);

     const animateToUserLocation = (location) => {
          if (mapRef.current && location) {
               const userRegion = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
               };
               mapRef.current.animateToRegion(userRegion, 3000);
          }
     };

     useEffect(() => {
          (async () => {
               try {
                    setLoading(true);
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                         setErrorMsg('Permission to access location was denied');
                         setLoading(false);
                         return;
                    }

                    const location = await Location.getCurrentPositionAsync({});
                    const userLoc = {
                         latitude: location.coords.latitude,
                         longitude: location.coords.longitude,
                    };
                    setUserLocation(userLoc);

                    Location.watchPositionAsync(
                         {
                              accuracy: Location.Accuracy.High,
                              timeInterval: 5000,
                              distanceInterval: 10,
                         },
                         (loc) => setUserLocation(loc.coords)
                    );

                    setTimeout(() => animateToUserLocation(userLoc), 500);
               } catch (error) {
                    console.error('Error getting location:', error);
                    setErrorMsg('Error getting location');
               } finally {
                    setLoading(false);
               }
          })();
     }, []);

     const handleSearch = async () => {
          if (!searchText) return;

          try {
               const results = await Location.geocodeAsync(searchText);
               if (results.length > 0) {
                    const { latitude, longitude } = results[0];
                    const newRegion = {
                         latitude,
                         longitude,
                         latitudeDelta: 0.3,
                         longitudeDelta: 0.3,
                    };
                    setMapRegion(newRegion);
                    mapRef.current?.animateToRegion(newRegion, 2000);
                    Keyboard.dismiss();
               } else {
                    alert('City not found');
               }
          } catch (error) {
               console.error('Geocoding error:', error);
               alert('Failed to find location.');
          }
     };

     const handleLocateButtonPress = () => {
          if (userLocation) {
               animateToUserLocation(userLocation);
          }
     };

     const toggleFilter = (filter) => {
          setActiveFilters((prev) =>
               prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
          );
     };

     return (
          <View style={styles.container}>
               <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={mapRegion}
               >
                    {userLocation && (
                         <Marker
                              coordinate={userLocation}
                              title="Your Location"
                              pinColor="blue"
                         />
                    )}

                    {activeFilters.includes('water') && waterSources.map((zone) => (
                         <Marker
                              key={zone.id}
                              coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
                              pinColor="blue"
                              title="Water Source"
                         />
                    ))}

                    {activeFilters.includes('radiation') && radiationZones.map((zone) => (
                         <Marker
                              key={zone.id}
                              coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
                              pinColor="red"
                              title="Radiation Zone"
                         />
                    ))}

                    {activeFilters.includes('farming') && farmingZones.map((zone) => (
                         <Marker
                              key={zone.id}
                              coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
                              pinColor="green"
                              title="Farming Zone"
                         />
                    ))}
               </MapView>

               <View style={styles.searchContainer}>
                    <TextInput
                         placeholder="Search a location"
                         value={searchText}
                         onChangeText={setSearchText}
                         style={styles.searchInput}
                         returnKeyType="search"
                         onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                         <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
               </View>

               <TouchableOpacity onPress={handleLocateButtonPress} style={styles.locateButton}>
                    <Text style={styles.locateButtonText}>Locate Me</Text>
               </TouchableOpacity>

               {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
               {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     map: {
          flex: 1,
     },
     searchContainer: {
          position: 'absolute',
          top: 40,
          left: 10,
          right: 10,
          zIndex: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingHorizontal: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 5,
     },
     searchInput: {
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 8,
          fontSize: 16,
     },
     locateButton: {
          padding: 8,
          marginLeft: 5,
     },
     locateButtonText: {
          fontSize: 22,
     },
     filters: {
          position: 'absolute',
          top: 95,
          left: 10,
          right: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          zIndex: 10,
     },
     filterButton: {
          paddingVertical: 6,
          paddingHorizontal: 12,
          backgroundColor: '#ddd',
          borderRadius: 20,
     },
     activeFilter: {
          backgroundColor: '#90ee90',
     },
     filterText: {
          fontWeight: 'bold',
     },
     markerIcon: {
          width: 32,
          height: 32,
          resizeMode: 'contain',
     },
});