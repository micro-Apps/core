import React from "react";
import { Icon } from "antd";
import './loading.less';

const Component: React.FunctionComponent = () => {
    return (
        <div className="loading">
            <div className="container">
                <p>欢迎进入新零售管理系统</p>
                <Icon type="loading" style={{ fontSize: '40px', color: '#08c' }} spin/>
            </div>
            <span>Genluo科技出品</span>
        </div>
    )
}

export default Component;
