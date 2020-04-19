import React, { useCallback, useState } from "react";
import styles from './styles/UserAvatar.less';
import { Avatar, Badge, Menu, Dropdown } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    DisconnectOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { clearUserInfo } from "@utils/index";
import { withRouter } from "react-router-dom";

const UserAvatarOptions = withRouter((props) => {
    const menuItemClick = useCallback(({ key }) => {
        if (key === 'logout') {
            clearUserInfo();
            props.history.replace('/login');
        }
    }, []);

    return (
        <Menu onClick={menuItemClick}>
            <Menu.Item key="center"><UserOutlined />个人中心</Menu.Item>
            <Menu.Item key="setting"><SettingOutlined />个人设置</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><DisconnectOutlined  />退出登录</Menu.Item>
        </Menu>
    )
})


const Notification: React.FC = () => {
    return (
        <div className={styles.notificationContainer}>
            <Badge dot><NotificationOutlined style={{fontSize: '15px'}} /></Badge>
        </div>
    )
};

const Help: React.FC = () => {
    return (
        <div className={styles.helpContainer}>
            <QuestionCircleOutlined style={{fontSize: '15px'}}/>
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
                <div className={styles.userAvatarContainer}>
                    <i className={styles.userAvatarName}><Avatar size="default">G</Avatar></i>
                </div>
            </UserAvatarContainer>
        </>
    )
}

export default UserAvatar;
