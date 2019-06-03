import 'babel-polyfill';
import { setToken, decodeToken, checkIsAdmin, getCurrentUser, logout } from '../services/authService';

describe('Services test', () => {
  it('should test function setToken', () => {
    const params = { data: [ { token: 'sadfghjhds' } ] };
    const res = setToken(params);
    expect(setToken(params)).toEqual(res);
  });

  it('should test function decodeToken', () => {
    const token = jest.fn();
    const res = decodeToken(token)
    expect(decodeToken(token)).toEqual(res);
  });

  it('should test function checkIsAdmin', () => {
    const decodedToken = jest.fn();
    const res = checkIsAdmin();
    expect(checkIsAdmin()).toEqual(res);
  });

  it('should test function getCurrentUser', () => {
    const decodedToken = jest.fn();
    const res = getCurrentUser();
    expect(getCurrentUser()).toEqual(res);
  });

  it('should test function logout', () => {
    const res = logout();
    expect(logout()).toEqual(res);
  });
})