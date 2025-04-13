import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TextInput, Keyboard, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {
     navigation.setOptions({
          headerShown: false,
     });
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

     const animateToUserLocation = async (location) => {
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
                         { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
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

     const waterSources = [
          { id: 'lake1', name: 'Lake Tahoe', latitude: 39.0968, longitude: -120.0324 },
          { id: 'river1', name: 'Mississippi River', latitude: 35.1557, longitude: -90.0659 },
          { id: 'pond1', name: 'Walden Pond, Massachusetts', latitude: 42.4384, longitude: -71.3420 },
          { id: 'lake2', name: 'Lake Michigan', latitude: 43.4501, longitude: -87.2220 },
          { id: 'lake3', name: 'Lake Superior', latitude: 47.7000, longitude: -87.5000 },
          { id: 'river2', name: 'Colorado River', latitude: 36.1128, longitude: -113.9966 },
          { id: 'lake4', name: 'Crater Lake', latitude: 42.9446, longitude: -122.1090 },
          { id: 'pond2', name: 'Mirror Pond, Oregon', latitude: 44.0606, longitude: -121.3153 },
          { id: 'lake5', name: 'Lake George, New York', latitude: 43.4262, longitude: -73.7123 },
          { id: 'lake6', name: 'Lake Havasu', latitude: 34.4839, longitude: -114.3214 },
          { id: 'river3', name: 'Columbia River', latitude: 45.6413, longitude: -121.9139 },
          { id: 'pond3', name: 'Echo Park Lake, California', latitude: 34.0782, longitude: -118.2606 },
          { id: 'lake7', name: 'Flathead Lake, Montana', latitude: 47.8762, longitude: -114.0930 },
          { id: 'river4', name: 'Hudson River', latitude: 42.6500, longitude: -73.7572 },
          { id: 'lake8', name: 'Lake Lanier, Georgia', latitude: 34.2154, longitude: -83.9494 },
          { id: 'lake9', name: 'Lake Powell, Utah/Arizona', latitude: 37.0003, longitude: -111.4846 },
          { id: 'pond4', name: 'Stow Lake, San Francisco', latitude: 37.7684, longitude: -122.4825 },
          { id: 'river5', name: 'Snake River, Idaho', latitude: 43.5493, longitude: -112.4510 },
          { id: 'lake10', name: 'Lake Champlain, Vermont/New York', latitude: 44.6000, longitude: -73.3500 },
          { id: 'lake11', name: 'Lake Travis, Texas', latitude: 30.4057, longitude: -97.9209 },
          { id: 'lake12', name: 'Lake Kissimmee', latitude: 27.8785, longitude: -81.3020 },
          { id: 'river6', name: 'Peace River', latitude: 27.0231, longitude: -81.7957 },
          { id: 'lake13', name: 'Lake Istokpoga', latitude: 27.3135, longitude: -81.3364 },
          { id: 'pond5', name: 'Harmony Pond', latitude: 27.9725, longitude: -82.4193 },
          { id: 'lake14', name: 'Lake Jackson (Sebring)', latitude: 27.4815, longitude: -81.4513 },
          { id: 'lake15', name: 'Lake Tarpon', latitude: 28.1214, longitude: -82.7231 },
          { id: 'river7', name: 'Myakka River', latitude: 27.1435, longitude: -82.3644 },
          { id: 'lake16', name: 'Lake Okeechobee', latitude: 26.9387, longitude: -80.8022 },
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

     return (
          <View style={styles.container}>
               <View style={styles.searchContainer}>
                    <TextInput
                         style={styles.searchInput}
                         placeholder="Search a city..."
                         value={searchText}
                         onChangeText={setSearchText}
                         onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity style={styles.locateButton} onPress={handleLocateButtonPress}>
                         <Text style={styles.locateButtonText}>📍</Text>
                    </TouchableOpacity>
               </View>

               <View style={styles.filters}>
                    <TouchableOpacity
                         style={[styles.filterButton, activeFilters.includes('water') && styles.activeFilter]}
                         onPress={() => toggleFilter('water')}
                    >
                         <Text style={styles.filterText}>💧 Water</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={[styles.filterButton, activeFilters.includes('radiation') && styles.activeFilter]}
                         onPress={() => toggleFilter('radiation')}
                    >
                         <Text style={styles.filterText}>☢️ Radiation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={[styles.filterButton, activeFilters.includes('farming') && styles.activeFilter]}
                         onPress={() => toggleFilter('farming')}
                    >
                         <Text style={styles.filterText}>🌱 Farming</Text>
                    </TouchableOpacity>
               </View>

               <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={mapRegion}
                    onRegionChangeComplete={(region) => setMapRegion(region)}
               >
                    {userLocation && (
                         <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
                              <Image source={require('../../assets/images/pin.png')} style={styles.markerIcon} />
                         </Marker>
                    )}

                    {activeFilters.includes('water') &&
                         waterSources.map((source) => (
                              <Marker key={source.id} coordinate={{ latitude: source.latitude, longitude: source.longitude }}>
                                   <Image source={require('../../assets/images/wata.png')} style={styles.markerIcon} />
                              </Marker>
                         ))}
                    {activeFilters.includes('radiation') &&
                         radiationZones.map((zone) => (
                              <Marker key={zone.id} coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}>
                                   <Image source={require('../../assets/images/nuke.png')} style={styles.markerIcon} />
                              </Marker>
                         ))}
                    {activeFilters.includes('farming') &&
                         farmingZones.map((zone) => (
                              <Marker key={zone.id} coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}>
                                   <Image source={require('../../assets/images/farm-land.png')} style={styles.markerIcon} />
                              </Marker>
                         ))}
               </MapView>
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
          top: 60,
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
          top: 115,
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
