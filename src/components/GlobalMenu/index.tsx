import React, { useContext, useMemo } from "react";
import { Menu, Breadcrumb } from "antd";
import { SubMenu, SubMenuOption } from './menuConfig.interface';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import './styles/index.less';
import { RouterContext } from '../../router-context';
import { getCurrentSelectKeysAndDefaultOpenKey } from "./utils/dealMenuConfig";
import MenuLogo from './MenuAvatar';
import { AppstoreOutlined } from "@ant-design/icons";


const SubMenuComponent = Menu.SubMenu;

const CreateSubMenuOptions = (config?: SubMenuOption[], SubMenuTitle?: string): React.ReactNode[] => {
    if (!config) return null;
    const { change } = useContext(RouterContext);
    const clickItem = (SubMenuOption: SubMenuOption, SubMenuOptionTitle: string) => {
        const config = SubMenuOption.config;
        return () => {
            change([SubMenuTitle, SubMenuOptionTitle]);
            window.history.pushState({}, config.name, config.path)
        };
    };
    return config.map(SubMenuOption => (
        <Menu.Item key={SubMenuOption.key} onClick={clickItem(SubMenuOption, SubMenuOption.title)}>{SubMenuOption.title}</Menu.Item>
    ))
}

const CreateSubMenu = (config: SubMenu[]): React.ReactNode[] => {
    return config.map((SubMenuConfig) => (
        <SubMenuComponent
            key={SubMenuConfig.key}
            title={
                <span>
                    <AppstoreOutlined />
                    <span>{SubMenuConfig.title}</span>
                </span>
            }
        >
            {CreateSubMenuOptions(SubMenuConfig.options, SubMenuConfig.title)}
        </SubMenuComponent>
    ))
}

const CommonMenu: React.FC<{
    menuConfig: MainMenu;
    logo: string;
    name: string;
}> = (props) => {
    const { menuConfig, logo } = props;
    const SubMenu = menuConfig.subMenu;
    const {
        currentSubMenuKey,
        currentSubMenuOptionsKey,
        currentSubMenuOptionsTitle,
        currentSubMenuTitle,
    } = getCurrentSelectKeysAndDefaultOpenKey(menuConfig);
    const { change } = useContext(RouterContext);
    
    useMemo(() => {
        change([currentSubMenuTitle, currentSubMenuOptionsTitle]);
    }, [currentSubMenuOptionsTitle, currentSubMenuTitle]);
    
    console.log(currentSubMenuKey, currentSubMenuOptionsKey);
    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo src={logo}/>
                <Menu
                    style={{ width: 256 }}
                    defaultOpenKeys={[currentSubMenuKey]}
                    defaultSelectedKeys={[currentSubMenuOptionsKey]}
                    mode="inline"
                    theme="dark"
                >
                    {CreateSubMenu(SubMenu)}
                </Menu>
            </div>
        </div>
    )
};

// TODO: Breadcrumb渲染，使用context进行路由的控制
export const CommonBread: React.FC = () => {
    const { value } = useContext(RouterContext);
    return (
        <div style={{minHeight: '7px'}}>
            <Breadcrumb.Item>{value[0]}</Breadcrumb.Item>
            <Breadcrumb.Item>{value[1]}</Breadcrumb.Item>
        </div>
    )
}

export default CommonMenu;
