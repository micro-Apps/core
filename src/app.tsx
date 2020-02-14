import React from "react";
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu from "@components/GlobalMenu";
import GlobalHeader from '@components/GlobalHeader';
import NotFoundPage from '@components/NotFoundPage';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from '@pages/Login';

// TODO: 404重定向
// TODO: 登录重定向
// TODO: 请求接口生成（路由）和（乾坤配置文件）
// TODO: 权限组件的完成

const MainApp: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path='/404' component={NotFoundPage} />
      <Route path="/">
        <BasicLayout
          menu={<CommonMenu />}
          header={<GlobalHeader />}
        />
      </Route>
    </Switch>
  </Router>
);

export default MainApp;
