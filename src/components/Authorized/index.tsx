import React from 'react';
import CheckPermissions from './checkPermissions';

interface AuthorizedProps {
    author: string[];
    children: React.ReactElement;
}

const  Authorized: React.FC<AuthorizedProps> = (props) => {
    const { author, children } = props;
    return <CheckPermissions authority={author} target={children} />
}

export default Authorized;