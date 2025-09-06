# GetSetRide - Car Rental Platform

GetSetRide is a modern car rental platform that allows users to rent or list vehicles with ease.

## 🚀 Features

### General
- **Responsive Design**: Optimized for all screen sizes.
- **Modern UI**: Clean and user-friendly interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Pages
- **Home Page**: Hero section, "How it works", testimonials, and call-to-action.
- **Marketplace**: Search and filter cars, view car listings, and sort functionality.
- **Car Details**: Detailed car specifications, image gallery, and booking options.
- **Become a Host**: Multi-step form for listing vehicles with progress indicators and file uploads.
- **Login/Signup**: User authentication with form validation and Google sign-in integration.

### Functionality
- **Form Validation**: Ensures data integrity across all forms.
- **File Uploads**: Supports uploading documents and images.
- **State Management**: React hooks for managing form data and navigation.
- **Routing**: React Router for seamless navigation between pages.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Material Icons
- **Styling**: Tailwind CSS with custom properties for theme colors

## 📂 Project Structure
```
GetSetRide-in-react/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── marketplace/
│   │       └── CarCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MarketplacePage.jsx
│   │   ├── CarDetailPage.jsx
│   │   ├── BecomeHostPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/
│   │   └── auth.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── public/
    └── images/
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GetSetRide.git
   cd GetSetRide-in-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

### Build for Production
To create an optimized production build:
```bash
npm run build
```

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```



## 📧 Contact
For any inquiries, please contact amandeepsinghoff@gmail.com.

---
*Happy coding! 🚗*
