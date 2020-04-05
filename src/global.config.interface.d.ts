import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';

/**
 * 路由配置项
 */
export interface GlobalConfig {
    name: string;
    logo: string;
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