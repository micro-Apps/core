import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from '@components/NotFoundPage';
import Authorized from "@components/Authorized";
import LoginPage from '@pages/Login';
import { RouterContext, useRouterContext } from './router-context';
import Main from "./main";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

const MainApp: React.FunctionComponent = props => {
    const RouterContextValue = useRouterContext();

    return  (
        <RouterContext.Provider value={RouterContextValue}>
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path='/404' component={NotFoundPage} />
                <Route path="/">
                    <Authorized author={["ADMIN"]}>
                        <Main />
                    </Authorized>
                </Route>
            </Switch>
        </Router>
        </RouterContext.Provider>
    );
}

function bootstrapMainApp(): void {
    const mainContainer: Element = document.getElementById('main');
    ReactDOM.render(<MainApp />, mainContainer);
}

bootstrapMainApp();
