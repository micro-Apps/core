import React from 'react';
import { renderToString } from "react-dom/server";
import { genActiveRule } from "./activeRule";
import { renderMicroApp } from "./render";
import { MicroAppProp } from "qiankun";

import NotFoundPage from '../components/NotFoundPage';

const defaultConfigPage: MicroAppProp[] = [];

const notFoundPage: MicroAppProp = {
    name: '404',
    entry: {
        scripts: [],
        styles: [],
        html: renderToString(<NotFoundPage/>)
    },
    activeRule: genActiveRule('/404'),
    render: ({ appContent }): void => renderMicroApp({ appContent, loading: false })
}

defaultConfigPage.push(notFoundPage);

export default defaultConfigPage;
