import loadable from '@loadable/component';
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalConfig } from './global.config.interface';
import PageLoading from '@components/PageLoading/loading';

/**
 * {
 *  fallback: <PageLoading />
 *  }
 * 如果需要懒加载
 */
const MainApp: React.FC<{
    globalConfig: GlobalConfig;
}> = loadable(() => import('./app'));

export function bootstrapMainApp(globalConfig: GlobalConfig): void {
    const mainContainer: Element = document.getElementById('main');
    ReactDOM.render(<MainApp globalConfig={globalConfig} />, mainContainer);
}
