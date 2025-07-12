// Setup script to add admin user to Realtime Database
// Run this script once to set up admin access

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCuQ41NnqHRvhIjF7lMHyfH-H2-Jd_vckU",
  authDomain: "sdc-easereg.firebaseapp.com",
  databaseURL: "https://sdc-easereg-default-rtdb.firebaseio.com",
  projectId: "sdc-easereg",
  storageBucket: "sdc-easereg.firebasestorage.app",
  messagingSenderId: "692542314126",
  appId: "1:692542314126:web:a152d4ff3bfa8dcbd35bdf",
  measurementId: "G-Z0DD8HZ88V"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Admin UID from your requirements
const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';

async function setupAdmin() {
  try {
    // Add admin to the admins node
    await set(ref(database, `admins/${ADMIN_UID}`), {
      email: 'sdcmvjce@gmail.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
      permissions: ['read_users', 'write_users', 'read_all']
    });
    
    console.log('✅ Admin user set up successfully!');
    console.log('Admin UID:', ADMIN_UID);
    console.log('Admin Email: sdcmvjce@gmail.com');
    console.log('You can now access the admin dashboard at /admin');
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
  }
}

// Run the setup
setupAdmin(); 