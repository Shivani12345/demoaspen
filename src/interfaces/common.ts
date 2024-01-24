import {
  IASignInUser,
  ISignInUserAPI,
  IASignInSuccess,
  ISignInContext,
} from './SignInInterface';
import {
  IASignUpUser,
  ISignUpUserAPI,
  IASignUpSuccess,
  ISignUpContext,
} from './SignUpInterface';
import {
  IAForgotPasswordUser,
  IForgotPasswordUserAPI,
  IAForgotPasswordSuccess,
  IForgotPasswordContext,
} from './ForgotPasswordInterface';
import {
  IAChangePasswordUser,
  IChangePasswordUserAPI,
  IAChangePasswordSuccess,
  IChangePasswordContext,
} from './ChangePasswordInterface';
import {RouteProp} from '@react-navigation/native';

/**
 * I...=> Interface
 * IA...=> Action Interface
 * I...API=> API bodyData Interface
 */

interface IAction {
  type: string;
  payload: any;
  error?: string;
  Message?: string;
}
interface IThemeColors {
  background: string;
  foreground: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
  borderColor: string;
  tintColor: string;
  primary: string;
  success: string;
  danger: string;
  failure: string;
  buttonLoaderColor: string;
}
interface ITheme {
  colors: IThemeColors;
  isPortrait?: boolean;
}
interface ICommonContext {
  loading: boolean;
  setLoading: (loading: boolean) => void | undefined;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
  infoData: any;
  setInfoData: (val: any) => void;
  isOffline: boolean;
  signInsurance: boolean;
  setSignInsurance: (val: boolean) => void;
  insurance: any;
  setInsurance: (val: any) => void;
  storageSize: any;
  setStorageSize: (val: any) => void;
  storagePerMonth: string;
  setStoragePerMonth: (val: string) => void;
  licenseImg: string;
  setLicenseImg: (val: string) => void;
  documentImg: any;
  setDocumentImg: (val: any) => void;
  isCheckedAddress:boolean;
  setIsCheckedAddress: (val: boolean) => void;
  creditCardDetail:any;
  setCreditCardDetail: (val: any) => void;
}

interface IContext {
  theme: ITheme;
  commonContext: ICommonContext;
  signInContext: ISignInContext;
  signUpContext: ISignUpContext;
  forgotPasswordContext: IForgotPasswordContext;
  changePasswordContext: IChangePasswordContext;
  signInsurance: boolean;
  insurance: string;
  setInsurance: (val: string) => void;
  isCheckedAddress:boolean;
  creditCardDetail:any
}
interface INavigation {
  navigate: (screen: string, data?: any) => void;
  goBack: () => void;
  toggleDrawer: () => void | undefined;
}
interface IApi {
  url: string;
  body?: object;
  isToken?: boolean;
  method?: string;
  header?: object;
  isFormData?: boolean;
}

export type {
  IAction,
  ITheme,
  IContext,

  //? SignUpInterface
  IASignUpUser,
  ISignUpUserAPI,
  IASignUpSuccess,

  //? forgotPasswordInterface
  IAForgotPasswordUser,
  IForgotPasswordUserAPI,
  IAForgotPasswordSuccess,

  //? changePasswordInterface
  IAChangePasswordUser,
  IChangePasswordUserAPI,
  IAChangePasswordSuccess,

  //? ApiInterface
  IApi,

  //? SignInInterface
  IASignInUser,
  ISignInUserAPI,
  IASignInSuccess,

  //? NavigationInterface
  INavigation,
};
