import http from './httpService';

const url = '/meetups';

const getSingleMeetup = async (id) => {
  const { data: result } = await http.get(`${url}/${id}`);
  const { data } = result;
  return data;
};

const getMeetupQuestions = async (id) => {
  const { data: result } = await http.get(`${url}/${id}/questions`);
  const { data } = result;
  return data;
};

const rsvps = async (id, response) => {
  const { data: result } = await http.post(`${url}/${id}/rsvps`, response);
  const { data } = result;
  return data;
};

const createMeetup = async (meetupData) => {
  const { data: result } = await http.post(`${url}`, meetupData);
  const { data } = result;
  return data;
}

export {
  getSingleMeetup,
  getMeetupQuestions,
  rsvps,
  createMeetup
};
