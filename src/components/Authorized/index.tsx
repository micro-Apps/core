import React from 'react';
import CheckPermissions from './checkPermissions';

interface AuthorizedProps {
    author: string[]; // 可进入的权限类型
    children: React.ReactElement;
}

const  Authorized: React.FC<AuthorizedProps> = (props) => {
    const { author, children } = props;
    return <CheckPermissions authority={author} target={children} />
}

export default Authorized;