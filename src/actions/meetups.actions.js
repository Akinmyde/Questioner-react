import { toast } from 'react-toastify';
import actionTypes from '../constants/meetups.constants';
import http from '../components/services/httpService';
import exceptionHandler from '../helpers/exceptionHandler';
import contentLoading from './loading.actions';

export const meetupsSuccess = data => ({
  type: actionTypes.MEETUPS_SUCCESS,
  data,
});

export const SingleMeetupSuccess = data => ({
  type: actionTypes.SINGLE_MEETUP_SUCCESS,
  data,
});

export const deleteSuccess = meetupId => ({
  type: actionTypes.DELETE_SUCCESS,
  meetupId,
});

export const upcomingMeetupsSuccess = data => ({
  type: actionTypes.UPCOMING_MEETUPS_SUCCESS,
  data,
});

export const rsvpMeetupsSuccess = data => ({
  type: actionTypes.RSVP_MEETUPS_SUCCESS,
  data,
});

export const createMeetupsSuccess = data => ({
  type: actionTypes.CREATE_MEETUPS_SUCCESS,
  data,
});

export const getAllMeetups = () => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.get('/meetups');
      const { data } = result;
      dispatch(meetupsSuccess(data));
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading())
    }
  }
}

export const deleteMeetup = meetupId => {
  return async dispatch => {
    try {
      await http.delete(`meetups/${meetupId}`);
      dispatch(deleteSuccess(meetupId))
    } catch (ex) {
      exceptionHandler(ex);
    }
  }
}

export const getSingleMeetup = meetupId => {
  return async dispatch => {
    dispatch(contentLoading())
    try {
      const { data: result } = await http.get(`meetups/${meetupId}`);
      const { data } = result;
      dispatch(SingleMeetupSuccess(data[0]))
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading())
    }
  }
}

export const rsvps = (id, response) => {
  return async dispatch => {
    dispatch(contentLoading());
    try {
      await http.post(`meetups/${id}/rsvps`, response);
      toast.success(`you responded with ${response} to this meetup`);
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}

export const fetchUpcomingMeetups = () => {
  return async dispatch => {
    dispatch(contentLoading());
    try {
      const { data: result } = await http.get('meetups/upcoming');
      const { data } = result;
      dispatch(upcomingMeetupsSuccess(data));
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}

export const fetchRsvpMeetups = () => {
  return async dispatch => {
    dispatch(contentLoading());
    try {
      const { data: result } = await http.get('meetups/rsvps');
      const { data } = result;
      dispatch(rsvpMeetupsSuccess(data));
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}

export const createMeetup = meetupData => {
  return async dispatch => {
    dispatch(contentLoading());
    try {
      const { data: result } = await http.post('meetups', meetupData);
      const { data } = result;
      console.log(data, 'our data');
      dispatch(createMeetupsSuccess(data[0]));
      toast.success("Your meetup has been added");
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      dispatch(contentLoading());
    }
  }
}