import { MainMenu, SubMenu, SubMenuOption } from '@components/GlobalMenu/menuConfig.interface';

export interface MicroConfig {
    name: string; // 名称
    entry: string; // 远程地址
    path: string; // 路由
}

export interface MicroSubMenuOption extends SubMenuOption {
    config: MicroConfig;
}

export interface MicroSubMenu extends SubMenu {
    options?: MicroSubMenuOption[];
}

export interface MicroMainMenu extends MainMenu {
    subMenu: MicroSubMenu[];
}

