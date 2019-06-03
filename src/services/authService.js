import jwtDecode from 'jwt-decode';
import http from './httpService';

const url = '/auth';
const tokenKey = 'token';

const getTokenKey = () => localStorage.getItem(tokenKey);

http.setTokenKey(getTokenKey());

export const setToken = (result) => {
  const { data } = result;
  const { token } = data[0];
  return localStorage.setItem(tokenKey, token);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem('state');
  window.location = '/';
};

const decodeToken = () => {
  try {
    const token = getTokenKey();
    return jwtDecode(token);
  } catch (ex) { return null; }
};

const checkIsAdmin = () => {
  let isAdmin = false;
  const decodedToken = decodeToken();
  if (decodedToken) {
    const { isAdmin: admin } = decodedToken;
    isAdmin = admin;
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
  logout,
  getTokenKey,
  decodeToken,
  checkIsAdmin,
  getCurrentUser,
};
