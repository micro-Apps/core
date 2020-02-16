import { registerMicroApps, start } from 'qiankun';
import { MicroMainMenu } from "./micro.config.interface";
import { getRegisterMicroApps } from "./dealConfig";

export default function (config: MicroMainMenu): void {
    const microConfig = getRegisterMicroApps(config);
    registerMicroApps(microConfig);
    start();
}
