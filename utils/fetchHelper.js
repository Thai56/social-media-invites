import axios from 'axios';

const URL = 'http://localhost:8080/businessInfo';
const HEADERS = { 'Content-Type': 'text/html' };

const postBusiness = (data) => {
  return axios.post(`${URL}/businessInfo`, data, HEADERS)
}

const getAllBusinesses = () => {
  return axios.get(URL, HEADERS);
}

const fetchHelpers = {
  postBusiness,
  getAllBusinesses,
}
export default fetchHelpers;
