import { registerMicroApps, start } from 'qiankun';
import { renderMicroApp } from './render';
import { genActiveRule } from "./activeRule";

export default function () {
    registerMicroApps([
        {
            name: 'react app',
            entry: '//localhost:7099',
            render: ({ appContent, loading }) => renderMicroApp({ appContent, loading }),
            activeRule: genActiveRule('/node'),
        },
    ]);
    start();
}