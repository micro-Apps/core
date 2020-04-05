declare module "*.less";
declare module "*.png";
declare module "*.jpeg";

declare module "@loadable/component" {
    // TODO: 完善loadable类型
    const loadable: any;
    export default loadable;
}

declare module "qiankun" {
    interface RenderParams {
        appContent: string;
        loading: boolean;
    }
    export interface MicroAppProp {
        name: string;
        entry: string;
        render: (params: RenderParams) => void;
        activeRule: (params: any) => boolean;
    }
    
    type EffectFunction = (app: string) => any;
    
    interface RegisterMicroAppsConfig {
        beforeLoad: EffectFunction[];
        beforeMount: EffectFunction[];
        afterUnmount: EffectFunction[];
    }
    
    export const start: () => void;
    export const registerMicroApps: (microAppProps: MicroAppProp[], config?: RegisterMicroAppsConfig) => void;
    
}