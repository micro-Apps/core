import React from 'react';
import { Redirect } from 'react-router-dom';

export const USER_INFO_KEY = 'user_info';
interface UserInfo {
    role: string;
    phone: string;
    avatar: string;
    name: string;
}

function GetCurrentAuthority(): UserInfo {
    const itemStr = localStorage.getItem(USER_INFO_KEY);
    let result: UserInfo;
    try {
        result = JSON.parse(itemStr) || {};
    } catch {
        result = {} as UserInfo;
    }
    return result;
}

interface CheckUserLogin {
    (currentRole: string | undefined): boolean;
}
const checkUserLogin: CheckUserLogin = (currentRole) => (currentRole && currentRole !== 'ghost');


interface CheckAllowRole {
    (allowRoles: string[], currentRole: string): boolean;
}
const checkAllowRole: CheckAllowRole = (allowRoles: string[], currentRole: string) => allowRoles.includes(currentRole);



const CheckPermissions: React.FC<{
    authority: string[];
    target: React.ReactElement;
}> = (props) => {
    const { authority, target } = props;
    const userInfo = GetCurrentAuthority();
    const { role } = userInfo;

    if (!checkUserLogin(role)) {
        return (
            <Redirect to="/login" from={location.href}/>
        )
    }
    return checkAllowRole(authority, role) ?  target : (
        <div>权限不足</div>
    )
}

export default CheckPermissions;
