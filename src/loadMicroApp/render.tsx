import React, { ReactElement } from "react";
import ReactDom from "react-dom";
import { Skeleton, Breadcrumb } from 'antd';

export interface Micro {
    appContent: string | ReactElement;
    loading: boolean;
}

export type RenderMicroApp = (params: Micro) => void;


const ContainerApp: React.FunctionComponent<{
    loading: boolean;
    appContent: string;
}> = (props) => {
    const { loading, appContent } = props;

    return (
        <>
            {loading ? <Skeleton active/> : null}
            <div dangerouslySetInnerHTML={{ __html: appContent }} />
        </>
    )
}

/**
 * 
 * @param params 需要加载的子应用内容
 */
export const renderMicroApp: RenderMicroApp =  function (params) {
    const { appContent, loading } = params;
    const targetElement: Element = document.getElementById('content');

    if (typeof appContent === 'string') {
        ReactDom.render(<ContainerApp loading={loading} appContent={appContent} />, targetElement);
    } else {
        ReactDom.render(<>{appContent}</>, targetElement);
    }
}
