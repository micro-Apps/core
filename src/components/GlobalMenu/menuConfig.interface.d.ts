export interface MainMenu {
    defaultSelectedKeys: string[];
    defaultOpenKeys: string[];
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
}
