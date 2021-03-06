import React from 'react';
import { RegistrableApp } from "qiankun";
import { renderToString } from "react-dom/server";
import { genActiveRule } from "../activeRule";
import { renderMicroApp } from "../render";
import NoFoundPage from '@components/NotFoundPage';
import ErrorPage from '@components/ErrorPage';


interface PageConfig {
    name: string;
    component: React.FC<any>,
    router: string;
}

const config: PageConfig[] = [{
    name: 'noFound',
    component: NoFoundPage,
    router: '/404',
}, {
    name: "error",
    component: ErrorPage,
    router: '/error',
}];

function getMicroAppConfig(config: PageConfig[]): RegistrableApp[] {
    const microAppConfig: RegistrableApp[] = config.map(item => ({
            name: item.name,
            entry: {
                styles: [],
                scripts: [],
                html: renderToString(<item.component />)
            },
            activeRule: genActiveRule(item.router),
            render: ({ appContent }): void => renderMicroApp({ appContent, loading: false })
        }
    ));
    return microAppConfig;
}

export default getMicroAppConfig(config);
