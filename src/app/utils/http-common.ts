import axios from 'axios';

export default axios.create({
  // baseURL: "http://localhost:5000/api/v1/restaurants",
  baseURL: 'http://localhost:5200/api/v1/inventory_manager/',

  headers: {
    'Content-type': 'application/json',
  },
});
