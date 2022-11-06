import axios from 'axios';

export const signIn = async (body) => {
  return axios.post('/sign-in', body);
};
