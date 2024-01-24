// import axios from 'axios';

import {useContext} from 'react';
import {
  METHODS,
  STATUS_CODE,
  API_INSTANCE,
  API_CONFIG,
} from 'services/apiConfig';
import {isConnected, API_Log} from 'utils/functions';
import {getLanguage, getLocation, getToken} from 'utils/asyncStorage';
import {IApi, IContext} from 'interfaces/common';

import {ContextData, toastRef} from 'components/globalContext/globalContext';
import CONSTANTS from 'common/constants';

const getHeaders = async ({isToken = false, header = {}}) => {
  try {
    const authToken = await getToken();
    let headers = {...header};
    if (isToken) {
      headers = {
        ...header,
        Authorization: `Bearer ${authToken || ''}`,
      };
    }
    return headers;
  } catch (error) {
    console.log('get header error: ', error);
  }
};

// async function apiCall(params: IApi) {
//   if (!await isConnected()) {
//     return { data: { code: STATUS_CODE.noInternet } };
//   }

//   const { url, method = METHODS.GET, body = {}, isToken = false, header = {} } = params;
//   const headers = await getHeaders({ isToken, header });

//   // const API_URL = `${API_CONFIG.baseUrl}${url}`;
//   // const timeout = API_CONFIG.timeout;
//   let response;

//   console.log('API request: ', { headers: headers });
//   switch (method) {
//     case METHODS.POST:
//       // response = await axios({ method: METHODS.POST, url: API_URL, data: body, headers, timeout });
//       response = await API_INSTANCE.post(url, body, { headers });
//       break;
//     default:
//       // response = await axios({ method: METHODS.GET, url: API_URL, headers, timeout });
//       response = await API_INSTANCE.get(url, { headers });
//       break;
//   }

//   console.log('API response: ', response);
//   return response?.data;
// }

