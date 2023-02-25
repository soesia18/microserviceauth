# React single-page application built with MSAL React and Microsoft identity platform

This sample demonstrates how to use:
1. ms identity to login, logout, 
2. conditionally render components to authenticated users,
3. and acquire an access token for a protected resource such as Microsoft Graph.
Also:
4. Fetch a Success Token and Payload for Authorization with the  backend_authorization/server.js 
5. Design Template for Kaindorf Portal with Services
6. Provide some Services 

## Features

This sample demonstrates the following MSAL React concepts:

* Configuration
* Login
* Logout
* Conditionally rendering components for authenticated or unauthenticated users
* Acquiring an access token and calling Microsoft Graph
  Also:
* Fetch a Success Token and Payload for Authorization with the  backend_authorization/server.js 
* Design Template for Kaindorf Portal with Services 
* Provide some Services

## Contents

| File/folder          | Description                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| backend_authorization | Contains express server for authorization token                                                           |
|                      |                                                                                                           |
|                      |                                                                                                           |
|                      |                                                                                                           |
|                      |                                                                                                           |
|                      |                                                                                                           |
| `src`                | Contains all for auth and portal                                                                          |
| `styles`             | Contains styling for the sample                                                                           |
| `components`         | Contains ui components for auth and portal such as sign-in button, sign-out button and navbar             |
| `public`             | Contains static content such as images and the base html                                                  |
| `authConfig.js`      | Contains configuration parameters for the sample.                                                         |
| `App.jsx`            | Contains MSAL React Components and main sample content                                                    |
| `graph.js`           | Provides a helper function for calling MS Graph API.                                                      |                      |
| `index.js`           | Contains the root component and MsalProvider                                                              |
| `.gitignore`         | Define what to ignore at commit time.                                                                     ||
| `CONTRIBUTING.md`    | Guidelines for contributing to the sample.                                                                |
| `package.json`       | Package manifest for npm.                                                                                 |
| `README_CONFIG.md`   | This README file.                                                                                         |
| `README_RUN.md`      | After README_CONFIG lets run authorization, deploy portal react client <br/>and run portal client README file. |
| `LICENSE`            | The license for the sample.                                                                               |   


**Note:** This sample was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) must be installed to run this sample.

### Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
2.Clone this repository `git clone https://github.com/Azure-Samples/ms-identity-javascript-react-spa.git`
3. Open the [/src/authConfig.js](src/auth/authConfig.js) file and provide the required configuration values.
4. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.


## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
