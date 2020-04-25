import React, { useState } from 'react';
import { GlobalCommonConfig } from 'src/types/global';
import { defaultGlobalCommonConfig } from 'src/config';

interface RouterContextValue {
    value: string[];
    change: (params?: string[]) => void;
}

export function useRouterContext(): RouterContextValue {
    const [value, change] = useState(['', '']);
    return {value, change};
}



interface ConfigContextValue {
    config: Partial<GlobalCommonConfig>,
    configChange: (data: Partial<GlobalCommonConfig>) => void,
}

export function useGlobalConfigContext() {
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
    value: ['', ''],
    change: () => undefined,
    config: defaultGlobalCommonConfig,
    configChange: () => undefined,
});
