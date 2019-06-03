import 'babel-polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { loginSuccess, signupSuccess } from '../actions/auth.actions';
import types from '../constants/auth.constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.config.fallbackToNetwork = false;
  });

  it('should test login success', async () => {
    const expectedAction = [
      {
        type: types.LOGIN_SUCCESS,
        isAdmin: false,
        userId: 1,
      },
    ];
    const store = mockStore({});

    await store.dispatch(loginSuccess(false, 1));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should test signup success', async () => {
    const expectedAction = [
      {
        type: types.SIGNUP_SUCCESS,
        userId: 1,
      },
    ];
    const store = mockStore({});

    await store.dispatch(signupSuccess(1));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should test login success', async () => {
    const user = { email: 'test@gmail.com', password: 'testing' }
    fetchMock.mock(
      '/api/v1/auth/login',
      {
        status: 200,
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    await fetch('/api/v1/auth/login', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const expectedAction = [
      {
        type: types.LOGIN_SUCCESS,
        isAdmin: false,
        userId: 1
      },
    ];

    const store = mockStore({});

    await store.dispatch(loginSuccess(false, 1));
    expect(store.getActions()).toEqual(expectedAction);
  });
});