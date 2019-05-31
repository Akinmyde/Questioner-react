import actiontype from '../constants/loading.constants';

const initialState = {
  loader: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.CONTENT_LOADING:
      return {
        ...state,
        loader: !state.loader,
      };
    default:
      return state;
  }
};

export default LoadingReducer;