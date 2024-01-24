import { METHODS, API } from 'services/apiConfig';
import { IAChangePasswordUser, IChangePasswordUserAPI } from 'interfaces/common';
import { apiCall } from './api';


async function changePassword(data: IAChangePasswordUser) {

  const bodyData: IChangePasswordUserAPI = {
    currentpassword: data.currentPassword,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  };

  return apiCall({
    url: API.changePassword,
    method: METHODS.POST,
    body: bodyData,
    isToken: true,
  });
}

export {
  changePassword,
};
