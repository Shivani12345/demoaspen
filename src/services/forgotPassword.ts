import { METHODS, API } from 'services/apiConfig';
import { IAForgotPasswordUser, IForgotPasswordUserAPI } from 'interfaces/common';
import { apiCall } from './api';


function forgotPassword(data: IAForgotPasswordUser) {

  const bodyData: IForgotPasswordUserAPI = {
    email: data.username,
  };

  return apiCall({
    url: API.forgotPassword,
    method: METHODS.POST,
    body: bodyData,
  });
}

export {
  forgotPassword,
};
