
interface IASignInUser {
  username: string | undefined;
  password: string | undefined;
}
interface IASignInSuccess {
  id?: string | null;
  email?: string | null;
  token?: string | null;
  first_name?: string | null;
  email_verified_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  last_name?: string | null;
  profile_pic_name?: string | null;
  phone_number?: string | null;
  user_name?: string | null;
  zip_code?: string | null;
  country_id?: number;
  is_notification_enabled?: number;
  status?: number;
  deleted_at?: string | null;
  role_id?: number;
  is_donor?: number;
  street_address?: string | null;
  street_address_2?: string | null;
  city?: string | null;
  state?: string | null;
  is_first_time_login?: number;
  invited_by?: number;
  available_in_group?: number;
}
interface ISignInUserAPI {
  email: string | undefined;
  password: string | undefined;
}

interface ISignInContext {
  signInResponse: undefined | IASignInSuccess,
  setSignInResponse: (response: undefined | IASignInSuccess) => void,
}

export type {
  IASignInUser,
  ISignInUserAPI,
  IASignInSuccess,
  ISignInContext,
};
