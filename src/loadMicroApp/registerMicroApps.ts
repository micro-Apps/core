import { registerMicroApps, start } from 'qiankun';
import { MainMenu } from '@components/GlobalMenu/menuConfig.interface';
import { getRegisterMicroApps } from "./dealConfig";

export default function (config: MainMenu): void {
    const microConfig = getRegisterMicroApps(config);
    registerMicroApps(microConfig);
    start();
}
