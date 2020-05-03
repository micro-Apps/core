import { MainMenu, SubMenuOptionConfig } from "@components/GlobalMenu/menuConfig.interface";
import { RegistrableApp } from 'qiankun';
import { renderMicroApp } from  './render';
import { genActiveRule } from "./activeRule";
import { getObjectKey } from '@utils/index'
import defaultPageConfig from './config/defaultPageConfig';

export function  getMicroAppsConfig(menuConfig: MainMenu): SubMenuOptionConfig[] {
    const { subMenu } = menuConfig;
    const result: SubMenuOptionConfig[] = getObjectKey(subMenu, 'options', 'config');
    return result;
}

export function getRegisterMicroApps(menuConfig: MainMenu): RegistrableApp[] {
    const config = getMicroAppsConfig(menuConfig);

    const result: RegistrableApp[] = config.map(currentPageConfig => ({
        name: currentPageConfig.name,
        entry: currentPageConfig.entry,
        activeRule: genActiveRule(currentPageConfig.path),
        render: ({ appContent, loading }): void => renderMicroApp({ appContent, loading })
    }));

    return [...result, ...defaultPageConfig];
}
