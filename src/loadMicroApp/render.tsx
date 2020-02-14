import React from "react";
import ReactDom from "react-dom";

export interface Micro {
    appContent: string,
    loading: boolean,
}

export interface renderMicroApp {
    (params: Micro): void;
}

const Loading: React.FunctionComponent = () => (
    <div>加载中</div>
);

const ContainerApp: React.FunctionComponent<{
    loading: boolean,
    appContent: string,
}> = (props) => {
    const { loading, appContent } = props;

    return loading ? <Loading />: (
        <div dangerouslySetInnerHTML={{ __html: appContent }} />
    )
};

/**
 * 
 * @param params 需要加载的子应用内容
 */
export const renderMicroApp: renderMicroApp =  function (params) {
    const { appContent, loading } = params;
    const targetElement:Element = document.getElementById('container');
    ReactDom.render(<ContainerApp loading={loading} appContent={appContent} />, targetElement);
}
