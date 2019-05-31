import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { encryptData, decryptData } from './encryptStore';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', encryptData(state));
  } catch (e) {
    throw Error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return decryptData(serializedState);
  } catch (e) {
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const Store = () => {
  const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk),
  )

  store.subscribe(() => saveToLocalStorage(store.getState()));

  return store;
}
export default Store;
