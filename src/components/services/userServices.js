import { getTokenKey } from './authService';
import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = `${apiUrl}`;
const token = getTokenKey();

const getTotalQuestion = async () => {
  const { data: result } = await http.get(`${url}/questions/user`, token);
  const { data } = result;
  return data[0].count;
};

const getTotalComment = async () => {
  const { data: result } = await http.get(`${url}/comments/user`, token);
  const { data } = result;
  return data[0].count;
};

const getUpcomingMeetups = async () => {
  const { data: result } = await http.get(`${url}/meetups/upcoming`, token);
  const { data } = result;
  return data[0];
};

const userAnalytics = async () => {
  const totalPost = await getTotalQuestion();
  const totalComment = await getTotalComment();
  const upcomingMeetups = await getUpcomingMeetups();
  return { totalPost, totalComment, upcomingMeetups: [upcomingMeetups] };
};

export {
  getTotalQuestion,
  getTotalComment,
  getUpcomingMeetups,
  userAnalytics,
};