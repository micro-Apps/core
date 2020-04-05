import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import React from 'react';
import styles from './UserLayout.less';
import { Link } from 'react-router-dom';
import logo from '@assets/logo.jpeg';

export interface UserLayoutProps {
  name?: string;
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const { children } = props;

  return (
    <>
      <Helmet>
        <title>登录</title>
        <meta name="description" content={'登录'} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>配置中心</span>
              </Link>
            </div>
            <div className={styles.desc}>微前端子系统-配置中心欢迎您的使用</div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default UserLayout;
