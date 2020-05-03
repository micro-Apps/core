import React, { useEffect, useState } from 'react';
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu, { CommonBread } from "@components/GlobalMenu";
import { SubMenu, SubMenuOption } from "@components/GlobalMenu/menuConfig.interface";
import GlobalHeader from '@components/GlobalHeader';
import { GlobalDataConfig, ConfigDto, OptionsDto } from './types/global';

import registeredMicroApps, { isNeedLoadEmpty } from './loadMicroApp/registerMicroApps';
import { getConfig } from './service';
import { RouteComponentProps, Redirect, withRouter } from 'react-router-dom';

import NotFoundPage from "@components/NotFoundPage";
import ErrorPage from "@components/ErrorPage";
import { addGlobalUncaughtErrorHandler, removeGlobalUncaughtErrorHandler } from 'qiankun';

function transform(config: ConfigDto):GlobalDataConfig {
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

    const menu: GlobalDataConfig['menu'] = {
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
    const [config, setConfig] = useState<GlobalDataConfig>();
    useEffect(() => {
        (async () => {
            const response = await getConfig('baidu');
            const globalConfig = transform(response);
            setConfig(globalConfig);
        })();
    }, []);
    return config;
}

const useMicroApp = (config: GlobalDataConfig, props: RouteComponentProps) => {
    const [needRedirect404, setNeedRedirect404] = useState(false);
    const [needRedirect500, setNeedRedirect500] = useState(false);

    useEffect(() => {
        if (!config) return;
        if (isNeedLoadEmpty(config.menu)) {
            setNeedRedirect404(true);
        };
        props.history.listen(() => {
            setNeedRedirect500(false);
            setNeedRedirect404(false);
            if (isNeedLoadEmpty(config.menu) && window.location.pathname !== '/404') {
                setNeedRedirect404(true);
            }
        });
    }, [config]);

    useEffect(() => {
        if (!config) return;
        const handleMicroError: OnErrorEventHandlerNonNull = function (event) {
            // TODO: 针对错误类型做完整处理
            if (typeof event === 'string') {
                return;
            }

            if (event.type === 'error') {
                setNeedRedirect500(true);
            }
        };
        addGlobalUncaughtErrorHandler(handleMicroError)
        return () => removeGlobalUncaughtErrorHandler(handleMicroError);
    }, [config])

    useEffect(() => {
        if (!config) { return }
        setTimeout(() => {
            registeredMicroApps(config.menu)
        }, 0);
    }, [config]);

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
