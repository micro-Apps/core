declare module "*.less";

declare module "@loadable/component" {
    export default loadable;
}

declare module "qiankun" {
    type renderParams = {
        appContent: string,
        loading: boolean,
    };
    
    interface MicroAppProp {
        name: string,
        entry: string,
        render: (params: renderParams) => void,
        activeRule: (params: any) => boolean,
    }
    
    interface EffectFunction {
        (app: string): any,
    }
    
    interface RegisterMicroAppsConfig {
        beforeLoad: EffectFunction[],
        beforeMount: EffectFunction[],
        afterUnmount: EffectFunction[],
    }
    
    export const start: () => void;
    export const registerMicroApps: (microAppProps: MicroAppProp[], config?: RegisterMicroAppsConfig) => void;
    
}