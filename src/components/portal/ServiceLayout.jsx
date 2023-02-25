/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import {useIsAuthenticated, useMsal} from '@azure/msal-react';
import { SignInButton } from '../auth/SignInButton';
import { SignOutButton } from '../auth/SignOutButton';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Profile from '../services/Profile';
import Topic_Schule from './Topic_Schule';
import Topic_Schueler from './Topic_Schueler';
import Topic_Favoriten from "./Topic_Favoriten";

const styles = {
    background: '#000',
    width: '2px',
    cursor: 'col-resize',
    margin: '0 5px',
    height: '100%',
};
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const ServiceLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts } = useMsal();

    return (
        <>
            <h5>
                <center>Service für  {accounts[0].name}</center>
                <Router>
                    <SplitPane
                    split="vertical"
                    minSize={100}
                    defaultSize={100}
                    resizerStyle={styles}
                >
                    <menu>
                        <div><Link to="/">Profile</Link></div>
                        <div><Link to="/topic_favoriten">Favoriten</Link></div>
                        <div><Link to="/topic_schule">Schule</Link></div>
                        <div><Link to="/topic_schueler">Schüler</Link></div>

                    </menu>
                    <div>
                        <Route exact path="/" component={Profile} />
                        <Route path="/topic_favoriten" component={Topic_Favoriten} />
                        <Route path="/topic_schule" component={Topic_Schule} />
                        <Route path="/topic_schueler" component={Topic_Schueler} />
                    </div>
                </SplitPane>
                </Router>
            </h5>
            <br />
            <br />
            {props.children}
        </>
    );
};
