import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = `${apiUrl}/questions`;

const upVote = async (id) => {
  const { data: result } = await http.patch(`${url}/${id}/upvote`);
  const { data } = result;
  return data[0];
};

const downVote = async (id) => {
  const { data: result } = await http.patch(`${url}/${id}/downvote`);
  const { data } = result;
  return data[0];
};

export {
  upVote,
  downVote
};