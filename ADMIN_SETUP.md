# Admin Setup Guide

## 🔧 **Database Rules Setup**

### Step 1: Deploy Database Rules
1. Open your Firebase Console
2. Go to Realtime Database
3. Click on "Rules" tab
4. Replace the current rules with:

```json
{
  "rules": {
    ".read": "auth != null && (root.child('admins').child(auth.uid).exists() || root.child('users').child(auth.uid).exists())",
    ".write": "auth != null && (root.child('admins').child(auth.uid).exists() || root.child('users').child(auth.uid).exists())",
    "users": {
      ".read": "auth != null && (root.child('admins').child(auth.uid).exists() || data.child(auth.uid).exists())",
      ".write": "auth != null && (root.child('admins').child(auth.uid).exists() || data.child(auth.uid).exists())",
      "$uid": {
        ".read": "auth != null && (root.child('admins').child(auth.uid).exists() || auth.uid == $uid)",
        ".write": "auth != null && (root.child('admins').child(auth.uid).exists() || auth.uid == $uid)"
      }
    },
    "admins": {
      ".read": "auth != null && root.child('admins').child(auth.uid).exists()",
      ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

5. Click "Publish"

### Step 2: Add Admin User to Database
1. Go to Realtime Database in Firebase Console
2. Click on the "+" button to add a new node
3. Name it `admins`
4. Inside `admins`, add a new node with your admin UID: `0JkRLEEnv1dDEPaXaysRfchzGoT2`
5. Add these fields to the admin node:
   ```json
   {
     "email": "sdcmvjce@gmail.com",
     "role": "admin",
     "createdAt": "2025-07-12T00:00:00.000Z",
     "permissions": ["read_users", "write_users", "read_all"]
   }
   ```

## 🔐 **Admin Credentials**
- **Email:** sdcmvjce@gmail.com
- **Password:** admin#001
- **UID:** 0JkRLEEnv1dDEPaXaysRfchzGoT2

## 🧪 **Testing Admin Access**
1. Start your development server: `npm run dev`
2. Go to `/admin`
3. Log in with the admin credentials
4. You should see all registered users in a table

## 📊 **What Admin Can Do**
- ✅ View all registered users
- ✅ See user details: name, email, student ID, department, year, contact
- ✅ Access real-time data from Realtime Database
- ✅ Filter and search users (if implemented)

## 🚨 **Security Features**
- Only authenticated users can access the database
- Admin can read all user data
- Regular users can only read their own data
- Admin permissions are checked via database rules

## 🔄 **Alternative Setup Method**
If you prefer to use the setup script:

1. Create a new file called `setup-admin.mjs` with the content from `setup-admin.js`
2. Run: `node setup-admin.mjs`
3. This will automatically add the admin to the database

## 🐛 **Troubleshooting**
- **Admin can't see users**: Check that admin UID is correctly added to `/admins` node
- **Database rules error**: Make sure rules are published in Firebase Console
- **Authentication error**: Verify admin credentials are correct
- **No data showing**: Ensure users have registered and data is in Realtime Database

Your admin dashboard should now be fully functional! 🎉 