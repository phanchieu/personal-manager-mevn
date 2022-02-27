import axios from 'axios';
import { API } from '@/constants/index.js';

const getListUsers = async () => {
  const listUsers = await axios
    .get(API + '/users')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return listUsers;
};

const registerUser = async (user) => {
  var status = false;
  await axios
    .post(API + '/user', {
      ...user,
    })
    .then(() => {
      status = true;
    })
    .catch(() => {
      status = false;
    });
  return status;
};

const getUserById = async (id) => {
  const user = await axios
    .get(API + '/user/' + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return user;
};

const createUser = async (user) => {
  const createdUser = await axios
    .post(API + '/user/', {
      ...user,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return createdUser;
};

const updateUser = async (id, user) => {
  const updateUser = await axios
    .put(API + '/user/' + id, {
      ...user,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return updateUser;
};

const deleteUser = async (id) => {
  const updateUser = await axios
    .delete(API + '/user/' + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return updateUser;
};

// todo: createUser, updateUser, remove confirm password

export { getListUsers, getUserById, registerUser, createUser, updateUser, deleteUser };
