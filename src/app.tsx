import React from "react";
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu, { CommonBread } from "@components/GlobalMenu";
import GlobalHeader from '@components/GlobalHeader';
import NotFoundPage from '@components/NotFoundPage';
import Authorized from "@components/Authorized";
import LoginPage from '@pages/Login';
import { GlobalConfig } from './global.config.interface';
import { RouterContext, useRouterContext } from './router-context';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const MainApp: React.FunctionComponent<{
  globalConfig: GlobalConfig;
}> = ({ globalConfig: { menu, logo, name } }) => {
  const RouterContextValue = useRouterContext();
  return  (
    <RouterContext.Provider value={RouterContextValue}>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path='/404' component={NotFoundPage} />
          <Route path="/">
            <Authorized author={["admin"]}>
              <BasicLayout
                menu={<CommonMenu menuConfig={menu} logo={logo} name={name}/>}
                header={<GlobalHeader />}
                breadcrumb={<CommonBread />}
              />
            </Authorized>
          </Route>
        </Switch>
      </Router>
    </RouterContext.Provider>
  );
}

export default MainApp;
