import React, { useEffect, useState } from 'react';
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu, { CommonBread } from "@components/GlobalMenu";
import { SubMenu, SubMenuOption } from "@components/GlobalMenu/menuConfig.interface";
import GlobalHeader from '@components/GlobalHeader';
import { GlobalConfig, ConfigDto, OptionsDto } from './global.config.interface';

import registeredMicroApps, { isNeedLoadEmpty } from './loadMicroApp/registerMicroApps';
import { getConfig } from './service';
import { RouteComponentProps, Redirect, withRouter } from 'react-router-dom';

import NotFoundPage from "@components/NotFoundPage";
import ErrorPage from "@components/ErrorPage";
import { addGlobalUncaughtErrorHandler, removeGlobalUncaughtErrorHandler, registerMicroApps } from 'qiankun';

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
        })();
    }, []);
    return config;
}

const useMicroApp = (config: GlobalConfig, props: RouteComponentProps) => {
    const [needRedirect404, setNeedRedirect404] = useState(false);
    const [needRedirect500, setNeedRedirect500] = useState(false);

    useEffect(() => {
        if (!config) return;
        if (isNeedLoadEmpty(config.menu)) {
            setNeedRedirect404(true);
        };
        props.history.listen(() => {
            // TODO: 需要保证页面首先刷新出content container容器，然后调用注册的子应用进行渲染，目前的逻辑有几率触发错误
            setNeedRedirect500(false);
            if (isNeedLoadEmpty(config.menu) && window.location.pathname !== '/404') {
                setNeedRedirect404(true);
            } else {
                setNeedRedirect404(false);
            }
        });
    }, [config]);

    useEffect(() => {
        if (!config) {return};
        const handleMicroError: OnErrorEventHandlerNonNull = function (event) {
            if (event.type === 'error') setNeedRedirect500(true);
        };
        addGlobalUncaughtErrorHandler(handleMicroError)
        return () => {
            removeGlobalUncaughtErrorHandler(handleMicroError);
        }
    }, [config])


    useEffect(() => {
        if (!config) { return }
        setTimeout(() => {
            registeredMicroApps(config.menu)
        }, 0);
    }, [config])

    return {
        needRedirect404,
        needRedirect500,
    };
}

function useRouterState() {
    return {
        isMainPage: window.location.pathname === '/',
        is404Page: window.location.pathname === '/404',
    }
}

const Main: React.FunctionComponent<RouteComponentProps> = props => {
    const config = useConfig();
    const { needRedirect404, needRedirect500 } = useMicroApp(config, props);
    const { isMainPage } = useRouterState();

    if (!config) return (<></>);

    return (
        <>
            {isMainPage && <Redirect to={config.defaultEntity}/>}
            <BasicLayout
                menu={<CommonMenu menuConfig={config.menu} logo={config.logo} name={config.name}/>}
                header={<GlobalHeader />}
                breadcrumb={<CommonBread />}
            >
                {needRedirect404 && <NotFoundPage />}
                {needRedirect500 && <ErrorPage />}
            </BasicLayout>
        </>
    );
};

export default withRouter(Main);
