import { parse } from 'querystring';
import axios, { AxiosRequestConfig } from 'axios';
import { USER_INFO_KEY, RoleType, USER_KEY, AUTHORITY_KEY } from '../constant';

/**
 * 数组中对象中取一项
 * @param arr 
 * @param keys 
 */
export function getObjectKey(arr: any[], ...keys: string[]): any {
    // TODO: 类型描述
    // TODO: 更多情况处理
    let result = [];
    let currentArr = arr;

    for (const key of keys) {
        result = currentArr.map(target => target[key]);
        currentArr = result.flat(1);
     };
    return result;
}

export async function request(config: AxiosRequestConfig) {
    const { token } = GetCurrentAuthority();
    const response = await axios.request({
        ...config,
        headers: {
            'Authorization': token
        }
    });
    return response.data;
}
interface Business {
    id: string;
    name: string;
    logo: string;
    domain: string;
    describe: string;
}

export interface UserInfo {
    userId: string;
    username: string;
    role: RoleType;
    business: Business[];
    token: string;
}
export function GetCurrentAuthority(): UserInfo {
    const itemStr = localStorage.getItem(USER_INFO_KEY);
    let result: UserInfo;
    try {
        result = JSON.parse(itemStr) || {};
    } catch {
    }
    return result;
}

export function setUserInfo(info: UserInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
}

export function clearUserInfo() {
    localStorage.removeItem(USER_INFO_KEY);
}

export function setAuthority(params: string[]) {
    localStorage.setItem(AUTHORITY_KEY, JSON.stringify(params));
}

export function clearAuthority() {
    localStorage.removeItem(AUTHORITY_KEY);
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


export class Deferred<T> {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    promise: Promise<T>;
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    resolve!: (value?: T | PromiseLike<T>) => void;
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    reject!: (reason?: any) => void;
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor() {
        this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        });
    }
}
