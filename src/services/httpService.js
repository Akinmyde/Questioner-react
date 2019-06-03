import axios from 'axios';

const setTokenKey = (token) => {
  axios.defaults.headers.common.token = token;
};

axios.defaults.baseURL = 'https://akinmyde-questioner.herokuapp.com/api/v1';

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.delete,
  patch: axios.patch,
  setTokenKey,
};
