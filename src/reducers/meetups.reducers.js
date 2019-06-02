import actionTypes from "../constants/meetups.constants";

const initialState = { meetupsData: [], singleMeetupData: [] };

const meetups = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEETUPS_SUCCESS:
      return {
        ...state,
        meetupsData: action.data,
      };
    case actionTypes.DELETE_SUCCESS:
      return {
        ...state,
        meetupsData: state.meetupsData.filter(meetup => meetup.id !== action.meetupId)
      }
    case actionTypes.SINGLE_MEETUP_SUCCESS:
        return {
          ...state,
          singleMeetupData: action.data,
        };
    default:
      return state;
  }
};

export default meetups;
