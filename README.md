# SDC Registration Portal

A professional web application for the Software Development Club (SDC) registration system. Built with React, Firebase Authentication, and Realtime Database.

## 🚀 Live Demo

**[Click here to view the live application](https://sdc-registration-app.vercel.app)**

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Authentication, Realtime Database)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- pnpm (recommended) or npm
- Firebase account and project

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/itzz-ankitp/sdc-registration-app.git
cd sdc-registration-app
pnpm install
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
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Realtime Database
4. Set up security rules for the database

### 4. Development Server

```bash
pnpm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
sdc-registration-app/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration form
│   │   ├── Dashboard.jsx   # User dashboard
│   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   ├── Timeline.jsx    # Registration timeline
│   │   ├── Contact.jsx     # Contact form
│   │   ├── About.jsx       # About page
│   │   ├── Profile.jsx     # User profile
│   │   └── UserTasks.jsx   # User tasks
│   ├── assets/             # Static assets (images, logos)
│   ├── firebase.js         # Firebase configuration
│   ├── App.jsx            # Main app component
│   ├── App.css            # Custom styles
│   └── main.jsx           # Entry point
├── public/                # Public assets
├── .env                   # Environment variables (place here)
├── package.json          # Dependencies
└── firebase.json         # Firebase configuration
```

## 🎯 Features

- **User Registration & Authentication**: Secure signup/login with Firebase Auth
- **Development Track Selection**: Choose from Android, Web, ML, or Game Dev tracks
- **Task Management**: View and complete tasks based on selected track
- **Progress Tracking**: Timeline showing registration progress
- **Admin Dashboard**: Manage users, view statistics, and review submissions
- **Profile Management**: View and edit user profile information
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Project Submission**: Submit GitHub links and project descriptions

## 🔄 Usage Workflow

### For Students:
1. **Register**: Create account with student details
2. **Select Track**: Choose development track (Android/Web/ML/Game Dev)
3. **Complete Tasks**: View and complete assigned tasks
4. **Submit Project**: Upload GitHub link and project description
5. **Track Progress**: Monitor timeline and submission status

### For Admins:
1. **Access Admin Dashboard**: Use admin credentials
2. **View Statistics**: See user counts and track distributions
3. **Manage Users**: View all registered users and their details
4. **Review Submissions**: Mark submissions as reviewed and graded
5. **Monitor Progress**: Track overall registration progress

## 🔐 Admin Access

For admin credentials and access, please contact: **itsme.ankit2006@gmail.com**

## 🚀 Deployment

### Vercel Deployment

```bash
# Build the application
pnpm run build

# Deploy to Vercel
vercel --prod
```

### Available Scripts

```bash
pnpm run dev              # Start development server
pnpm run build           # Build for production
pnpm run preview         # Preview production build
pnpm run lint            # Run ESLint
```

## 📞 Support

For support and questions:
- Email: itsme.ankit2006@gmail.com
- GitHub: [itzz-ankitp/sdc-registration-app](https://github.com/itzz-ankitp/sdc-registration-app)

---

Built with ❤️ by Piratla Ankit Rama Datt

