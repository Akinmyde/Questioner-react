import { getTokenKey } from './authService';
import http from './httpService';

const token = getTokenKey();

const getRsvps = async () => {
  const { data: result } = await http.get('/meetups/rsvps');
  const { data } = result;
  return data;
};

const getTotalQuestion = async () => {
  const { data: result } = await http.get('/questions/user', token);
  const { data } = result;
  return data[0].count;
};

const getTotalComment = async () => {
  const { data: result } = await http.get('comments/user', token);
  const { data } = result;
  return data[0].count;
};

const getUpcomingMeetups = async () => {
  const { data: result } = await http.get('meetups/upcoming', token);
  const { data } = result;
  return data;
};

const userAnalytics = async () => {
  const totalPost = await getTotalQuestion();
  const totalComment = await getTotalComment();
  const upcomingMeetups = await getUpcomingMeetups();
  return { totalPost, totalComment, upcomingMeetups: upcomingMeetups };
};

const adminAnalytics = async () => {

}

export {
  getTotalQuestion,
  getTotalComment,
  getUpcomingMeetups,
  userAnalytics,
  getRsvps
};