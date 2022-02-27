import axios from 'axios';
import { API } from '@/constants/index.js';

const getListJobs = () => {
  const listRoles = axios
    .get(API + '/jobs')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return listRoles;
};

export { getListJobs };
