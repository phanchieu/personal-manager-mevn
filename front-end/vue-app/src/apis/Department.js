import axios from 'axios';
import { API } from '@/constants/index.js';

const getListDepartments = () => {
  const listDepartments = axios
    .get(API + '/departments')
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return listDepartments;
};

export { getListDepartments };
