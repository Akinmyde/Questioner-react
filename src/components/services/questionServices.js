import http from './httpService';

const url = '/questions';

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
