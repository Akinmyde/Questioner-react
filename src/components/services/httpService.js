import axios from 'axios';

const setTokenKey = (token) => {
  axios.defaults.headers.common.token = token;
};

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.delete,
  patch: axios.patch,
  setTokenKey,
};
