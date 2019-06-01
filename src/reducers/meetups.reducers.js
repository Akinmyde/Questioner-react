import actionTypes from "../constants/meetups.constants";

const initialState = { meetupsData: [] };

const meetups = (state = initialState, action) => {
  const initialMeetups = [...state.meetupsData];
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
    default:
      return state;
  }
};

export default meetups;
