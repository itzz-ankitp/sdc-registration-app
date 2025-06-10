# SDC Registration Portal

A professional, award-winning web application for the Software Development Club (SDC) registration system. Built with React, TypeScript, Firebase, and modern web technologies.

## 🚀 Features

- **Modern Authentication**: Secure user registration and login with Firebase Auth
- **Professional Design**: Dark theme with SDC brand colors and smooth animations
- **Comprehensive Registration**: Detailed form with validation for student information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Database**: Firebase Firestore for secure data storage
- **Cloud Functions**: Backend logic for chatbot and email functionality
- **Progressive Web App**: Fast loading and optimized performance

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS with SDC branding
- **UI Components**: shadcn/ui, Lucide React icons
- **Animation**: Framer Motion
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **Routing**: React Router DOM
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- pnpm (recommended) or npm
- Firebase account and project
- Git for version control

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repository-url>
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
VITE_FIREBASE_MEASUREMENT_ID="your_measurement_id"
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Set up Cloud Functions (optional)

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
│   │   ├── Timeline.jsx    # Registration timeline
│   │   ├── Contact.jsx     # Contact form
│   │   └── About.jsx       # About page
│   ├── assets/             # Static assets
│   ├── firebase.js         # Firebase configuration
│   ├── App.jsx            # Main app component
│   ├── App.css            # Custom styles
│   └── main.jsx           # Entry point
├── functions/              # Firebase Cloud Functions
├── public/                # Public assets
├── .env                   # Environment variables
└── package.json          # Dependencies
```

## 🎨 Design System

The application uses a custom design system based on the SDC brand:

- **Primary Colors**: Purple gradients (#8E2DE2, #4A00E0)
- **Accent Color**: Bright blue (#00F0FF)
- **Background**: Deep dark (#0A0A0A)
- **Typography**: Inter font family
- **Components**: Custom styled with Tailwind CSS

## 🔧 Available Scripts

```bash
# Development
pnpm run dev              # Start development server
pnpm run dev --host       # Start with network access

# Building
pnpm run build           # Build for production
pnpm run preview         # Preview production build

# Linting
pnpm run lint            # Run ESLint

# Firebase
firebase deploy          # Deploy to Firebase
firebase emulators:start # Start local emulators
```

## 🔐 Security Features

- Environment variables for sensitive configuration
- Firebase security rules for data protection
- Client-side and server-side form validation
- Secure authentication with Firebase Auth
- Protected routes and user session management

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Firebase Hosting

```bash
# Build the application
pnpm run build

# Deploy to Firebase
firebase deploy
```

### Manual Deployment

1. Build the application: `pnpm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **President**: Heerath Bhat
- **Development**: Software Development Club Team

## 📞 Support

For support and questions:
- Email: sdc@university.edu
- Discord: [SDC Community Server]
- GitHub Issues: [Create an issue]

## 🎯 Roadmap

- [ ] AI Chatbot integration with Gemini API
- [ ] Email notifications with SendGrid
- [ ] 3D animations and interactive elements
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

Built with ❤️ by the Software Development Club

