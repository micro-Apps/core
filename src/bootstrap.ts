import { bootstrapMainApp } from "./app";
import registeredMicroApps from "./loadMicroApp/registerMicroApps";
import { GlobalConfig } from './router.config.interface';

const globalConfig: GlobalConfig = {
    name: '星巴克新零售管理系统',
    logo: 'https://www-static.chinacdn.starbucks.com.cn/prod/assets/images/logo.svg',
    menu: {
        defaultSelectedKeys: ['1'],
        defaultOpenKeys: ['sub1'],
        mode: 'inline',
        subMenu: [
            {
                iconType: 'mail',
                title: '数据盘',
                key: 'sub1',
                options: [{
                    title: '选项一',
                    key: '1',
                    config: {
                        name: 'react app',
                        entry: '//localhost:7100',
                        path: '/react',
                    }
                }]
            }
        ]
    }
}

function bootstrap(): void {
    // 启动主应用
    bootstrapMainApp(globalConfig);
    // 注册子应用
    registeredMicroApps(globalConfig.menu);
}

bootstrap();
