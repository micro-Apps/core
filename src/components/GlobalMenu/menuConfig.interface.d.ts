export interface MainMenu {
    mode: string;
    subMenu: SubMenu[];
}

export interface SubMenu {
    iconType: string;
    title: string;
    key: string;
    options?: SubMenuOption[];
}

export interface SubMenuOption {
    title: string;
    key: string;
    config: SubMenuOptionConfig;
}

export interface SubMenuOptionConfig {
    name: string; // 名称
    entry: string; // 远程地址
    path: string; // 路由
}
