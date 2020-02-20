import React, { useCallback } from "react";
import './styles/UserAvatar.less';
import { Avatar, Badge, Menu, Icon, Dropdown, message } from 'antd';

const UserAvatarOptions = () => {
    const menuItemClick = useCallback(({ key }) => {
        message.info(`click on item ${key}`);
    }, []);

    return (
        <Menu onClick={menuItemClick}>
            <Menu.Item key="center"><Icon type="user" />个人中心</Menu.Item>
            <Menu.Item key="setting"><Icon type="setting" />个人设置</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><Icon type="disconnect" />退出登录</Menu.Item>
        </Menu>
    )
}

const Notification: React.FC = () => {
    return (
        <div className="notification-container">
            <Badge dot><Icon type="notification" style={{fontSize: '15px'}} /></Badge>
        </div>
    )
};

const Help: React.FC = () => {
    return (
        <div className="help-container">
            <Icon type="question-circle" style={{fontSize: '15px'}}/>
        </div>
    )
}

const UserAvatarContainer: React.FC<{
    children: React.ReactChild;
}> = (props) => {
    const { children } = props;

    return (
        <Dropdown
            placement="bottomRight"
            overlay={<UserAvatarOptions />}
        >
            {children}
        </Dropdown>
    )
};

const UserAvatar: React.FC<{
    name: string;
}> = (props) => {
    const { name } = props;

    return (
        <>
            <Help />
            <Notification />
            <UserAvatarContainer>
                <div className="userAvatar-container">
                    <i className="userAvatar-avatar"><Avatar size="default">G</Avatar></i>
                </div>
            </UserAvatarContainer>
        </>
    )
}

export default UserAvatar;
