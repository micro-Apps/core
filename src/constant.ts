export const CONTENT_ID = 'CONTENT_ID';
export const CONTAINER_ID = 'CONTAINER_ID';
export const USER_KEY = 'USER_KEY';
export const USER_INFO_KEY = 'user_info';

export enum RoleType {
    USER = 'USER', // 普通用户权限，没有被管理员分配权限，接口限制
    ADMIN = 'ADMIN', // 超级管理员
    DEVELOPMENT = 'DEVELOPMENT', // 开发模块的同学
    OPERATION = 'OPERATION', // 运营人员
    BUSINESS = 'BUSINESS', // 业务方运营同学
}