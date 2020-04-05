import { Alert, Checkbox } from 'antd';
import React from 'react';
import LoginFrom from './components/Login';

import styles from './style.less';
import UserLayout from '@layouts/UserLayout';

const { UserName, Password, Submit } = LoginFrom;
interface LoginProps {
  name?: string;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {

  return (
    <UserLayout>
      <div className={styles.main}>
        <LoginFrom>
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
