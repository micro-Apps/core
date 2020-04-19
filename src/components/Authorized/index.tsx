import React from 'react';
import CheckPermissions from './checkPermissions';
import { UserInfo, GetCurrentAuthority } from '@utils/index';

interface AuthorizeProps {
    author: string[];
    children: React.ReactElement;
    userInfo?: UserInfo;
}

const RenderAuthorize = (userInfo: UserInfo): React.FC<AuthorizeProps> => {
    return ({ author, children }) => (<CheckPermissions authority={author} userInfo={userInfo} target={children}/>)
}

let Authorized = RenderAuthorize(GetCurrentAuthority())


const reloadAuthorized = (): void => {
    Authorized = RenderAuthorize(GetCurrentAuthority());
}

export { reloadAuthorized };
export default Authorized;
