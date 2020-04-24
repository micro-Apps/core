import React, { useEffect, useState } from 'react';
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu, { CommonBread } from "@components/GlobalMenu";
import { SubMenu, SubMenuOption } from "@components/GlobalMenu/menuConfig.interface";
import GlobalHeader from '@components/GlobalHeader';
import { GlobalConfig, ConfigDto, OptionsDto } from './global.config.interface';

import registeredMicroApps, { isNeedLoadEmpty } from './loadMicroApp/registerMicroApps';
import { getConfig } from './service';
import { RouteComponentProps, Redirect, withRouter } from 'react-router-dom';

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

const useMicroApp = (config: GlobalConfig, props: RouteComponentProps) => {
    const [needRedirect404, setNeedRedirect] = useState(false);
    useEffect(() => {
        if (!config) return;
        if (isNeedLoadEmpty(config.menu)) {
            setNeedRedirect(true);
        };
        props.history.listen(() => {
            if (isNeedLoadEmpty(config.menu) && window.location.pathname !== '/404') {
                setNeedRedirect(true);
            } else {
                setNeedRedirect(false);
            }
        });
    }, [config]);

    return needRedirect404;
}

function useRouterState() {
    return {
        isMainPage: window.location.pathname === '/',
        is404Page: window.location.pathname === '/404',
    }
}

// TODO: 子应用报错情况处理
const Main: React.FunctionComponent<RouteComponentProps> = props => {
    const config = useConfig();
    const needRedirect404 = useMicroApp(config, props);
    const { is404Page, isMainPage } = useRouterState();

    if (!config) return (<></>);

    return (
        <>
            {needRedirect404 && <Redirect to="/404" />}
            {isMainPage && <Redirect to={config.defaultEntity}/>}
            <BasicLayout
                menu={<CommonMenu menuConfig={config.menu} logo={config.logo} name={config.name}/>}
                header={<GlobalHeader />}
                breadcrumb={<CommonBread />}
            />
            
        </>
    );
};

export default withRouter(Main);
