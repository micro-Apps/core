import React from "react";
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu from "@components/Menu";

const MainApp: React.FunctionComponent = () => (
  <BasicLayout
    menu={<CommonMenu />}
    header={<div>header</div>}
    content={<div />}
  />
);

export default MainApp;
