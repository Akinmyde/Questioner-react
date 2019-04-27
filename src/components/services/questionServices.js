import http from './httpService';
import { apiUrl } from '../config/config.json';

const url = `${apiUrl}/questions`;

const addQuestion = async (questionData) => {
  const { data: result } = await http.post(url, questionData);
  const { data } = result;
  return data;
};

const sayName = name => name;

export {
  addQuestion,
  sayName,
};
