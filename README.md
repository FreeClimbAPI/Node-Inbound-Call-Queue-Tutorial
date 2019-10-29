# Node Inbound Call Queue Tutorial

This project serves as a guide to help you build an application with FreeClimb. Specifically, the project will:

- Add a Caller to a queue
- Play audio to the caller in the queue
- Get digits from the caller
- Exit the queue when a key is pressed

## Setting up your new app within your FreeClimb account

To get started using a FreeClimb account, follow the instructions [here](https://persephony-docs.readme.io/docs/getting-started-with-persephony).

## Setting up the Inbound Call Queue Tutorial

1. Install the node packages necessary using command:

   ```bash
   $ yarn install
   ```

2. Configure environment variables (this tutorial uses the [dotenv package](https://www.npmjs.com/package/dotenv)).

   | ENV VARIABLE            | DESCRIPTION                                                                                                                                                                             |
   | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | ACCOUNT_ID              | Account ID which can be found under [API Keys](https://www.persephony.com/dashboard/portal/account/authentication) in Dashboard                                                         |
   | AUTH_TOKEN              | Authentication Token which can be found under [API Keys](https://www.persephony.com/dashboard/portal/account/authentication) in Dashboard                                               |
   | HOST | The host url where your application is hosted (e.g. yourHostedApp.com) |


## Runnning the Tutorial

1. Run the application using command:

   ```bash
   $ node inboundCallQueue.js
   ```

