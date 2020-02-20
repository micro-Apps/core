import React, { useContext, useCallback, useMemo, useImperativeHandle } from "react";
import { Menu, Icon, Breadcrumb } from "antd";
import { SubMenu, SubMenuOption } from './menuConfig.interface';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { genActiveRule } from "../../loadMicroApp/activeRule";
import './styles/index.less';
import { RouterContext } from '../../router-context';

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
                    <Icon type={SubMenuConfig.iconType} />
                    <span>{SubMenuConfig.title}</span>
                </span>
            }
        >
            {CreateSubMenuOptions(SubMenuConfig.options, SubMenuConfig.title)}
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
    defaultSelectedKeys: string;
    defaultOpenKeys: string;
}

interface BreadcrumbTitle {
    defaultOpenIndex: number;
    defaultSelectedIndex: number;
}

type GetCurrentSelectKeysAndDefaultOpenKey = (menuConfig: MainMenu) => SelectKeysAndDefaultOpenKey & BreadcrumbTitle;
const getCurrentSelectKeysAndDefaultOpenKey:GetCurrentSelectKeysAndDefaultOpenKey = function (menuConfig) {
    let currentSubMenuKey: string;
    let currentMenuOptionsKey: string;
    let defaultSelectedIndex = 0;
    let defaultOpenIndex = 0;

    for (const subMenuConfig  of menuConfig.subMenu) {
        currentSubMenuKey = subMenuConfig.key;
        defaultSelectedIndex = 0;
        for (const subMenuOptions of subMenuConfig.options) {
            if (subMenuOptions.config.path ) {
                if (genActiveRule(subMenuOptions.config.path)(location)) {
                    currentMenuOptionsKey = subMenuOptions.key;
                    break;
                }
            }
            defaultSelectedIndex++;
        }
        if (currentMenuOptionsKey) { break }
        defaultOpenIndex++;
    }

    // TODO: 路由对应错误处理 
    if (!currentMenuOptionsKey) {
        currentSubMenuKey = '';
        currentMenuOptionsKey = '';
        defaultSelectedIndex = 0;
        defaultOpenIndex = 0;
    }

    return {
        defaultOpenKeys: currentSubMenuKey,
        defaultSelectedKeys: currentMenuOptionsKey,
        defaultSelectedIndex,
        defaultOpenIndex,
    }
}


const CommonMenu: React.FC<{
    menuConfig: MainMenu;
    logo: string;
    name: string;
}> = (props) => {
    const { menuConfig, logo } = props;
    const SubMenu = menuConfig.subMenu;
    const {
        defaultOpenKeys,
        defaultSelectedKeys,
        defaultOpenIndex,
        defaultSelectedIndex,
    } = getCurrentSelectKeysAndDefaultOpenKey(menuConfig);
    const { change } = useContext(RouterContext);
    useMemo(() => {
        const currentSubMenuTitle = SubMenu[defaultOpenIndex].title;
        const currentSubMenuOptionsTitle = SubMenu[defaultOpenIndex].options[defaultSelectedIndex].title;
        change([currentSubMenuTitle, currentSubMenuOptionsTitle]);
    }, [defaultOpenIndex, defaultSelectedIndex])
    return (
        <div className="menu-container">
            <div className="menu-container-inner">
                <MenuLogo src={logo}/>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={[defaultSelectedKeys]}
                    defaultOpenKeys={[defaultOpenKeys]}
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
        <>
            <Breadcrumb.Item>{value[0]}</Breadcrumb.Item>
            <Breadcrumb.Item>{value[1]}</Breadcrumb.Item>
        </>
    )
}
export default CommonMenu;