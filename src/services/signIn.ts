import { METHODS, API } from 'services/apiConfig';
import { IASignInUser, ISignInUserAPI } from 'interfaces/common';
import { apiCall } from './api';


function signIn(data: IASignInUser) {
  const bodyData: ISignInUserAPI = {
    email: data.username,
    password: data.password,
  };

  return apiCall({
    url: API.signIn,
    method: METHODS.POST,
    body: bodyData,
  });
}

export {
  signIn,
};
