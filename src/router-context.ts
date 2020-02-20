import React, { useState, useCallback } from 'react';

// TODO: 删除any类型
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
