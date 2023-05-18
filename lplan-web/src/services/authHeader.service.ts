export default function authHeader() {
    const userData = localStorage.getItem("userData");
    let user = null;
    if (userData)
      user = JSON.parse(userData);
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return { Authorization: '' }; // for Spring Boot back-end
      // return { 'x-access-token': null }; // for Node Express back-end
    }
  }