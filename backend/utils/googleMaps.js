const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

// Geocode an address to coordinates
async function geocodeAddress(address) {
  try {
    const response = await client.geocode({
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        coordinates: [location.lng, location.lat],
        formattedAddress: response.data.results[0].formatted_address,
        placeId: response.data.results[0].place_id
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

// Get place details
async function getPlaceDetails(placeId) {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Place details error:', error);
    throw error;
  }
}

// Search for nearby places
async function searchNearbyPlaces(latitude, longitude, radius, type) {
  try {
    const response = await client.placesNearby({
      params: {
        location: { lat: latitude, lng: longitude },
        radius: radius || 1000, // Default 1km radius
        type: type || undefined,
        key: process.env.GOOGLE_MAPS_API
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Nearby search error:', error);
    throw error;
  }
}

// Calculate distance between two points
async function calculateDistance(originLat, originLng, destLat, destLng) {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [{ lat: originLat, lng: originLng }],
        destinations: [{ lat: destLat, lng: destLng }],
        key: process.env.GOOGLE_MAPS_API
      }
    });

    return response.data.rows[0].elements[0];
  } catch (error) {
    console.error('Distance matrix error:', error);
    throw error;
  }
}

module.exports = {
  geocodeAddress,
  getPlaceDetails,
  searchNearbyPlaces,
  calculateDistance
}; 