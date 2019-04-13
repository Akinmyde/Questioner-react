import axios from 'axios';

const setTokenKey = (token) => {
  axios.defaults.headers.common.token = token;
};

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.delete,
  setTokenKey,
};
