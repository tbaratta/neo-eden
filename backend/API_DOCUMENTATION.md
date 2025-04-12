# NeoEden API Documentation

## Base URL
```
http://localhost:5000/api
```

## Resources

### Get All Resources
```http
GET /resources
```
Query Parameters:
- `type` (optional): Filter by resource type (WATER, FARMLAND, SHELTER, etc.)
- `status` (optional): Filter by status (ACTIVE, UNVERIFIED, DEPLETED, DANGEROUS)
- `reliability` (optional): Filter by minimum reliability score (0-100)

Response: Array of resources sorted by reliability and update date

### Get Nearby Resources
```http
GET /resources/nearby
```
Query Parameters:
- `longitude` (required): Center point longitude
- `latitude` (required): Center point latitude
- `radius` (optional): Search radius in meters (default: 5000)
- `type` (optional): Filter by resource type

Response: Array of resources within the specified radius

### Get Resources in Bounds
```http
GET /resources/bounds
```
Query Parameters:
- `swLng` (required): Southwest corner longitude
- `swLat` (required): Southwest corner latitude
- `neLng` (required): Northeast corner longitude
- `neLat` (required): Northeast corner latitude
- `resourceType` (optional): Filter by resource type
- `zone` (optional): Filter by zone type
- `markerType` (optional): Filter by marker type

Response: Array of resources within the bounding box

### Create Resource
```http
POST /resources
```
Body Parameters:
- `name` (required): Resource name
- `description`: Resource description
- Either:
  - `address`: Address to geocode
  - OR `longitude` & `latitude`: Coordinates
- `resourceType` (required): Type of resource
- `markerType`: Marker type (default: 'DEFAULT')
- `zone`: Zone type (default: 'NEUTRAL')
- `zoneColor`: Zone color
- `status`: Resource status
- `analysis`: Analysis data
- `seasonality`: Seasonal information
- `userId`: Creator's ID

Response: Created resource object

### Get Resource by ID
```http
GET /resources/:id
```
Response: Single resource object

### Update Resource
```http
PUT /resources/:id
```
Body Parameters: Same as Create Resource

Response: Updated resource object

### Delete Resource
```http
DELETE /resources/:id
```
Response: Success message

### Vote on Resource
```http
POST /resources/:id/vote
```
Body Parameters:
- `voteType` (required): Either 'upvote' or 'downvote'

Response: Updated resource with new vote counts

### Update Resource Status
```http
PATCH /resources/:id/status
```
Body Parameters:
- `status` (required): New status value

Response: Updated resource object

### Verify Resource
```http
POST /resources/:id/verify
```
Body Parameters:
- `userId` (required): ID of verifying user

Response: Updated resource object (status changes to 'ACTIVE' after 3 verifications)

### Google Maps Integration

#### Search Nearby Places
```http
GET /resources/google/nearby
```
Query Parameters:
- `latitude` (required): Center point latitude
- `longitude` (required): Center point longitude
- `radius` (required): Search radius
- `type` (optional): Place type

Response: Array of nearby places from Google Maps

#### Get Place Details
```http
GET /resources/google/place/:placeId
```
Response: Detailed information about a specific place

#### Calculate Distance
```http
GET /resources/distance
```
Query Parameters:
- `originLat`: Starting point latitude
- `originLng`: Starting point longitude
- `destLat`: Destination latitude
- `destLng`: Destination longitude

Response: Distance information

## Analysis

### Create Analysis
```http
POST /analysis
```
Body Parameters:
- `type` (required): Analysis type (PLANT, SOIL, WATER, etc.)
- `imageUrl` (required): URL of the analyzed image
- `longitude` & `latitude`: Location coordinates
- `results`: Analysis results
- `aiResponse`: AI-generated response
- `userId`: Creator's ID
- `resourceId`: Related resource ID

Response: Created analysis object

### Get All Analyses
```http
GET /analysis
```
Query Parameters:
- `type` (optional): Filter by analysis type
- `resourceId` (optional): Filter by related resource

Response: Array of analyses with populated creator and resource information

### Get Nearby Analyses
```http
GET /analysis/nearby
```
Query Parameters:
- `longitude` (required): Center point longitude
- `latitude` (required): Center point latitude
- `radius` (optional): Search radius in meters (default: 5000)
- `type` (optional): Filter by analysis type

Response: Array of nearby analyses

### Get Analysis by ID
```http
GET /analysis/:id
```
Response: Single analysis object with populated creator and resource information

### Update Analysis
```http
PUT /analysis/:id
```
Body Parameters:
- `type`: Analysis type
- `results`: Updated results
- `aiResponse`: Updated AI response
- `longitude` & `latitude`: Updated location

Response: Updated analysis object

### Delete Analysis
```http
DELETE /analysis/:id
```
Response: Success message

## Resource Types
- `WATER`: Fresh water sources
- `FARMLAND`: Arable land
- `SHELTER`: Safe shelter locations
- `MEDICAL`: Medical supplies/facilities
- `FOOD`: Food sources
- `DANGER`: Dangerous areas
- `RADIATION`: Radiation zones
- `POI`: Point of Interest
- `LANDMARK`: Notable landmarks

## Zone Types
- `SAFE`
- `NEUTRAL`
- `DANGER`
- `PVP`
- `EVENT`

## Marker Types
- `DEFAULT`
- `QUEST`
- `VENDOR`
- `ENEMY`
- `RESOURCE`
- `SAFE_ZONE`
- `DANGER_ZONE`

## Analysis Types
- `PLANT`
- `SOIL`
- `WATER`
- `INSECT`
- `TRACKS`
- `CAMPSITE`

## Status Types
- `ACTIVE`
- `UNVERIFIED`
- `DEPLETED`
- `DANGEROUS` 