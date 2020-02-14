import React from "react";
import { Menu, Icon } from "antd";
import { MainMenu, SubMenu, SubMenuOption } from './menuConfig.interface';

import './index.less';
const SubMenuComponent = Menu.SubMenu;

const config: MainMenu = {
    defaultSelectedKeys: ['1'],
    defaultOpenKeys: ['sub1'],
    mode: 'inline',
    subMenu: [
        {
            iconType: 'mail',
            title: '测试1',
            key: 'sub1',
            options: [{
                title: 'option1',
                key: '1',
            }, {
                title: 'option2',
                key: '2',
            }]
        },
        {
            iconType: 'mail',
            title: '测试2',
            key: 'sub2',
            options: [{
                title: 'option1',
                key: '3',
            }, {
                title: 'option2',
                key: '4',
            }]
        },
        {
            iconType: 'mail',
            title: '测试3',
            key: 'sub3',
            options: [{
                title: 'option1',
                key: '5',
            }, {
                title: 'option2',
                key: '6',
            }]
        },
        {
            iconType: 'mail',
            title: '测试1',
            key: 'sub1',
            options: [{
                title: 'option1',
                key: '1',
            }, {
                title: 'option2',
                key: '2',
            }]
        },
        {
            iconType: 'mail',
            title: '测试2',
            key: 'sub2',
            options: [{
                title: 'option1',
                key: '3',
            }, {
                title: 'option2',
                key: '4',
            }]
        },
        {
            iconType: 'mail',
            title: '测试3',
            key: 'sub3',
            options: [{
                title: 'option1',
                key: '5',
            }, {
                title: 'option2',
                key: '6',
            }]
        },
        {
            iconType: 'mail',
            title: '测试1',
            key: 'sub1',
            options: [{
                title: 'option1',
                key: '1',
            }, {
                title: 'option2',
                key: '2',
            }]
        },
        {
            iconType: 'mail',
            title: '测试2',
            key: 'sub2',
            options: [{
                title: 'option1',
                key: '3',
            }, {
                title: 'option2',
                key: '4',
            }]
        },
        {
            iconType: 'mail',
            title: '测试3',
            key: 'sub3',
            options: [{
                title: 'option1',
                key: '5',
            }, {
                title: 'option2',
                key: '6',
            }]
        }
    ]
};

const CreateSubMenuOptions = (config?: SubMenuOption[]): React.ReactNode[] => {
    if (!config) return null;

    return config.map(SubMenuOption => (
        <Menu.Item key={SubMenuOption.key}>{SubMenuOption.title}</Menu.Item>
    ))
}

const CreateSubMenu = (config: SubMenu[]): React.ReactNode[] => {
    return config.map((SubMenuConfig) => (
        <SubMenuComponent
            key={SubMenuConfig.key}
            title={
                <span>
                    <Icon type={SubMenuConfig.iconType} />
                    <span>{SubMenuConfig.title}</span>
                </span>
            }
        >
            {CreateSubMenuOptions(SubMenuConfig.options)}
        </SubMenuComponent>
    ))
}

const MenuLogo: React.FC = () => (
    <div className="menu-logo">
        <i className="logo-container"></i>
    </div>
)


export default function CommonMenu(): React.ReactElement {
    const MainMenu = config;
    const SubMenu = config.subMenu;

    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo />
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={MainMenu.defaultOpenKeys}
                    defaultOpenKeys={MainMenu.defaultOpenKeys}
                    mode="inline"
                    theme="dark"
                >
                    {CreateSubMenu(SubMenu)}
                </Menu>
            </div>
        </div>

    )
}