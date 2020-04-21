import React, { useState } from "react";
import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

interface BasicLayoutProps {
    menu: JSX.Element;
    header: JSX.Element;
    breadcrumb?: JSX.Element;
}

function useToggleCollapsed(): [boolean, () => void] {
    const [state, changeState] = useState(false);
    const toggleCollapsed = () => {
        changeState(!state);
    };
    return [state, toggleCollapsed];
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { menu, header, breadcrumb } = props;
    const [collapseState, toggleCollapsed] = useToggleCollapsed();


    const renderContent = () => props.children ? (props.children) : (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumb}</Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <div id="content"/>
            </div>
        </>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
             <Sider
                collapsible
                collapsed={collapseState}
                onCollapse={toggleCollapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                }}
            >
                {menu}
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>{header}</Header>
                <Content style={{ margin: '0 16px' }}>
                    {renderContent()}
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by Genluo</Footer>
            </Layout>            
        </Layout>
    )
};

export default BasicLayout;
