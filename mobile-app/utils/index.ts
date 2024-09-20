import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  if (!token) {
    return true; // No token means it's expired or invalid
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds

    if (!decodedToken.exp) return true;
    return decodedToken.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Invalid token", error);
    return true; // If token can't be decoded, consider it expired or invalid
  }
};
