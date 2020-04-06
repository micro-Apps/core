import { Alert, Checkbox } from 'antd';
import React from 'react';
import { Router, RouteComponentProps } from 'react-router-dom';

import LoginFrom from './components/Login';
import { login, LoginDto } from './service';
import styles from './style.less';
import UserLayout from '@layouts/UserLayout';
import { SetCurrentAuthority, getPageQuery } from '@utils/index';
import { reloadAuthorized } from '@components/Authorized';

const { UserName, Password, Submit } = LoginFrom;

const Login: React.FC<RouteComponentProps> = props => {
  const onSubmit = async (data: LoginDto) => {
    const response = await login(data)
    SetCurrentAuthority(response.data);
    reloadAuthorized();
    const urlParams = new URL(window.location.href);
    const params = getPageQuery();
    let { redirect } = params as { redirect: string };
    if (redirect) {
      const redirectUrlParams = new URL(redirect);
      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        window.location.href = '/';
        return;
      }
    }
    props.history.push(redirect || '/');
  };


  return (
    <UserLayout>
      <div className={styles.main}>
        <LoginFrom onSubmit={onSubmit}>
            <UserName
              name="username"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          <div>
            <Checkbox>
              自动登录
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
          <Submit>登录</Submit>
        </LoginFrom>
      </div>
    </UserLayout>
  );
};

export default Login;
