import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

// Geocode an address to coordinates
export const geocodeAddress = async (address) => {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        coordinates: [location.lng, location.lat],
        formattedAddress: response.data.results[0].formatted_address
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Get place details
export const getPlaceDetails = async (placeId) => {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Place Details error:', error);
    throw new Error('Failed to get place details');
  }
};

// Search for nearby places
export const searchNearbyPlaces = async (latitude, longitude, radius, type) => {
  try {
    const response = await client.placesNearby({
      params: {
        location: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        radius: parseInt(radius),
        type: type,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Places Nearby search error:', error);
    throw new Error('Failed to search nearby places');
  }
};

// Calculate distance between two points
export const calculateDistance = async (originLat, originLng, destLat, destLng) => {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [{ lat: parseFloat(originLat), lng: parseFloat(originLng) }],
        destinations: [{ lat: parseFloat(destLat), lng: parseFloat(destLng) }],
        key: process.env.GOOGLE_MAPS_API
      }
    });

    if (response.data.rows[0].elements[0].status === 'OK') {
      return {
        distance: response.data.rows[0].elements[0].distance,
        duration: response.data.rows[0].elements[0].duration
      };
    }
    throw new Error('Could not calculate distance');
  } catch (error) {
    console.error('Distance Matrix error:', error);
    throw new Error('Failed to calculate distance');
  }
}; 