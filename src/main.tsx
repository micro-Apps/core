import React, { useEffect, useState } from 'react';
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu, { CommonBread } from "@components/GlobalMenu";
import { SubMenu, SubMenuOption } from "@components/GlobalMenu/menuConfig.interface";

import GlobalHeader from '@components/GlobalHeader';
import { GlobalConfig, ConfigDto, OptionsDto } from './global.config.interface';

import registeredMicroApps from './loadMicroApp/registerMicroApps';
import { getConfig } from './service';
import { RouteProps, Redirect } from 'react-router-dom';

function transform(config: ConfigDto):GlobalConfig {
    let defaultEntity = '';
    const setDefaultEntity = (entity: string): void => {
        if (!defaultEntity) {defaultEntity = entity}
    };

    const transformOptions = (data: OptionsDto[]): SubMenuOption[] => {
        return data.map(item => {
            setDefaultEntity(item.router);
            return ({
                title: item.name,
                key: item.id,
                config: {
                    name: item.name, // 名称
                    entry: item.module.address, // 远程地址
                    path: `${item.router}`, // 路由
                }
            });
        })
    };

    const transformMenu = (data: ConfigDto['subMenu']): SubMenu[] => {
        return data.map(item => ({
            iconType: item.id,
            title: item.title,
            key: item.key,
            options:transformOptions(item.options),
        }));
    };

    const menu: GlobalConfig['menu'] = {
        mode: 'inline',
        subMenu: transformMenu(config.subMenu),
    }

    return {
        name: config.name,
        logo: config.logo,
        defaultEntity: defaultEntity,
        menu: menu
    }
}

function useConfig() {
    const [config, setConfig] = useState<GlobalConfig>();
    useEffect(() => {
        (async () => {
            const response = await getConfig('baidu');
            const globalConfig = transform(response);
            setConfig(globalConfig);
            registeredMicroApps(globalConfig.menu);
        })();
    }, []);
    return config;
}

const Main: React.FunctionComponent<RouteProps> = props => {
    const config = useConfig();
    if (!config) return (<></>);

    return (
        <>
            <Redirect to={config.defaultEntity}/>
            <BasicLayout
                menu={<CommonMenu menuConfig={config.menu} logo={config.logo} name={config.name}/>}
                header={<GlobalHeader />}
                breadcrumb={<CommonBread />}
            />
        </>
    );
};

export default Main;
