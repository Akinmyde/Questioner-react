import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = `${apiUrl}/meetups`;

const getAllMeetups = async () => {
  const { data: result } = await http.get(url);
  const { data } = result;
  return data;
};

export { getAllMeetups };
