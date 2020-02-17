import React from "react";
import { Menu, Icon } from "antd";
import { SubMenu, SubMenuOption } from './menuConfig.interface';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { genActiveRule } from "../../loadMicroApp/activeRule";
import './index.less';

const SubMenuComponent = Menu.SubMenu;

const CreateSubMenuOptions = (config?: SubMenuOption[]): React.ReactNode[] => {
    if (!config) return null;
    const clickItem = (SubMenuOption: SubMenuOption) => {
        const config = SubMenuOption.config;
        return () => window.history.pushState({}, config.name, config.path);
    };
    return config.map(SubMenuOption => (
        <Menu.Item key={SubMenuOption.key} onClick={clickItem(SubMenuOption)}>{SubMenuOption.title}</Menu.Item>
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

const MenuLogo: React.FC<{
    src: string;
}> = ({ src }) => (
    <div className="menu-logo">
        <i className="logo-container">
            <img src={src} alt=""/>
        </i>
    </div>
)

interface SelectKeysAndDefaultOpenKey {
    defaultSelectedKeys: string[];
    defaultOpenKeys: string[];
}

function getCurrentSelectKeysAndDefaultOpenKey(menuConfig: MainMenu): SelectKeysAndDefaultOpenKey {
    let currentSubMenuKey: string;
    let currentMenuOptionsKey: string;

    for (const subMenuConfig  of menuConfig.subMenu) {
        currentSubMenuKey = subMenuConfig.key;
        for (const subMenuOptions of subMenuConfig.options) {
            if (subMenuOptions.config.path ) {
                if (genActiveRule(subMenuOptions.config.path)(location)) {
                    currentMenuOptionsKey = subMenuOptions.key;
                    break;
                }
            }
        }
        if (currentMenuOptionsKey) { break }
    }

    // TODO: 路由对应错误处理 404

    return {
        defaultOpenKeys: [currentSubMenuKey],
        defaultSelectedKeys: [currentMenuOptionsKey],
    }
}

const CommonMenu: React.FC<{
    menuConfig: MainMenu;
    logo: string;
    name: string;
}> = (props) => {
    const { menuConfig, logo } = props;
    const SubMenu = menuConfig.subMenu;
    const { defaultOpenKeys, defaultSelectedKeys } = getCurrentSelectKeysAndDefaultOpenKey(menuConfig);

    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo src={logo}/>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
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