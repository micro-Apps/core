import { request } from '@utils/index';
import { ConfigDto } from './types/global';

export async function getConfig(domain: string): Promise<ConfigDto> {
    const response = await request({
        url: `/api/micro/config/${domain}`,
        method: 'GET',
    })
    return response.data;
}
