import React from "react";
import BasicLayout from "@layouts/BasicLayout";
import CommonMenu from "@components/GlobalMenu";
import GlobalHeader from '@components/GlobalHeader';
import IndexPage from '@pages/Dashboard/index';


const MainApp: React.FunctionComponent = () => (
  <BasicLayout
    menu={<CommonMenu />}
    header={<GlobalHeader />}
    content={<IndexPage />}
  />
);

export default MainApp;
