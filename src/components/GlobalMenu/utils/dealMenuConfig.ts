import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { genActiveRule } from "../../../loadMicroApp/activeRule";

interface CurrentSelectKeys {
    currentSubMenuKey: string;
    currentSubMenuOptionsKey: string;
}

interface CurrentBreadcrumbTitle {
    currentSubMenuTitle: string;
    currentSubMenuOptionsTitle: string;
}

interface CurrentSelectIndex {
    subMenuIndex: number;
    subMenuOptionsIndex: number;
}

function getCurrentBreadcrumbTitle(menuConfig: MainMenu, currentSelectIndex: CurrentSelectIndex): CurrentBreadcrumbTitle {
    const { subMenuIndex, subMenuOptionsIndex } = currentSelectIndex;
    const subMenu = menuConfig.subMenu;
    return {
        currentSubMenuTitle: subMenu[subMenuIndex].title,
        currentSubMenuOptionsTitle: subMenu[subMenuIndex].options[subMenuOptionsIndex].title,
    }
}


function getCurrentSelectKeys(menuConfig: MainMenu, currentSelectIndex: CurrentSelectIndex): CurrentSelectKeys {
    const { subMenuIndex, subMenuOptionsIndex } = currentSelectIndex;
    const subMenu = menuConfig.subMenu;
    return {
        currentSubMenuKey: subMenu[subMenuIndex].key,
        currentSubMenuOptionsKey: subMenu[subMenuIndex].options[subMenuOptionsIndex].key,
    }
}

type GetCurrentSelectKeysAndDefaultOpenKey = (menuConfig: MainMenu) => CurrentBreadcrumbTitle & CurrentSelectKeys;
export const getCurrentSelectKeysAndDefaultOpenKey:GetCurrentSelectKeysAndDefaultOpenKey = function (menuConfig) {
    let subMenuIndex = 0;
    let subMenuOptionsIndex = 0;
    let isExist = false;

    for (const subMenuConfig  of menuConfig.subMenu) {
        subMenuIndex = 0;
        for (const subMenuOptions of subMenuConfig.options) {
            if (subMenuOptions.config.path ) {
                if (genActiveRule(subMenuOptions.config.path)(location)) {
                    isExist = true;
                    break;
                }
            }
            subMenuOptionsIndex++;
        }
        if (isExist) { break }
        subMenuOptionsIndex++;
    }

    // TODO: 路由对应错误处理
    if (!isExist) {
        subMenuIndex = 0;
        subMenuOptionsIndex = 0;
    }

    return {
        ...getCurrentSelectKeys(menuConfig, { subMenuIndex, subMenuOptionsIndex }),
        ...getCurrentBreadcrumbTitle(menuConfig, { subMenuIndex, subMenuOptionsIndex }),
    }
}

