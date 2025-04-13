# Neo-Eden

A comprehensive resource mapping and community engagement platform that combines AI-powered analysis, location-based services, and real-time updates.

## Features

- **Resource Mapping**
  - Interactive map interface for resource visualization
  - Location-based resource discovery
  - Real-time resource status updates
  - Resource categorization and filtering

- **AI Integration**
  - Image analysis using Google's Gemini AI
  - Resource classification and recommendations
  - Intelligent insights generation
  - Visual data processing

- **Location Services**
  - Real-time location tracking
  - Nearby resource discovery
  - Base location management
  - Customizable search radius

- **News & Updates**
  - Location-based news feed
  - Community updates and announcements
  - Real-time notifications
  - News categorization

- **Camera & Media**
  - In-app photo capture
  - Image gallery integration
  - Location tagging for media
  - AI-powered image analysis

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify authentication token

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create a new resource
- `GET /api/resources/:id` - Get resource details
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource
- `GET /api/resources/nearby` - Get nearby resources

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/:id/location` - Update user location
- `GET /api/users/:id/location/history` - Get location history
- `POST /api/users/:id/base-location` - Set base location
- `POST /api/users/:id/search-radius` - Update search radius

### Analysis
- `GET /api/analysis/resources` - Get resource analysis
- `GET /api/analysis/trends` - Get trend analysis
- `POST /api/analysis/report` - Generate custom report

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create news article
- `GET /api/news/:id` - Get specific article
- `PUT /api/news/:id` - Update article
- `DELETE /api/news/:id` - Delete article
- `GET /api/news/nearby` - Get nearby news

### Camera & Media
- `POST /api/camera/upload` - Upload media with location
- `GET /api/camera/nearby` - Get nearby media

### AI Services
- `POST /api/gemini` - Process image with Gemini AI

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Expo CLI (for mobile app)
- Google Cloud account (for Gemini AI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neo-eden.git
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables:
   ```bash
   # Backend .env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000

   # Frontend .env
   API_URL=http://localhost:5000
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npx expo start
   ```

## Mobile App Features

- Interactive map interface
- Real-time location tracking
- Camera integration with AI analysis
- Resource management
- News feed
- User profile management
- Location-based services

## Tech Stack

- **Backend**
  - Node.js & Express
  - MongoDB & Mongoose
  - JWT Authentication
  - Google Gemini AI

- **Frontend**
  - React Native
  - Expo
  - React Navigation
  - React Native Maps
  - Expo Camera
  - Axios

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