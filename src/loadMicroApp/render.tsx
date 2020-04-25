import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import { Skeleton, Spin } from 'antd';
import { HTMLContentRender } from "qiankun";

const ContainerApp: React.FunctionComponent<{
    loading: boolean;
    appContent: string;
}> = (props) => {
    const { loading, appContent } = props;

    return (
        <Spin spinning={loading}>
            <div style={{minHeight: '200px'}} dangerouslySetInnerHTML={{ __html: appContent }} />
        </Spin>
    )
}

export const renderMicroApp: HTMLContentRender =  function (params) {
    const { appContent, loading } = params;
    const targetElement: Element = document.getElementById('content');

    if (typeof appContent === 'string' && appContent) {
        ReactDom.render(<ContainerApp loading={loading} appContent={appContent} />, targetElement);
    }
}
