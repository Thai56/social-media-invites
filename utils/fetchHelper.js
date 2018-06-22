import axios from 'axios';
import constants from './constants';

const { URL, HEADERS } = constants;


const postBusiness = (data) => {
  return axios.post(`${URL}/dashboard/create/business`, data, HEADERS)
}

const login = () => {
  const body = {
    'email': 'ned@gmail.com',
    'password': 'ned'
  };
  return axios.post(`${URL}/user/login`, body, HEADERS);
};

const getUserBusinesses = ({ userId, token }) => {
  return axios.post(`${URL}/dashboard/businesses`, {
    userId,
    token,
  }, HEADERS);
};

// const getAllBusinesses = () => {
//   return axios.get(`${URL}/businessInfo`, HEADERS);
// }

const fetchHelpers = {
  postBusiness,
  getUserBusinesses,
  // getAllBusinesses,
  login,
}
export default fetchHelpers;
