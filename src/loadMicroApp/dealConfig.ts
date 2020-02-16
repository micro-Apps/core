import { MicroConfig, MicroMainMenu } from "./microConfig.interface";
import { MainMenu } from "@components/GlobalMenu/menuConfig.interface";
import { MicroAppProp } from 'qiankun';
import { renderMicroApp } from  './render';
import { genActiveRule } from "./activeRule";


/**
 * 数组中对象中取一项
 * @param arr 
 * @param keys 
 */
function getObjectKey(arr: any[], ...keys: string[]): any {
    // TODO: 类型描述
    let result = [];
    let currentArr = arr;
    for (const key of keys) {
        result = currentArr.map(target => target[key]);
        currentArr = result;
     }
    return result;
}

export function  getMicroAppsConfig(menuConfig: MicroMainMenu): MicroConfig[] {
    const { subMenu } = menuConfig;
    const result: MicroConfig[] = getObjectKey(subMenu, 'options', 'config');
    return result;
}


export function getRegisterMicroApps(menuConfig: MicroMainMenu): MicroAppProp[] {
    const config = getMicroAppsConfig(menuConfig);
    const result: MicroAppProp[] = config.map(currentPageConfig => ({
        name: currentPageConfig.name,
        entry: currentPageConfig.entry,
        activeRule: genActiveRule(currentPageConfig.path),
        render: ({ appContent, loading }): void => renderMicroApp({ appContent, loading })
    }));
    return result;
}

export function getMenuConfig(menuConfig: MicroMainMenu): MainMenu {
    return menuConfig;
}