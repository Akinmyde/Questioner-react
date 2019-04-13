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

const getCurrentUser = () => {
  try {
    const token = getTokenKey();
    const { id: userId } = jwtDecode(token);
    return userId;
  } catch (ex) { return null; }
};

export {
  register,
  login,
  logout,
  getTokenKey,
  getCurrentUser,
};
