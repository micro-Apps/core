import { registerMicroApps, start } from 'qiankun';
import { renderMicroApp } from './render';
import { genActiveRule } from "./activeRule";

export default function (): void {
    registerMicroApps([
        {
            name: 'react app',
            entry: '//localhost:7099',
            render: ({ appContent, loading }): void => renderMicroApp({ appContent, loading }),
            activeRule: genActiveRule('/node'),
        },
    ]);
    start();
}