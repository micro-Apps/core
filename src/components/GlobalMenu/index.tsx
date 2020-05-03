import React, { useContext, useEffect, useCallback } from "react";
import { Menu, Breadcrumb } from "antd";
import { SubMenu, SubMenuOption } from './menuConfig.interface';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { GlobalContext } from '../../context/common-context';
import { getCurrentSelectKeysAndDefaultOpenKey } from "./utils/dealMenuConfig";
import MenuLogo from './MenuAvatar';
import { AppstoreOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";

import './styles/index.less';

const SubMenuComponent = Menu.SubMenu;

const CreateSubMenuOptions = (config?: SubMenuOption[], SubMenuTitle?: string): React.ReactNode[] => {
    if (!config) return null;
    const { routerChange } = useContext(GlobalContext);
    const clickItem = (SubMenuOption: SubMenuOption, SubMenuOptionTitle: string) => {
        const config = SubMenuOption.config;
        return () => {
            routerChange({
                currentSubMenuTitle: SubMenuTitle,
                currentSubMenuOptionsTitle: SubMenuOptionTitle,
            });
            setTimeout(() => {
                window.history.pushState({}, config.name, config.path)
            }, 0);
        };
    };
    return config.map(SubMenuOption => (
        <Menu.Item key={SubMenuOption.key} onClick={clickItem(SubMenuOption, SubMenuOption.title)}>{SubMenuOption.title}</Menu.Item>
    ));
}

const CreateSubMenu = (config: SubMenu[]): React.ReactNode[] => {
    const { routerChange } = useContext(GlobalContext);

    return config.map((SubMenuConfig) => (
        <SubMenuComponent
            key={SubMenuConfig.key}
            title={
                <span>
                    <AppstoreOutlined />
                    <span>{SubMenuConfig.title}</span>
                </span>
            }
            onTitleClick={() => {routerChange({currentSubMenuKey: SubMenuConfig.key})}}
        >
            {CreateSubMenuOptions(SubMenuConfig.options, SubMenuConfig.title)}
        </SubMenuComponent>
    ))
}

function useRouterInfo(props: RouteComponentProps, mainMenu: MainMenu) {
    const { routerInfo, routerChange } = useContext(GlobalContext);

    useEffect(() => {
        if (!mainMenu) return;
        props.history.listen(() => {
            const info = getCurrentSelectKeysAndDefaultOpenKey(mainMenu);
            routerChange(info);
        });
        const info = getCurrentSelectKeysAndDefaultOpenKey(mainMenu);
        routerChange(info);
    }, [mainMenu]);

    return {
        routerInfo,
    }
}

const CommonMenu: React.FC<{
    menuConfig: MainMenu;
    logo: string;
    name: string;
} & RouteComponentProps> = (props) => {
    const { menuConfig, logo, name } = props;
    const SubMenu = menuConfig.subMenu;

    const {
        routerInfo: {
        currentSubMenuKey,
        currentSubMenuOptionsKey,
       }
    } = useRouterInfo(props, menuConfig);

    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo src={logo} name={name}/>
                <Menu
                    defaultOpenKeys={[currentSubMenuKey]}
                    defaultSelectedKeys={[currentSubMenuOptionsKey]}
                    openKeys={[currentSubMenuKey]}
                    selectedKeys={[currentSubMenuOptionsKey]}
                    mode="inline"
                    theme="light"
                >
                    {CreateSubMenu(SubMenu)}
                </Menu>
            </div>
        </div>
    )
};

export const CommonBread: React.FC = () => {
    const { routerInfo: {
        currentSubMenuTitle,
        currentSubMenuOptionsTitle,
    } } = useContext(GlobalContext);

    // TODO：面包屑支持导航，子应用支持自定义
    return (
        <div style={{minHeight: '7px'}}>
            <Breadcrumb.Item>{currentSubMenuTitle}</Breadcrumb.Item>
            <Breadcrumb.Item>{currentSubMenuOptionsTitle}</Breadcrumb.Item>
        </div>
    )
}

export default withRouter(CommonMenu);
