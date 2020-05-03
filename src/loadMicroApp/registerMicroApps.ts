import { registerMicroApps, start } from 'qiankun';
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
    // BUG: 子应用卸载之后的 setTimeout事件需要进行清除,多实例处理
    start({singular: true});
}
