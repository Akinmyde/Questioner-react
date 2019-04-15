import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = `${apiUrl}/auth`;
const tokenKey = 'token';

const getTokenKey = () => localStorage.getItem(tokenKey);

http.setTokenKey(getTokenKey());

const setToken = (result) => {
  const { data } = result;
  const { token } = data[0];
  localStorage.setItem(tokenKey, token);
  window.location = '/dashboard';
};

const register = async (user) => {
  const { data: result } = await http.post(`${url}/signup`, user);
  return setToken(result);
};

const login = async (user) => {
  const { data: result } = await http.post(`${url}/login`, user);
  return setToken(result);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
  window.location = '/';
};

const decodeToken = () => {
  try {
    const token = getTokenKey();
    return jwtDecode(token);
  } catch (ex) { return null; }
};

const checkIsAdmin = () => {
  let isAdmin;
  const decodedToken = decodeToken();
  if (!decodedToken) {
    isAdmin = false;
  } else {
    // eslint-disable-next-line prefer-destructuring
    isAdmin = decodedToken.isAdmin;
  }
  return isAdmin;
};

const getCurrentUser = () => {
  try {
    const { id: userId } = decodeToken();
    return userId;
  } catch (ex) { return null; }
};

export {
  register,
  login,
  logout,
  getTokenKey,
  decodeToken,
  checkIsAdmin,
  getCurrentUser,
};
