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
        currentSubMenuTitle: subMenuIndex >= 0 ? subMenu[subMenuIndex].title : '',
        currentSubMenuOptionsTitle: (subMenuIndex >= 0 && subMenuOptionsIndex >= 0) ? subMenu[subMenuIndex].options[subMenuOptionsIndex].title : '',
    }
}


function getCurrentSelectKeys(menuConfig: MainMenu, currentSelectIndex: CurrentSelectIndex): CurrentSelectKeys {
    const { subMenuIndex, subMenuOptionsIndex } = currentSelectIndex;
    const subMenu = menuConfig.subMenu;
    return {
        currentSubMenuKey: subMenuIndex >= 0 ? subMenu[subMenuIndex].key : '',
        currentSubMenuOptionsKey: (subMenuIndex >= 0 && subMenuOptionsIndex >= 0) ? subMenu[subMenuIndex].options[subMenuOptionsIndex].key : '',
    }
}

export type CurrentSelectInfo = CurrentBreadcrumbTitle & CurrentSelectKeys;
export type GetCurrentSelectKeysAndDefaultOpenKey = (menuConfig: MainMenu) => CurrentSelectInfo;

export const getCurrentSelectKeysAndDefaultOpenKey:GetCurrentSelectKeysAndDefaultOpenKey = function (menuConfig) {
    let subMenuIndex = 0;
    let subMenuOptionsIndex = 0;
    let isExist = false;

    for (const subMenuConfig  of menuConfig.subMenu) {
        subMenuOptionsIndex = 0;
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
        subMenuIndex++;
    }

    if (!isExist) {
        subMenuIndex = -1;
        subMenuOptionsIndex = -1;
    }

    // TODO：路由支持多级，面包屑导航支持多级
    return {
        ...getCurrentSelectKeys(menuConfig, { subMenuIndex, subMenuOptionsIndex }),
        ...getCurrentBreadcrumbTitle(menuConfig, { subMenuIndex, subMenuOptionsIndex }),
    }
}

