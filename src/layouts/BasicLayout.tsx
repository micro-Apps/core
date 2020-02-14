import React from "react";
import './BasicLayout.less';

interface BasicLayoutProps {
    menu: JSX.Element;
    header: JSX.Element;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { menu, header } = props;

    return (
        <div className="basic-layout">
            <div className="menu">{menu}</div>
            <section>
                <div className="header">{header}</div>
                <div className="content">
                    <div id="content"></div>
                </div>
            </section>
        </div>
    )
};

export default BasicLayout;
