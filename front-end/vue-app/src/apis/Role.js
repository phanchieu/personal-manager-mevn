import axios from 'axios';
import { API } from '@/constants/index.js';

const getListRoles = () => {
  const listRoles = axios
    .get(API + '/roles')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return listRoles;
};

export { getListRoles };
