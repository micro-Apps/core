import { parse } from 'querystring';
import axios, { AxiosRequestConfig } from 'axios';
import { USER_INFO_KEY, RoleType } from '../constant';

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
     }
    return result;
}

export async function request(config: AxiosRequestConfig) {
    const response = await axios.request(config);
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

export function SetCurrentAuthority(info: UserInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
}
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
