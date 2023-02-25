import React, {useState} from 'react';
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../../auth/authConfig";
import {callMsGraph} from "../../auth/graph";
import {ProfileData} from "./ProfileData";
import Button from "react-bootstrap/Button";


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

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

    return (
        <>
            <h5 className="card-title">Profile für {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};

const Profile = () => (
  <div>
    <h1>Home</h1>
    <p><ProfileContent /></p>
  </div>
);

export default Profile;
