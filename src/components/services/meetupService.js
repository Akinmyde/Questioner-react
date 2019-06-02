import http from './httpService';

const url = '/meetups';

const getAllMeetups = async () => {
  const { data: result } = await http.get(url);
  const { data } = result;
  return data;
};

const createMeetup = async (meetupData) => {
  const { data: result } = await http.post(`${url}`, meetupData);
  const { data } = result;
  return data;
}

export {
  getAllMeetups,
  createMeetup
};
