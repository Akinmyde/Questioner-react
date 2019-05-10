import http from './httpService';

const url = 'questions';

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