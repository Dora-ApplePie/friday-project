import {instance} from "../login-api/loginAPI";
import axios, {AxiosResponse} from "axios";

export type ForgotPasswordPayloadType = {
    email: string
    from: string
    message: string
}

export type UpdatePasswordPayloadType = {
    password: string
    resetPasswordToken: string
}



export const authApi = {
    me() {
        return instance.post('auth/me', {});
    },
    forgotPassword(data: ForgotPasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, ForgotPasswordPayloadType>(`auth/forgot`, data);
    },
    updatePassword(data: UpdatePasswordPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType>, UpdatePasswordPayloadType>(`auth/set-new-password`, data);
    },
}