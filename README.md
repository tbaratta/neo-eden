# NeoEden: Post-Apocalyptic Resource Mapping System

NeoEden is a resource mapping system designed for post-apocalyptic scenarios, helping communities track and analyze vital resources like water sources, farmland, safe shelters, and more. The system includes AI-powered analysis of environmental elements and community-driven resource verification.

## Features

- **Resource Tracking**
  - Water sources
  - Arable land
  - Safe shelters
  - Medical supplies
  - Food sources
  - Danger zones
  - Radiation areas

- **AI-Powered Analysis**
  - Plant identification
  - Soil quality assessment
  - Water safety analysis
  - Insect identification
  - Animal track analysis
  - Campsite evaluation

- **Community Features**
  - Resource verification system
  - Reliability scoring
  - User contributions
  - Safety status updates

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Google Maps API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Google Maps API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/neo-eden.git
cd neo-eden
```

2. Install dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/eden-finder

# Optional: Set NODE_ENV
NODE_ENV=development

# Google Maps API Key
GOOGLE_MAPS_API=your_google_maps_api_key
```

4. Start the server:
```bash
npm start
```

## API Documentation

### Resources

#### Get All Resources
```http
GET /api/resources
```
Query Parameters:
- `type` (optional): Filter by resource type
- `status` (optional): Filter by status
- `reliability` (optional): Filter by minimum reliability score

#### Get Nearby Resources
```http
GET /api/resources/nearby
```
Query Parameters:
- `longitude` (required): Center point longitude
- `latitude` (required): Center point latitude
- `radius` (optional): Search radius in meters (default: 5000)

#### Create Resource
```http
POST /api/resources
```
Body Parameters:
- `name` (required): Resource name
- `description`: Resource description
- `longitude` & `latitude`: Coordinates
- `resourceType` (required): Type of resource
- `status`: Resource status

### Analysis

#### Create Analysis
```http
POST /api/analysis
```
Body Parameters:
- `type` (required): Analysis type (PLANT, SOIL, etc.)
- `imageUrl` (required): URL of the analyzed image
- `longitude` & `latitude`: Location coordinates
- `results`: Analysis results

#### Get Analyses by Type
```http
GET /api/analysis?type=PLANT
```

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

### Status Types
- `ACTIVE`: Verified and available
- `UNVERIFIED`: Newly reported
- `DEPLETED`: No longer available
- `DANGEROUS`: Unsafe to access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Maps Platform for geolocation services
- MongoDB Atlas for database hosting
- Express.js community for the excellent framework