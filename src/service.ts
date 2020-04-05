import { request } from '@utils/index';

export function getConfig() {
    return request({
        url: '/api/micro/config/', 
        method: 'GET',
    })
}
