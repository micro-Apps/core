import React from "react";
import ReactDom from "react-dom";
import { Spin } from 'antd';
import { HTMLContentRender } from "qiankun";

const ContainerApp: React.FunctionComponent<{
    loading: boolean;
    appContent: string;
}> = props => {
    const { loading, appContent } = props;
    return (
        <Spin spinning={loading} tip="Loading..." size="large" delay={500}>
            <div style={{ minHeight: '300px' }} dangerouslySetInnerHTML={{ __html: appContent }} />
        </Spin>
    )
}

export const renderMicroApp: HTMLContentRender =  function (params) {
    const { appContent, loading } = params;
    const targetElement: Element = document.getElementById('content');
    ReactDom.render(<ContainerApp loading={loading} appContent={appContent} />, targetElement);
}
