import { METHODS, API } from 'services/apiConfig';
import { IASignUpUser, ISignUpUserAPI } from 'interfaces/common';
import { apiCall } from './api';


function signUp(data: IASignUpUser) {

  const bodyData: ISignUpUserAPI = {
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
    country_id: data.country_id,
    zip_code: data.zip_code,
    password: data.password,
    email: data.username,
  };

  return apiCall({
    url: API.signUp,
    method: METHODS.POST,
    body: bodyData,
  });
}

export {
  signUp,
};
