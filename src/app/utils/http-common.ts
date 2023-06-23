import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5200/api/v1/inventory_manager/',
  // baseURL:
  //   'https://auth-with-jwt-server.onrender.com/api/v1/inventory_manager/',

  headers: {
    'Content-type': 'application/json',
  },
});
