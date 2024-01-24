/* eslint-disable indent */
interface IASignUpUser {
    first_name: string | null;
    last_name: string | null;
    username: string | undefined;
    password: string | undefined;
    phone_number: string | number,
    country_id: string | number,
    zip_code: string | number,
}

interface IASignUpSuccess {
    id?: string | null;
    email?: string | null;
    first_name?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    last_name?: string | null;
    phone_number?: string | null;
    zip_code?: string | null;
    country_id?: number;
    status?: number;
    deleted_at?: string | null;
    role_id?: number;
    invited_by?: number;
}
interface ISignUpUserAPI {
    first_name: string | null;
    last_name: string | null;
    email: string | undefined;
    password: string | undefined;
    phone_number: string | number,
    country_id: string | number,
    zip_code: string | number,
}

interface ISignUpContext {
    signUpResponse: undefined | IASignUpSuccess,
    setSignUpResponse: (response: undefined | IASignUpSuccess) => void,
}

export type {
    IASignUpUser,
    ISignUpUserAPI,
    IASignUpSuccess,
    ISignUpContext,
};
