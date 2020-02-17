import { bootstrapMainApp } from "./app";
import registeredMicroApps from "./loadMicroApp/registerMicroApps";
import { GlobalConfig } from './global.config.interface';

const globalConfig: GlobalConfig = {
    name: '星巴克新零售管理系统',
    logo: 'https://www-static.chinacdn.starbucks.com.cn/prod/assets/images/logo.svg',
    menu: {
        mode: 'inline',
        subMenu: [
            {
                iconType: 'mail',
                title: '数据盘',
                key: 'sub1',
                options: [{
                    title: '业绩数据',
                    key: '1',
                    config: {
                        name: 'react app',
                        entry: '//localhost:7100',
                        path: '/react',
                    }
                }, {
                    title: '门店数据',
                    key: '2',
                    config: {
                        name: 'vue app',
                        entry: '//localhost:7102',
                        path: '/node',
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
