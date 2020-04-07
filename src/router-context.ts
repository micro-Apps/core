import React, { useState } from 'react';

interface RouterContextValue {
    value: string[];
    change: (params?: string[]) => void;
}
export function useRouterContext(): RouterContextValue {
    const [value, change] = useState(['', '']);
    return {value, change};
}

export const RouterContext = React.createContext<RouterContextValue>({
    value: ['', ''],
    change: () => undefined,
});
