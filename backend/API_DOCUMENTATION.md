# NeoEden API Documentation

## Base URL
```http
http://localhost:5000/api
```

## Project Structure
The API is organized using the MVC (Model-View-Controller) pattern:

### Controllers
- `resource`: Handles resource-related operations (CRUD, voting, verification)
- `analysis`: Manages analysis operations (creation, retrieval, updates)
- `user`: Handles user operations (auth, profile, location)

### Routes
- `/api/resources`: Resource management endpoints
- `/api/analysis`: Analysis-related endpoints
- `/api/users`: User management endpoints

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

## Users

### Register User
```http
POST /users/register
```
Body Parameters:
- `username` (required): Unique username
- `email` (required): Unique email address
- `password` (required): User password
- `firstName`: User's first name
- `lastName`: User's last name

Response: Created user object

### Login User
```http
POST /users/login
```
Body Parameters:
- `email` (required): User's email
- `password` (required): User's password

Response: User object with authentication details

### Get User Profile
```http
GET /users/profile/:id
```
Response: User profile information

### Update User Profile
```http
PUT /users/profile/:id
```
Body Parameters:
- `username`: Updated username
- `email`: Updated email
- `password`: New password
- `firstName`: Updated first name
- `lastName`: Updated last name

Response: Updated user object

### Update User Location
```http
POST /users/:id/location
```
Body Parameters:
- `longitude` (required): Current longitude
- `latitude` (required): Current latitude

Response: Updated user object

### Get User Location History
```http
GET /users/:id/location/history
```
Response: Array of user's location history

### Update Base Location
```http
POST /users/:id/base-location
```
Body Parameters:
- `longitude` (required): Base location longitude
- `latitude` (required): Base location latitude

Response: Updated user object

### Get Nearby Users
```http
GET /users/nearby
```
Query Parameters:
- `longitude` (required): Center point longitude
- `latitude` (required): Center point latitude
- `radius` (optional): Search radius in meters (default: 5000)

Response: Array of nearby users

### Update Search Radius
```http
POST /users/:id/search-radius
```
Body Parameters:
- `radius` (required): Preferred search radius in meters (100-50000)

Response: Updated user object

## Data Types

### Resource Types
- `WATER`: Fresh water sources
- `FARMLAND`: Arable land
- `SHELTER`: Safe shelter locations
- `MEDICAL`: Medical supplies/facilities
- `FOOD`: Food sources
- `DANGER`: Dangerous areas
- `RADIATION`: Radiation zones
- `POI`: Point of Interest
- `LANDMARK`: Notable landmarks

### Analysis Types
- `PLANT`: Plant identification and analysis
- `SOIL`: Soil quality assessment
- `WATER`: Water safety analysis
- `INSECT`: Insect identification
- `TRACKS`: Animal track analysis
- `CAMPSITE`: Campsite safety evaluation

### Zone Types
- `SAFE`
- `NEUTRAL`
- `DANGER`
- `PVP`
- `EVENT`

### Marker Types
- `DEFAULT`
- `QUEST`
- `VENDOR`
- `ENEMY`
- `RESOURCE`
- `SAFE_ZONE`
- `DANGER_ZONE`

### Status Types
- `ACTIVE`
- `UNVERIFIED`
- `DEPLETED`
- `DANGEROUS` 