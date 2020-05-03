import React from 'react';
import ReactDOM from 'react-dom';
import Authorized from "@components/Authorized";
import LoginPage from '@pages/Login';
import Main from "./main";
import { GlobalContext, useRouterContext, useGlobalConfigContext } from './context/common-context';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

const MainApp: React.FunctionComponent = props => {
    const RouterInfoContextValue = useRouterContext();
    const globalContextValue = useGlobalConfigContext();

    return  (
        <GlobalContext.Provider value={{...RouterInfoContextValue, ...globalContextValue }}>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/">
                        <Authorized author={["ADMIN"]}>
                            <Main />
                        </Authorized>
                    </Route>
                </Switch>
            </Router>
        </GlobalContext.Provider>
    );
}

function bootstrapMainApp(): void {
    const mainContainer = document.getElementById('main');
    ReactDOM.render(<MainApp />, mainContainer);
}

bootstrapMainApp();
