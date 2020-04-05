import axios, { AxiosRequestConfig } from 'axios';

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

export function request(config: AxiosRequestConfig) {
    return axios.request(config);
}