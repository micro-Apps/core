import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';

/**
 * 路由配置项
 */
export interface GlobalDataConfig {
    name: string;
    logo: string;
    defaultEntity: string;
    menu: MainMenu;
}

interface MicroData {
    user: {
        name: string;
        avatar: string;
        logout: Function;
        auth: Function;
    },
    business: {
        name: string;
        logo: string;
        changeBusiness: (businessId: number) =>  void;
    },
}

export interface ModuleDto {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly address: string;
}

export interface OptionsDto {
    readonly id: string;
    readonly name: string;
    readonly router: string;
    readonly module: ModuleDto;
}

export interface SubMenuDto {
    readonly id: string;
    readonly key: string;
    readonly title: string;
    readonly options: OptionsDto[];
}

export interface ConfigDto {
    readonly id: string;
    readonly name: string;
    readonly logo: string;
    readonly describe: string;
    readonly domain: string;
    readonly subMenu: SubMenuDto[];
}

/**
 * 应用样式配置
 */

export interface GlobalCommonConfig {
    theme: 'light' | 'dark',
    collapsed: boolean,
}


export interface RouterInfo {
    currentSubMenuTitle: string;
    currentSubMenuOptionsTitle: string;
    currentSubMenuKey: string;
    currentSubMenuOptionsKey: string;
}
