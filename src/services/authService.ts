// src/services/authService.ts

// logs in the user with the token
// requires the token from the wialon login
async function authenticate(token: string) {
  console.log(token);
    console.log('authenticating token');
    // Construct the URL with the token
    const url: string = `https://hst-api.wialon.us/wialon/ajax.html?svc=token/login&params={"token":"${token}"}`;
  
    // Make a request to the URL
    const response = await fetch(url);
  
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to authenticate token');
    } else {
      // Parse the response body as JSON
      const data = await response.json();

      // Return the data
      return data;
    }
  }
  
  export default { authenticate };