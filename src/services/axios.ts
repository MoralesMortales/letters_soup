
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/v1/users/';

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // Maximum timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to find user by email and fetch user details by ID
export async function getUserByEmail(email, clave) {
  try {
    console.log('you ingreased ', email, ' ',clave)
    // Fetch all users
    const response = await instance.get('/');
    const users = response.data;

    // Find the user with the matching email
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('User not found.');
    }

    // Construct the route using the user's ID
    const userRoute = `${user.id}/`;

    // Fetch the user's detailed data using the constructed route
    const userResponse = await instance.get(userRoute);

    return userResponse.data; // Return the user details
  } catch (error) {
    throw error;
  }
}

