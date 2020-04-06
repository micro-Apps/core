import React from 'react';
import CheckPermissions from './checkPermissions';
import { UserInfo, GetCurrentAuthority } from '@utils/index';

interface AuthorizeProps {
    author: string[];
    children: React.ReactElement;
    userInfo?: UserInfo;
}

const Authorize: React.FC<AuthorizeProps> = (props) => {
    const { author, children, userInfo } = props;
    return <CheckPermissions authority={author} target={children} userInfo={userInfo}/>
}

const RenderAuthorize = (userInfo: UserInfo) => {
    return ({ author, children }): React.FC<AuthorizeProps> => <CheckPermissions authority={author} userInfo={userInfo} target={children}/>
}

let Authorized = RenderAuthorize(GetCurrentAuthority())

export function reloadAuthorized() {
    console.log('reloadAuthorized');
    Authorized = RenderAuthorize(GetCurrentAuthority());
}
export default Authorized;