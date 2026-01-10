# Google SSO with YouTube View Access Implementation Plan

## 1. Google Cloud Console Setup (Action required by USER)
- Create a project at [Google Cloud Console](https://console.cloud.google.com/).
- Enable **YouTube Data API v3**.
- Configure the **OAuth Consent Screen** (User Type: External).
- Add scope: `https://www.googleapis.com/auth/youtube.readonly`.
- Create **OAuth 2.0 Client IDs** (Web application).
- Add Redirect URI: `http://localhost:3000/api/auth/callback/google`.
- Save `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your `.env.local`.

## 2. Model Updates
- **[MODIFY] `models/auth/user.js`**: Add fields for `googleId`, `accessToken`, `refreshToken`, and make `password` optional.

## 3. Library Installation
- Install `google-auth-library`: `npm install google-auth-library`.

## 4. API Routes
- **[NEW] `app/api/auth/google/route.js`**: Generates the Google Auth URL and redirects the user.
- **[NEW] `app/api/auth/callback/google/route.js`**: 
    - Exchanges the auth code for tokens.
    - Gets user info from Google.
    - Creates or updates the user in the database.
    - Creates a session and redirects to `/todo`.

## 5. UI Updates
- **[MODIFY] `app/(auth)/signin/page.jsx`**: Add a "Sign in with Google" button.

## 6. YouTube Data Access (Example)
- **[NEW] `lib/youtube.js`**: Utility to fetch YouTube data using the stored `accessToken`.
