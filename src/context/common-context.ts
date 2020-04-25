import React, { useState } from 'react';
import { GlobalCommonConfig, RouterInfo } from 'src/types/global';
import { defaultGlobalCommonConfig } from 'src/config';

interface RouterContextValue {
    routerInfo: RouterInfo,
    routerChange: (data: Partial<RouterInfo>) => void;
}

export function useRouterContext(): RouterContextValue {
    const [routerInfo, setInfo] = useState({
        currentSubMenuTitle: '',
        currentSubMenuOptionsTitle: '',
        currentSubMenuKey: '',
        currentSubMenuOptionsKey: '',
    });
    const routerChange = (data: Partial<RouterInfo>) => {
        setInfo({
            ...routerInfo,
            ...data,
        });
    };
    return {routerInfo, routerChange};
}

interface ConfigContextValue {
    config: Partial<GlobalCommonConfig>,
    configChange: (data: Partial<GlobalCommonConfig>) => void,
}

export function useGlobalConfigContext(): ConfigContextValue {
    const [config, setConfig] = useState(defaultGlobalCommonConfig);

    const configChange = (data: Partial<GlobalCommonConfig>) => {
        setConfig({
            ...config,
            ...data,
        })
    };

    return {
        config,
        configChange,
    }
}

export const GlobalContext = React.createContext<RouterContextValue & ConfigContextValue>({
    routerInfo: {
        currentSubMenuTitle: '',
        currentSubMenuOptionsTitle: '',
        currentSubMenuKey: '',
        currentSubMenuOptionsKey: '',
    },
    routerChange: () => undefined,
    config: defaultGlobalCommonConfig,
    configChange: () => undefined,
});
