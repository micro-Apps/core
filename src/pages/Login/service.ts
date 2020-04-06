import { request } from '../../utils/index';

export interface LoginDto {
    username: string;
    password: string;
}

export function login(data: LoginDto) {
    return request({
        url: `/api/auth/login`,
        method: 'POST',
        data,
    });
}