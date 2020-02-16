import React from "react";
import { Menu, Icon } from "antd";
import { MainMenu, SubMenu, SubMenuOption } from './menuConfig.interface';

import './index.less';

const SubMenuComponent = Menu.SubMenu;

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

const CommonMenu: React.FC<{
    menuConfig: MainMenu;
    logo: string; // 品牌logo
    name: string; // 系统名称
}> = (props) => {
    const { menuConfig } = props;
    const SubMenu = menuConfig.subMenu;

    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo />
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={menuConfig.defaultOpenKeys}
                    defaultOpenKeys={menuConfig.defaultOpenKeys}
                    mode="inline"
                    theme="dark"
                >
                    {CreateSubMenu(SubMenu)}
                </Menu>
            </div>
        </div>

    )
};
export default CommonMenu;