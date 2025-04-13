import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TextInput, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location'; // npx expo install expo-location

const MapScreen = ({ navigation }) => {
     const mapRef = useRef(null);
     const [searchText, setSearchText] = useState('');
     const [userLocation, setUserLocation] = useState(null);
     const [loading, setLoading] = useState(true);
     const [errorMsg, setErrorMsg] = useState(null);
     const [region, setRegion] = useState({
          latitude: 39.8283,
          longitude: -98.5795,
          latitudeDelta: 60,
          longitudeDelta: 60,
     });

     // Function to animate to user location
     const animateToUserLocation = async (location) => {
          if (mapRef.current && location) {
               // First, ensure we're zoomed out
               const zoomedOutRegion = {
                    latitude: 39.8283,
                    longitude: -98.5795,
                    latitudeDelta: 60,
                    longitudeDelta: 60,
               };
               
               setRegion(zoomedOutRegion);
               mapRef.current.animateToRegion(zoomedOutRegion, 10);

               // Wait for 1.5 seconds before starting zoom in
               await new Promise(resolve => setTimeout(resolve, 500));

               // Then animate to user's location
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
                         return;
                    }

                    const location = await Location.getCurrentPositionAsync({});
                    const userLoc = {
                         latitude: location.coords.latitude,
                         longitude: location.coords.longitude,
                    };
                    setUserLocation(userLoc);
                    
                    // Wait for map to be ready
                    setTimeout(() => {
                         animateToUserLocation(userLoc);
                    }, 500);
               } catch (error) {
                    console.error('Error getting location:', error);
                    setErrorMsg('Error getting location');
               } finally {
                    setLoading(false);
               }
          })();
     }, []);

     const freshWaterSources = [
          { id: 'lake1', name: 'Lake Okeechobee', latitude: 26.9387, longitude: -80.8022 },
          { id: 'river1', name: 'Caloosahatchee River', latitude: 26.6426, longitude: -81.8723 },
          { id: 'pond1', name: 'Pond Cypress', latitude: 26.2820, longitude: -81.5806 },
          { id: 'lake2', name: 'Lake Tohopekaliga', latitude: 28.2485, longitude: -81.4069 },
          { id: 'lake3', name: 'Lake Kissimmee', latitude: 27.8785, longitude: -81.3020 },
          { id: 'river2', name: 'Peace River', latitude: 27.0231, longitude: -81.7957 },
          { id: 'lake4', name: 'Lake Istokpoga', latitude: 27.3135, longitude: -81.3364 },
          { id: 'pond2', name: 'Harmony Pond', latitude: 27.9725, longitude: -82.4193 },
          { id: 'lake5', name: 'Lake Jackson (Sebring)', latitude: 27.4815, longitude: -81.4513 },
          { id: 'lake6', name: 'Lake Tarpon', latitude: 28.1214, longitude: -82.7231 },
          { id: 'river3', name: 'Myakka River', latitude: 27.1435, longitude: -82.3644 },
          { id: 'pond3', name: 'Otter Pond', latitude: 26.6879, longitude: -81.8441 },
          { id: 'lake7', name: 'Lake Manatee', latitude: 27.4703, longitude: -82.2850 },
          { id: 'river4', name: 'Loxahatchee River', latitude: 26.9632, longitude: -80.1411 },
          { id: 'lake8', name: 'Lake Apopka', latitude: 28.6253, longitude: -81.6420 },
          { id: 'lake9', name: 'Blue Cypress Lake', latitude: 27.7356, longitude: -80.6992 },
          { id: 'pond4', name: 'Cypress Pond', latitude: 28.0063, longitude: -82.4786 },
          { id: 'river5', name: 'Withlacoochee River', latitude: 28.7795, longitude: -82.2672 },
          { id: 'lake10', name: 'Lake Weohyakapka', latitude: 27.7681, longitude: -81.3144 },
          { id: 'lake11', name: 'Lake Hollingsworth', latitude: 28.0284, longitude: -81.9462 },
     ];

     const radiationZones = [
          { id: 'zone1', name: 'Downtown Manhattan', latitude: 40.7128, longitude: -74.0060 },
          { id: 'zone2', name: 'Washington D.C.', latitude: 38.9072, longitude: -77.0369 },
          { id: 'zone3', name: 'Los Angeles Core', latitude: 34.0522, longitude: -118.2437 },
          { id: 'zone4', name: 'Chicago Loop', latitude: 41.8781, longitude: -87.6298 },
          { id: 'zone5', name: 'San Francisco District', latitude: 37.7749, longitude: -122.4194 },
          { id: 'zone6', name: 'Pentagon Area', latitude: 38.8719, longitude: -77.0563 },
          { id: 'zone7', name: 'Houston Belt', latitude: 29.7604, longitude: -95.3698 },
          { id: 'zone8', name: 'Boston Central', latitude: 42.3601, longitude: -71.0589 },
          { id: 'zone9', name: 'Seattle Downtown', latitude: 47.6062, longitude: -122.3321 },
          { id: 'zone10', name: 'Atlanta Core', latitude: 33.7490, longitude: -84.3880 },
          { id: 'zone11', name: 'Philly Center', latitude: 39.9526, longitude: -75.1652 },
          { id: 'zone12', name: 'Denver Urban Zone', latitude: 39.7392, longitude: -104.9903 },
          { id: 'zone13', name: 'Miami Center', latitude: 25.7617, longitude: -80.1918 },
          { id: 'zone14', name: 'St. Louis Industry', latitude: 38.6270, longitude: -90.1994 },
          { id: 'zone15', name: 'Minneapolis Zone', latitude: 44.9778, longitude: -93.2650 },
          { id: 'zone16', name: 'Phoenix Core', latitude: 33.4484, longitude: -112.0740 },
          { id: 'zone17', name: 'Las Vegas Strip', latitude: 36.1699, longitude: -115.1398 },
          { id: 'zone18', name: 'Detroit Downtown', latitude: 42.3314, longitude: -83.0458 },
          { id: 'zone19', name: 'Portland District', latitude: 45.5152, longitude: -122.6784 },
          { id: 'zone20', name: 'Anchorage Port', latitude: 61.2181, longitude: -149.9003 },
     ];

     const farmingZones = [
          { id: 'farm1', name: 'Central Valley, California', latitude: 36.7783, longitude: -119.4179 },
          { id: 'farm2', name: 'Willamette Valley, Oregon', latitude: 44.9429, longitude: -123.0351 },
          { id: 'farm3', name: 'Red River Valley, North Dakota', latitude: 47.0000, longitude: -97.0000 },
          { id: 'farm4', name: 'San Joaquin Valley, California', latitude: 36.6002, longitude: -120.4000 },
          { id: 'farm5', name: 'Imperial Valley, California', latitude: 32.8355, longitude: -115.3790 },
          { id: 'farm6', name: 'Yakima Valley, Washington', latitude: 46.6021, longitude: -120.5059 },
          { id: 'farm7', name: 'Palouse Region, Washington', latitude: 46.7298, longitude: -117.1817 },
          { id: 'farm8', name: 'Great Black Swamp, Ohio', latitude: 41.6267, longitude: -83.7121 },
          { id: 'farm9', name: 'Eastern Iowa Corn Belt', latitude: 41.8780, longitude: -91.5970 },
          { id: 'farm10', name: 'Illinois Corn Belt', latitude: 40.6331, longitude: -89.3985 },
          { id: 'farm11', name: 'Thumb Region, Michigan', latitude: 43.6232, longitude: -83.8897 },
          { id: 'farm12', name: 'Bluegrass Region, Kentucky', latitude: 38.0406, longitude: -84.5037 },
          { id: 'farm13', name: 'Mississippi Delta, Arkansas', latitude: 34.7465, longitude: -92.2896 },
          { id: 'farm14', name: 'Piedmont Region, Georgia', latitude: 33.7490, longitude: -84.3880 },
          { id: 'farm15', name: 'San Luis Valley, Colorado', latitude: 37.6655, longitude: -106.0836 },
          { id: 'farm16', name: 'Snake River Plain, Idaho', latitude: 43.5263, longitude: -112.3531 },
          { id: 'farm17', name: 'Texas High Plains', latitude: 34.2000, longitude: -101.8333 },
          { id: 'farm18', name: 'Central Florida Ridge', latitude: 28.2280, longitude: -81.5158 },
          { id: 'farm19', name: 'Tulare County, California', latitude: 36.2168, longitude: -119.3490 },
          { id: 'farm20', name: 'Lancaster County, Pennsylvania', latitude: 40.0379, longitude: -76.3055 },
     ];

     if (loading) {
          return (
               <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
               </View>
          );
     }

     if (errorMsg) {
          return (
               <View style={styles.container}>
                    <Text>{errorMsg}</Text>
               </View>
          );
     }

     return (
          <View style={styles.container}>
               <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
               <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search locations..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
               />
               <View style={styles.content}>
                    {userLocation ? (
                         <MapView
                              ref={mapRef}
                              style={styles.map}
                              initialRegion={region}
                              onMapReady={() => {
                                   console.log('Map is ready');
                              }}
                         >
                              <Marker
                                   coordinate={{
                                        latitude: userLocation.latitude,
                                        longitude: userLocation.longitude,
                                   }}
                                   title="You are here"
                              >
                                   <Image
                                        source={require('../../assets/images/pin.png')}
                                        style={styles.userMarker}
                                   />
                              </Marker>

                              {freshWaterSources.map((source) => (
                                   <Marker key={source.id} coordinate={{ latitude: source.latitude, longitude: source.longitude }} title={source.name}>
                                        <Image source={require('../../assets/images/wata.png')} style={styles.markerImage} />
                                   </Marker>
                              ))}

                              {radiationZones.map((zone) => (
                                   <Marker key={zone.id} coordinate={{ latitude: zone.latitude, longitude: zone.longitude }} title={zone.name}>
                                        <Image source={require('../../assets/images/nuke.png')} style={styles.radiationMarker} />
                                   </Marker>
                              ))}

                              {farmingZones.map((zone) => (
                                   <Marker key={zone.id} coordinate={{ latitude: zone.latitude, longitude: zone.longitude }} title={zone.name}>
                                        <Image source={require('../../assets/images/farm-land.png')} style={styles.farmMarker} />
                                   </Marker>
                              ))}
                         </MapView>
                    ) : (
                         <View style={styles.container}>
                              <Text>Waiting for location...</Text>
                         </View>
                    )}
               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#4A4522',
     },
     logo: { width: 150, height: 40, resizeMode: 'contain', alignSelf: 'center', marginTop: 60, marginBottom: 20 },
     searchInput: { backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 10, marginHorizontal: 20, marginBottom: 20, fontSize: 16 },
     content: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
     map: { width: '100%', height: '100%' },
     markerImage: { width: 30, height: 30, resizeMode: 'contain' },
     radiationMarker: { width: 30, height: 30, resizeMode: 'contain' },
     farmMarker: { width: 30, height: 30, resizeMode: 'contain' },
     userMarker: { width: 35, height: 35, resizeMode: 'contain' },
});

export default MapScreen;