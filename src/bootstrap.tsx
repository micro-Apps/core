import React from 'react';
import ReactDOM from 'react-dom';
import Authorized from "@components/Authorized";
import LoginPage from '@pages/Login';
import { GlobalContext, useRouterContext, useGlobalConfigContext } from './context/common-context';
import Main from "./main";

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
    const mainContainer: Element = document.getElementById('main');
    ReactDOM.render(<MainApp />, mainContainer);
}

bootstrapMainApp();
