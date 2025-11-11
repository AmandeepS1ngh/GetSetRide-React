# 🚗 GetSetRide - Peer-to-Peer Car Rental Platform

<div align="center">

![GetSetRide](https://img.shields.io/badge/GetSetRide-Car%20Rental-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

**A modern, unified peer-to-peer car rental platform where users can both list their cars and book others' vehicles seamlessly.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**GetSetRide** is a modern peer-to-peer car rental platform that enables a unified user experience. Unlike traditional platforms with role-based restrictions, GetSetRide allows **all authenticated users** to:

- 🚙 **List their cars** for others to rent
- 📅 **Book cars** from other users
- 💰 **Manage earnings** from their listed vehicles
- 📊 **Track bookings** and rental history

No role upgrades, no restrictions - just seamless car sharing!

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- User registration and login
- Protected routes and endpoints
- Token-based session management

### 🚗 Car Management
- **List Your Cars**: Add cars with details, pricing, and images
- **Manage Listings**: Edit, activate/deactivate, or delete your cars
- **Real-time Stats**: View total cars, active listings, and bookings
- **Image Gallery**: Upload multiple images per car

### 📅 Booking System
- **Browse Marketplace**: Explore available cars with filters
- **Real-time Pricing**: Dynamic price calculation with service fees
- **Instant Booking**: Book cars with date validation
- **Booking Management**: Track all your bookings in one place
- **Owner Protection**: Prevents users from booking their own cars

### 💼 Dashboard Features
- **My Cars**: Manage all your listed vehicles
- **My Bookings**: View rental history and upcoming trips
- **Analytics**: Track earnings and booking statistics
- **Status Management**: Toggle car availability on/off

### 🎨 Modern UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Material-UI components
- Intuitive navigation
- Beautiful landing page
- Real-time updates

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **React Router DOM** 7.8.2 - Routing
- **Material-UI (MUI)** 7.3.2 - Component library
- **Emotion** - CSS-in-JS styling
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.0 - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

Verify installations:
```bash
node --version
npm --version
mongod --version
git --version
```

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/GetSetRide-in-react.git
cd GetSetRide-in-react
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following environment variables to `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/getsetride

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

> **⚠️ Important**: Change `JWT_SECRET` to a strong random string in production!

### Frontend Configuration (Optional)

The frontend is configured to use `http://localhost:5000` for the backend API. If you need to change this, update the API URLs in:
- `src/services/auth.js`
- `src/services/cars.js`
- `src/services/bookings.js`

---

## 🎮 Usage

### Option 1: Run Both Servers Simultaneously

Use the provided shell script:

```bash
chmod +x start.sh
./start.sh
```

### Option 2: Run Servers Separately

#### Terminal 1 - Start MongoDB (if not running as service)

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/your/data/db
```

#### Terminal 2 - Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on **http://localhost:5000**

#### Terminal 3 - Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on **http://localhost:5173**

### 🌐 Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Structure

```
GetSetRide-in-react/
├── backend/                      # Backend Node.js application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── database.js      # MongoDB connection
│   │   │   └── index.js         # Environment variables
│   │   ├── controllers/         # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── carController.js
│   │   │   └── bookingController.js
│   │   ├── middleware/          # Custom middleware
│   │   │   ├── auth.js          # JWT authentication
│   │   │   ├── errorHandler.js  # Error handling
│   │   │   └── validation.js    # Input validation
│   │   ├── models/              # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Car.js
│   │   │   └── Booking.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   ├── cars.js
│   │   │   ├── bookings.js
│   │   │   └── users.js
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── scripts/
│   │   └── seedCars.js          # Database seeding
│   ├── package.json
│   └── .env                     # Environment variables
│
├── src/                         # Frontend React application
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   └── Footer.jsx       # Footer component
│   │   └── marketplace/
│   │       └── CarCard.jsx      # Car listing card
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── LoginPage.jsx        # User login
│   │   ├── SignupPage.jsx       # User registration
│   │   ├── MarketplacePage_new.jsx  # Browse cars
│   │   ├── CarDetailPage.jsx    # Car details & booking
│   │   ├── AddCarPage.jsx       # List a new car
│   │   ├── MyCarsPage.jsx       # Manage your cars
│   │   ├── MyBookingsPage.jsx   # View bookings
│   │   └── ProfilePage.jsx      # User profile
│   ├── services/
│   │   ├── auth.js              # Authentication API calls
│   │   ├── cars.js              # Car API calls
│   │   └── bookings.js          # Booking API calls
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
│
├── public/                      # Static assets
│   └── images/
├── package.json                 # Frontend dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Car Endpoints

#### Get All Cars (Marketplace)
```http
GET /api/cars
```

#### Get User's Cars
```http
GET /api/cars/host/cars
Authorization: Bearer <token>
```

#### Create Car Listing
```http
POST /api/cars
Authorization: Bearer <token>
Content-Type: application/json

{
  "brand": "Toyota",
  "model": "Camry",
  "year": 2023,
  "pricePerDay": 50,
  "location": "New York, NY",
  "transmission": "automatic",
  "fuelType": "petrol",
  "seats": 5,
  "images": ["url1", "url2"]
}
```

#### Update Car
```http
PUT /api/cars/:id
Authorization: Bearer <token>
```

#### Delete Car
```http
DELETE /api/cars/:id
Authorization: Bearer <token>
```

#### Toggle Car Status
```http
PATCH /api/cars/:id/toggle-status
Authorization: Bearer <token>
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "car": "car_id",
  "startDate": "2025-11-10",
  "endDate": "2025-11-15"
}
```

#### Get User Bookings
```http
GET /api/bookings/user
Authorization: Bearer <token>
```

#### Get Host Bookings (Cars you own)
```http
GET /api/bookings/host
Authorization: Bearer <token>
```

---

## 🧪 Testing

### Test User Flow

1. **Register a new account**
   - Navigate to `/signup`
   - Create an account with email and password

2. **List a car**
   - Click "My Cars" in navigation
   - Click "Add New Car"
   - Fill in car details and submit

3. **Browse marketplace**
   - Click "Marketplace"
   - View all available cars

4. **Book a car**
   - Click on any car (not your own)
   - Select dates and click "Book Now"

5. **View bookings**
   - Click "My Bookings" to see your rentals

### Seed Sample Data

To populate the database with sample cars:

```bash
cd backend
node scripts/seedCars.js
```

---

## 🔑 Key Features Explained

### Unified User System
- **No Host Role**: Every user can list cars AND book cars
- **Seamless Experience**: One account, all features
- **Owner Verification**: Users can only edit their own cars
- **Self-Booking Prevention**: Can't book your own cars

### Security Features
- JWT authentication on all protected routes
- Password hashing with bcryptjs
- Owner verification in controllers
- Input validation on frontend and backend
- CORS protection

---

## 📚 Additional Documentation

For more detailed information, check out these guides:

- **[Complete Testing Guide](COMPLETE_TESTING_GUIDE.md)** - Step-by-step testing instructions
- **[Unified User System](UNIFIED_USER_SYSTEM_COMPLETE.md)** - System architecture overview
- **[API Documentation](backend/README.md)** - Detailed API reference
- **[Migration Guide](NO_HOST_ROLE_MIGRATION.md)** - Legacy to unified system migration

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: Backend won't start
```bash
# Solution: Check if MongoDB is running
mongosh
# Or start MongoDB service
brew services start mongodb-community
```

**Problem**: Frontend can't connect to backend
```bash
# Solution: Verify backend is running on port 5000
curl http://localhost:5000/api/cars
```

**Problem**: Authentication not working
```bash
# Solution: Clear browser localStorage
# Open browser console and run:
localStorage.clear()
```

**Problem**: Port already in use
```bash
# Solution: Kill process on port
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Authors

**Amandeep Singh**

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Material-UI for beautiful components
- MongoDB for the flexible database
- Express.js community

---

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

<div align="center">

**Made with ❤️ for car sharing enthusiasts**

⭐ Star this repo if you find it helpful!

</div>
