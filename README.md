# SDC Registration Portal

A professional web application for the Software Development Club (SDC) registration system. Built with React, Firebase Authentication, and Realtime Database.

## 🚀 Live Demo

**[Click here to view the application](https://sdc-registration-app.vercel.app)**

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Authentication, Realtime Database)
- **Deployment**: Vercel
- **AI Assistant**: Built-in chatbot with comprehensive SDC knowledge

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm package manager
- Firebase account and project

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/itzz-ankitp/sdc-registration-app.git
cd sdc-registration-app
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
VITE_FIREBASE_DATABASE_URL="your_realtime_database_url"

# Gemini AI API Key (for chatbot)
GEMINI_API_KEY="your_gemini_api_key"
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Realtime Database
4. Set up security rules for the database

### 4. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
sdc-registration-app/
├── functions/              # Firebase Cloud Functions
│   ├── index.js           # Backend functions (chatbot, health check)
│   ├── package.json
│   └── package-lock.json
├── src/                    # Source code
│   ├── App.jsx             # Main app component with routing
│   ├── assets/             # Static assets (images, logos)
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── About.jsx       # About SDC page
│   │   ├── Admin.jsx       # Admin authentication
│   │   ├── AdminDashboard.jsx # Admin user management
│   │   ├── Auth.jsx        # Combined sign-in/sign-up with transitions
│   │   ├── Chatbot.jsx     # AI-powered SDC assistant
│   │   ├── Contact.jsx     # Project submission and contact form
│   │   ├── Dashboard.jsx   # User dashboard and track selection
│   │   ├── LoadingSpinner.jsx # Loading states
│   │   ├── Profile.jsx     # User profile management
│   │   ├── Tasks.jsx       # Development track tasks
│   │   ├── Timeline.jsx    # Registration progress timeline
│   │   ├── UserTasks.jsx   # User-specific task view
│   │   └── ...             # Other components
│   ├── firebase.js         # Firebase configuration
│   ├── hooks/              # Custom React hooks
│   ├── index.css           # Tailwind and custom styles
│   ├── lib/                # Utility functions
│   └── main.jsx            # Entry point
├── admin-data.json         # Admin data/config
├── components.json         # shadcn/ui config
├── database.rules.json     # Firebase Realtime DB rules
├── eslint.config.js        # ESLint config
├── firebase.json           # Firebase project config
├── index.html              # Main HTML file (Vite entry)
├── jsconfig.json           # JS tooling config
├── package.json            # Project dependencies
├── README.md               # Project documentation
├── vercel.json             # Vercel deployment config
└── vite.config.js          # Vite config
```

## 🎯 Features

### **User Features:**
- **User Registration & Authentication**: Secure signup/login with Firebase Auth
- **Development Track Selection**: Choose from Android, Web, ML, or Game Dev tracks
- **Track Management**: Change tracks multiple times before project submission
- **Task Management**: View and complete tasks based on selected track
- **Progress Tracking**: Timeline showing registration progress
- **Profile Management**: View and edit user profile information
- **Project Submission**: Submit GitHub links and project descriptions (ONE TIME ONLY)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### **Admin Features:**
- **Admin Dashboard**: Manage users, view statistics, and review submissions
- **User Management**: View all registered users and their details
- **Submission Review**: Mark submissions as reviewed and graded
- **Progress Monitoring**: Track overall registration progress
- **Statistics**: Real-time user counts and track distributions

### **AI Assistant:**
- **Built-in Chatbot**: Comprehensive SDC knowledge and assistance
- **Instant Responses**: No external API dependencies
- **Smart Queries**: Understands registration, tracks, tasks, and policies
- **Always Available**: Floating widget accessible on all pages

## 🔒 Important Rules & Policies

### **Project Submission:**
- **ONE SUBMISSION PER USER**: Users can submit their project only once per account
- **Track Locking**: Track selection becomes permanently locked after project submission
- **No Modifications**: Project details cannot be changed after submission
- **Contact for Changes**: Use Contact Us form for questions or modification requests

### **Track Selection:**
- **Flexible Before Submission**: Change tracks multiple times before submitting
- **Permanent After Submission**: Track cannot be changed once project is submitted
- **Choose Wisely**: Select your track carefully before final submission

### **Development Tracks:**
1. **Android Development**: Mobile app development using Android Studio, Kotlin/Java
2. **Web Development**: Full-stack web applications using React, Node.js, Firebase
3. **Machine Learning**: AI/ML projects, data analysis, model development
4. **Game Development**: Game creation using Unity, Pygame, or other frameworks

## 🎨 Modern UI/UX

- **Glass Morphism Design**: Semi-transparent cards with backdrop blur effects
- **Animated Transitions**: Smooth sliding transitions between sign-in and sign-up forms
- **Geometric Backgrounds**: Dynamic animated backgrounds for visual appeal
- **Dark Theme**: Modern dark theme with purple accent colors
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Custom Scrollbars**: Styled scrollbars matching the theme

## 🔄 Usage Workflow

### **For Students:**
1. **Register**: Create account with student details
2. **Select Track**: Choose development track (Android/Web/ML/Game Dev)
3. **Change Track**: Modify selection multiple times before submission
4. **Complete Tasks**: View and complete assigned tasks for chosen track
5. **Submit Project**: Upload GitHub link and project description (ONE TIME ONLY)
6. **Track Progress**: Monitor timeline and submission status
7. **Get Help**: Use built-in AI chatbot for assistance

### **For Admins:**
1. **Access Admin Dashboard**: Use admin credentials
2. **View Statistics**: See user counts and track distributions
3. **Manage Users**: View all registered users and their details
4. **Review Submissions**: Mark submissions as reviewed and graded
5. **Monitor Progress**: Track overall registration progress

## 🤖 AI Chatbot Assistant

The built-in chatbot provides instant assistance with:
- **Registration Process**: Step-by-step guidance
- **Track Information**: Detailed descriptions of each development track
- **Task Requirements**: Specific requirements for each track
- **Submission Rules**: Clear explanation of submission policies
- **Track Change Policy**: Information about track selection flexibility
- **General SDC Info**: Club activities, roles, and contact information

**Access**: Floating robot button on bottom-right corner of all pages

## 🔐 Admin Access

For admin credentials and access, please contact: **itsme.ankit2006@gmail.com**

## 🚀 Deployment

### **Vercel Deployment**

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

### **Environment Variables**

Ensure all required environment variables are set in Vercel:
- Firebase configuration variables
- Gemini AI API key for chatbot functionality

## 📞 Support

For support and questions:
- **AI Chatbot**: Use the built-in assistant on any page
- **Contact Form**: Fill out the Contact Us form
- **Email**: itsme.ankit2006@gmail.com
- **GitHub**: [itzz-ankitp/sdc-registration-app](https://github.com/itzz-ankitp/sdc-registration-app)

## 🔧 Development

### **Adding New Features:**
1. Create component in `src/components/`
2. Add route in `src/App.jsx`
3. Update navigation and routing as needed
4. Test on multiple devices and screen sizes

### **Updating Chatbot Knowledge:**
1. Modify `sdcKnowledge` object in `src/components/Chatbot.jsx`
2. Add new response patterns in `generateResponse` function
3. Test with various user queries

### **Styling Updates:**
1. Modify `src/index.css` for global styles
2. Update component-specific styles using Tailwind classes
3. Maintain consistency with existing glass morphism design

---

**Built with ❤️ by Piratla Ankit Rama Datt**

**Last Updated**: December 2024  
**Version**: 2.0.0  
**Status**: Production Ready