// API call method which is call with out token
async function API_Call_With_Out_Token(
  URL,
  Body = {},
  Method = METHODS.GET,
  isFile = false,
  hdr = null,
) {
  let selectedLocation = await getLocation();
  console.log('APIselectedLocation==', selectedLocation);

  let selectedLang = await getLanguage();
  console.log('APIselectedLocation==', selectedLang);

  const isToken = false;
  const header = 'X-localization';
  // const headers = await getHeaders({isToken, header});
  let headers = {
    'X-localization': selectedLang,
    'location-code': selectedLocation,
    // 'Accept': "*/*",
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  // if (hdr != null) {
  //   headers = Object.assign(headers, hdr);
  // }
  const Check_Internet = await isConnected();
  console.log('isFileisFile', isFile);
  API_Log(
    isFile ? API_CONFIG.scanUri + URL : API_CONFIG.baseUrl + URL,
    headers,
    Body,
  );

  if (!Check_Internet) {
    return {code: STATUS_CODE.noInternet, msg: ''};
  } else {
    try {
      let response = await fetch(
        isFile ? API_CONFIG.scanUri + URL : API_CONFIG.baseUrl + URL,
        {
          method: Method,
          headers: headers,
          body: Method == METHODS.POST ? Body : null,
        },
      );
      console.log('responseresponseresponse', response);

      return {code: response.status, ResponseJson: await response.json()};
    } catch (e) {
      // toastRef.current.error('e');
      console.log('dsfdsf', e + '');
      
      toastRef.current.error(CONSTANTS.ERRORMESSAGE);
    }
  }
}

// API call method which is call with out token
async function API_Call_With_Out_Token_RAW(
  URL,
  Body = {},
  Method = METHODS.GET,
  isFile = false,
  hdr = null,
) {
  let selectedLocation = await getLocation();
  console.log('APIselectedLocation==', selectedLocation);

  let selectedLang = await getLanguage();
  console.log('APIselectedLocation==', selectedLang);

  // const headers = await getHeaders({isToken, header});
  let headers = {
    // 'X-localization': selectedLang,
    'location-code': selectedLocation,
    // 'Accept': "*/*",
    // Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  // if (hdr != null) {
  //   headers = Object.assign(headers, hdr);
  // }
  const Check_Internet = await isConnected();
  console.log('isFileisFile', isFile);
  API_Log(
    isFile ? API_CONFIG.scanUri + URL : API_CONFIG.baseUrl + URL,
    headers,
    Body,
  );

  if (!Check_Internet) {
    return {code: STATUS_CODE.noInternet, msg: ''};
  } else {
    try {
      let response = await fetch(
        isFile ? API_CONFIG.scanUri + URL : API_CONFIG.baseUrl + URL,
        {
          method: Method,
          headers: headers,
          body: Method == METHODS.POST ? Body : null,
        },
      );
      console.log('responseresponseresponse', response);

      return {code: response.status, ResponseJson: await response.json()};
    } catch (e) {
      // toastRef.current.error('e');
      console.log('dsfdsf', e + '');
      
      toastRef.current.error(CONSTANTS.ERRORMESSAGE);
    }
  }
}

async function API_Call_With_Token(
  URL: any,
  Body = {},
  Method = METHODS.POST,
  hdr = {},
  FOR_CUSTOM = false,
) {
  const ResultToken = await getToken();
  console.log('ResultTokenResultToken', ResultToken);

  const Check_Internet = await isConnected();
  var headers = {};
  if (!Check_Internet) {
    return {Status_Code: STATUS_CODE.noInternet, ResponseJson: {}};
  } else if (ResultToken) {
    // let TokenJSON = JSON.parse(Result.Token);

    const NewCode = ResultToken; //await getNewToken(TokenJSON);
    // if (CheckAPIDataStatusUnAuth(NewCode?.ST)) {
    //   return NewCode;
    // } else if (CheckAPIDataStatusSuccess(NewCode?.Status_Code)) {
    //   TokenJSON = NewCode?.TokenJSON;
    // }
    console.log('Status_Code@@', ResultToken);

    headers = {
      // 'Accept': "*/*",
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'Content-Type': "multipart/form-data",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': `Bearer ${Result.Token}`,
      Authorization: ResultToken,
    };

    if (hdr != null) {
      headers = Object.assign(headers, hdr);
    }

    API_Log(API_CONFIG.baseUrl + URL, headers, Body);

    if (Body == null) {
      let response = await fetch(API_CONFIG.baseUrl + URL, {
        method: Method,
        headers: headers,
      });
      return {
        Status_Code: response.status,
        ResponseJson: await response.json(),
      };
    } else {
      let response = await fetch(FOR_CUSTOM ? URL : API_CONFIG.baseUrl + URL, {
        method: Method,
        headers: headers,
        body: Body,
      });
      return {
        Status_Code: response.status,
        ResponseJson: await response.json(),
      };
    }
  } else {
    console.log('ERRRORORO');

    return null;
  }
}

async function apiCall(params: IApi) {
  if (!(await isConnected())) {
    return {data: {code: STATUS_CODE.noInternet}};
  }

  const {
    url,
    method = METHODS.GET,
    body = {},
    isToken = false,
    header = {},
  } = params;
  const headers = await getHeaders({isToken, header});

  // const API_URL = `${API_CONFIG.baseUrl}${url}`;
  // const timeout = API_CONFIG.timeout;
  let response;

  console.log('API request: ', {headers: headers});
  console.log('API request:', API_CONFIG.baseUrl + url);
  switch (method) {
    case METHODS.POST:
      // response = await axios({ method: METHODS.POST, url: API_URL, data: body, headers, timeout });
      response = await API_INSTANCE.post(API_CONFIG.baseUrl + url, body, {
        headers,
      });
      break;
    default:
      // response = await axios({ method: METHODS.GET, url: API_URL, headers, timeout });
      response = await API_INSTANCE.get(API_CONFIG.baseUrl + url, {headers});
      break;
  }

  console.log('API response: ', response);
  return response?.data;
}

export {apiCall, API_Call_With_Token, API_Call_With_Out_Token,API_Call_With_Out_Token_RAW};
