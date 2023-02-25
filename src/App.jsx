import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/portal/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { loginRequest } from './auth/authConfig';
import { callMsGraph } from './auth/graph';
import {ServiceLayout} from "./components/portal/ServiceLayout";

/**
 * If a user is authenticated (MS identity)
 * the ServiceContent is used for authorization (backend_authorization-fetch-token)
 * the AccessServiceData component above is rendered.
 * Otherwise Buttons for manuell authentication AND authorization is displayed.
 */
const ServiceContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [accessData, setAccessData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    function AccessServiceData() {

        const accountData = {
            name: accounts,
            id_token: "ich_bin_ein_id_token"
        }
        console.log("**** fetch access data account=", JSON.stringify(accountData));

        fetch('http://localhost:8091/access',{
            method:'POST',
            headers:{
                //'Content-Type':'application/json'
                'Content-Type':'text/plain'
            },
            //body: JSON.stringify(accountData)
            //body: "xxx"
            body: accounts[0].username // accounts[0].name
        })
            .then(response => {
                //console.log("**** fetch access data response=", JSON.stringify(response));
                console.log("**** fetch access data response=", response);
                if(response.status === 200) {
                    return response.text();
                }
            })
            .then( text => {
                console.log("**** fetch ok: access data response.text=", text);
                setAccessData(text);
            })
            .catch(error => console.error("****ERROR Fetch Access:", error));
    }

    return (
        <>
            <h2 className="card-title">Welcome to Kaindorf Portal</h2>
            <span>{RequestProfileData()}</span>
            {graphData ? (
                <span>{AccessServiceData()}</span>
                ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                Request Authentification Information
                </Button>
                )}

            {accessData ? (
                <ServiceLayout graphData={graphData} accessData={accessData}/>
            ) : (
                <Button variant="secondary" onClick={AccessServiceData}>
                    Request Service Information
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated (MS identity) AND authorized (backend_authorization-fetch-token)
 * the ServiceContent component above is rendered.
 * Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                {/*<ProfileContent />*/}
                <ServiceContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your Kaindorf Portal Services.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
