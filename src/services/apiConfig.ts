import axios from 'axios';
import {isIOS} from 'utils/functions';

// API config
const API_CONFIG = {
  baseUrl: 'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/api/v1/',
  scanUri: 'https://beta8.moontechnolabs.com/',
  agreement_url: 'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/',
  timeout: 5000,
};

const INSURANCE_SIGN_AGREEMENT = "/insurance/agreement"
const RENTAL_SIGN_AGREEMENT = "/rental/agreement/"

const TERMS_CONDITION_EN =
  'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/terms-and-conditions/en';
const TERMS_CONDITION_SP =
  'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/terms-and-conditions/es';

const PRIVACY_POLICY_EN =
  'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/privacy-policy/en';
const PRIVACY_POLICY_SP =
  'https://beta8.moontechnolabs.com/aspen-mini-kiosk-backend/privacy-policy/es';

const API_INSTANCE = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
});

// Add a request interceptor
API_INSTANCE.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
API_INSTANCE.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

// auth api
const API = {
  signIn: 'login',
  signUp: 'signup',
  forgotPassword: 'frogot-password',
  changePassword: 'change-password',
  LOCATIONS: 'locations',
  PRIVACYPOLICY_CMS: 'cms/privacy-policy',
  INSTRUCTIONS: 'insurances',
  CREATE_CUSTOMER: 'customer-create',
  SCAN_LICENSE: 'aspen-ocr-backend/paddle',
  PAYMENTSUMMARYDETAILS: 'payment-summary',
  LICENSESCAN: 'aspen-ocr/detact',
  PAY_NOW:'pay-now',
  SIGN_AGREEMENT:'signagreement',
  SIGN_AGREEMENT:'signagreement',
};

const METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};

const STATUS_CODE = {
  success: 200,
  successError: 203,
  noContent: 204,
  created: 201,
  movedPermanently: 301,
  bedRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodAllowed: 405,
  unsupportedMediaType: 415,
  timeout: 408,
  conflict: 409,
  internalServerError: 500,
  bedGetaway: 502,
  serviceUnavailable: 503,
  getawayTimeout: 504,
  noInternet: 0,
};

export {
  API_CONFIG,
  API,
  METHODS,
  STATUS_CODE,
  API_INSTANCE,
  TERMS_CONDITION_EN,
  TERMS_CONDITION_SP,
  PRIVACY_POLICY_EN,
  PRIVACY_POLICY_SP,
  INSURANCE_SIGN_AGREEMENT,
  RENTAL_SIGN_AGREEMENT
};
