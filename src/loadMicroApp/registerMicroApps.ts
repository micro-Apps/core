import { registerMicroApps as qiankunRegister, start } from 'qiankun';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { getRegisterMicroApps } from "./dealConfig";
import { InitError } from 'src/error';
import { isFunction } from 'lodash';

let configMenu: MainMenu;

export function isNeedLoadEmpty() {
    if (!configMenu) throw new InitError('微应用未进行初始化');
    const config = getRegisterMicroApps(configMenu);
    return (() => {
        let result = true;
        config.forEach((item) => {
            if(isFunction(item.activeRule) && item.activeRule(window.location)) {
                result = false;
            }
        });
        return result;
    })();
};

export function registerMicroApps (config: MainMenu): void {
    const microConfig = getRegisterMicroApps(config);
    qiankunRegister(microConfig);
    // BUG: 子应用卸载之后的 setTimeout事件需要进行清除,多实例处理
    start({singular: true});
    configMenu = config;
}
