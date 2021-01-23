# React Stripe base

## Commands
1. **Run the app**. `yarn start` or `npm start`
2. **Build the app**. `yarn build` or `npm run build`
3. **Lint the app**. `yarn lint` or `npm run lint`
4. **Test the app**. `yarn test` or `npm run test`, for UI option `yarn test:open` or `npm run test:open`,
5. **Run the app with SSR**. `yarn ssr` or `npm run ssr`

## Getting Started
1. Clone the repository
2. Install dependencies: `yarn` or `npm install`
3. Create the environment variables files in root folder(.env.dev, .env.staging and .env.prod):

  `.env.example` example:
  ```
    API_URL=http://your-api-url.com
    AWS_BUCKET=bucket
    AWS_REGION=region
    AWS_ACCESS_KEY_ID=key_id
    AWS_SECRET_ACCESS_KEY=secret_key
  ```
4. Start the dev server: `yarn start` or `npm start -s`

## Running script with different environments
To change the set of environment variables for a script it's needed to run ENV=my_environment before the script.

For example: `ENV=staging yarn build`

## Configuring Code Climate
1. After adding the project to CC, go to `Repo Settings`
2. On the `Test Coverage` tab, copy the `Test Reporter ID`
3. Replace the current value of `CC_TEST_REPORTER_ID` on the `config.yml file (.circleci/config.yml)` with the one you copied from CC

## Initial Machine Setup
**Install [Node 7.0.0 or greater, 10.14.2 LTS preferred](https://nodejs.org)**
Project is currently set to node version `10.14.2 LTS`. Make sure that you are using the node version specified in the `package.json`, if you prefer to use a different one you can change it there.

**Install [Yarn](https://yarnpkg.com/en/docs/install)** - Fast, reliable, and secure package manager

## Redux setup

The base makes use of our [redux-tools](http://github.com/rootstrap/redux-tools) package.
This makes working with, and tracking the status of async side effect easier.
Learn more about this in the redux-tools [readme](https://github.com/rootstrap/redux-tools/blob/master/README.md).


## Server Side Rendering
This base is already set up with a Node server for SSR.

The command `yarn ssr` will compile the server and client.

### Fetching data
The server is prepared to fetch data directly from the backend before rendering the HTML.

## Deploying to AWS S3
1. **Add the environment variables for each .env** AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
2. **Run the command to deploy with an environment** `ENV=your_environment yarn deploy`

## Deploying to Heroku
1. **Add all the environment variables in .env to Heroku**
2. **Add the env variable NPM_CONFIG_PRODUCTION=false to Heroku**
2. **Deploy your branch to Heroku**
