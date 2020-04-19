import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserInfo } from '@utils/index';

type CheckUserLogin = (currentRole: string | undefined) => boolean;
const checkUserLogin: CheckUserLogin = (currentRole) => (currentRole && currentRole !== 'ghost');


type CheckAllowRole = (allowRoles: string[], currentRole: string) => boolean;
const checkAllowRole: CheckAllowRole = (allowRoles: string[], currentRole: string) => allowRoles.includes(currentRole);

const CheckPermissions: React.FC<{
    authority: string[];
    target: React.ReactElement;
    userInfo: UserInfo;
}> = (props) => {
    const { authority, target, userInfo } = props;
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
