import { OAuth2Client } from "google-auth-library";

/**
 * Utility to interact with YouTube Data API using stored user tokens.
 */
export async function getYouTubeClient(accessToken, refreshToken) {
    const auth = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    });

    return auth;
}

/**
 * Example: Fetch user's YouTube channel info
 */
export async function getMyYouTubeChannels(accessToken, refreshToken) {
    const auth = await getYouTubeClient(accessToken, refreshToken);

    // Using standard fetch with the auth token for simplicity
    // or you could use 'googleapis' npm package for a better DX
    const response = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch YouTube channels");
    }

    return await response.json();
}

export async function getSubscriptions(accessToken, refreshToken) {
    const auth = await getYouTubeClient(accessToken, refreshToken);

    const response = await fetch(
        "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet,contentDetails&mine=true&maxResults=50",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("YouTube API Error [Subscriptions]:", response.status, errorText);
        throw new Error(`Failed to fetch subscriptions: ${response.status} ${errorText}`);
    }

    return await response.json();
}