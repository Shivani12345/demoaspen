interface IAForgotPasswordUser {
  username: string | undefined;
}

interface IAForgotPasswordSuccess {
  status?: number | string;
  msg: string | undefined,
  version: number | string | undefined,
  code: number
}
interface IForgotPasswordUserAPI {
  email: string | undefined;
}

interface IForgotPasswordContext {
  forgotPasswordResponse: undefined | IAForgotPasswordSuccess,
  setForgotPasswordResponse: (response: undefined | IAForgotPasswordSuccess) => void,
}

export type {
  IAForgotPasswordUser,
  IForgotPasswordUserAPI,
  IAForgotPasswordSuccess,
  IForgotPasswordContext,
};
