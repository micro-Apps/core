import React from "react";
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu from "@components/GlobalMenu";
import GlobalHeader from '@components/GlobalHeader';
import NotFoundPage from '@components/NotFoundPage';
import Authorized from "@components/Authorized";
import ReactDOM from 'react-dom';
import { LoadableLogin } from '@pages/loadable';
import { GlobalConfig } from './global.config.interface';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// TODO: 404重定向
// TODO: 权限组件完成


const MainApp: React.FunctionComponent<{
  globalConfig: GlobalConfig;
}> = ({ globalConfig: { menu, logo, name } }) => (
  <Router>
    <Switch>
      <Route path="/login" component={LoadableLogin}/>
      <Route path='/404' component={NotFoundPage} />
      <Route path="/">
        <Authorized author={["admin"]}>
          <BasicLayout
            menu={<CommonMenu menuConfig={menu} logo={logo} name={name}/>}
            header={<GlobalHeader />}
          />
        </Authorized>
      </Route>
    </Switch>
  </Router>
);

export function bootstrapMainApp(globalConfig: GlobalConfig): void {
  const mainContainer: Element = document.getElementById('main');
  ReactDOM.render(<MainApp globalConfig={globalConfig} />, mainContainer);
}

export default MainApp;
