import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { getRegisterMicroApps } from "./dealConfig";

export function isNeedLoadEmpty(menu: MainMenu) {
    const config = getRegisterMicroApps(menu);
    const getNeedLoadEmpty = () => {
        let result = true;
        config.forEach((item) => {
            if(item.activeRule(window.location)) {
                result = false;
            }
        });
        
        return result;
    }
    return getNeedLoadEmpty();
};

export default function (config: MainMenu): void {
    const microConfig = getRegisterMicroApps(config);
    registerMicroApps(microConfig);
    addGlobalUncaughtErrorHandler((event: any) => {
        if (event.type === 'error') {
            // window.history.pushState({}, '', '/error');
        }
    });
    start();
}
