import http from './httpService';
import { apiUrl } from '../config/config.json';

const register = user => http.post(`${apiUrl}/auth/signup`, user);

const login = user => http.post(`${apiUrl}/auth/login`, user);

export default { register, login };
