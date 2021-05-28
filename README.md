# Atrium

## Project Setup

To run this application, you will require the following tools:
1. JavaScript Package Manager: NPM / Yarn
2. Node JS and React JS
3. Truffle Suite (Truffle and Ganache CLI)

### Initial setup to run the application locally

1. First open a terminal in your development folder, and clone the repository:

* Using HTTPS:

    ```bash
    git clone https://github.com/unicef/atrium.git
    ```

* Using SSH:

    ```bash
    git clone git@github.com:unicef/atrium.git
    ```

2. Once this is completed, change into the directory:

    ```bash
    cd atrium
    ```

3. This project is a monorepo setup with [Lerna](https://lerna.js.org/). Thus, you can choose to leverage Lerna to install every package dependencies with:

    ```bash
    npm i
    npm run bootstrap
    ```

Alternatively, you can install each component manually. In that case, open 3 additinal terminals. **You should have 4 terminals open in total.** and follow the next steps.

### Blockchain

While testing locally, the developer environment will be required to send transactions to a blockchain.  To test locally, please run "Ganache-CLI" in one of the terminals.  Change into one of the terminals that aren't being used yet and run `ganache-cli`.


As Ganache is running, it is necessary to take some information from this local blockchain and import it into the application.  From Ganache, copy one of the private keys and store it in the `packages/app/config/keys.js` file within the `UN_ADMIN_PRIVATE_KEY` variable, or alternatively in an `.env` file in the root of the project.  The  next variable that should be populated is the `ETHEREUM_PROVIDER_URL`.  This should be the url of wherever the Ganache is running e.g. localhost:8545".

Once this is completed, Truffle has to be configured to then upload the contracts related to the badges for this platform.  The `truffle-config.js` or `truffle.js` file should look something like this:

```
module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    //  gas: 9900000
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.5.13",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
```
Once ready, from another terminal inside the `./packages/blockchain` folder, run the command: `truffle migrate --network development --reset`.  This will allow you to deploy smart contracts that are relevant to this project.

The Truffle configuration file will leverage the `UN_ADMIN_PRIVATE_KEY` and upload the badge smart contracts to this local blockchain.  Once completed, the terminal with Ganache running should generate contract addresses for 4 badges.  Each one will look something like this:

```
  Transaction: 0x0e74fad335526cd08cd9116c8cc1605b26fa92d694925b7a455e4bd25679f972
  Contract created: 0x9f906da24035769122fef3f8747639863c006c34
  Gas usage: 1306081
  Block Number: 6
  Block Time: Wed Jun 12 2019 11:37:16 GMT-0400 (Eastern Daylight Time)
```
The terminal that runs the truffle script:
```
   Replacing 'Badge'
   -----------------
   > transaction hash:    0x2a7847437a860d57fa88110f37b16eb2991ad12cd58e355ce6ccc62d1904e1f7
   > Blocks: 0            Seconds: 0
   > contract address:    0x2b8ff2EeBC6C0ed5e70BA27CFCEC895FcC6fec46
   > account:             0xA0A5EF6016d7C31aA83325eF7FedDfFcf862ACf6
   > balance:             99.8500496
   > gas used:            1803153
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03606306 ETH

Badge 0x2b8ff2EeBC6C0ed5e70BA27CFCEC895FcC6fec46
```

For each of badge addresses, update the `config/keys.js` file to include each of the Badge addresses.  The variable names are: `BADGE_1_ADDRESS`, `BADGE_2_ADDRESS`, `BADGE_3_ADDRESS`, `BADGE_4_ADDRESS`. Or alternatively, set the variables in an `.env` file in the root of the project

### Seeds
There are some seeds available in `packages/app/seeds`

To seed the database with learning resources run from the project root
`node packages/app/seeds/learningResourcesSeed`

### Front end
In one of the terminals, change into the client folder and install all of the packages.
```
cd packages/client
npm install
```
Once the packages are installed, run `npm start` to have the front end running on port 3000.


### Back end

This is responsible for storing users and forums in the Mongo Cloud Database.

This part of the code is also responsible for issuing badges, logging in, and connecting to Twitter and GitHub APIs.

To run this part of the applicaiton, there are 3 steps that need to be completed:

From the root folder, you must install the packages required for the server, update the configuration file, and then run the server.

#### 1. Install the server packages
Run the following command to install the server packages: `cd packages/app` `npm install`.

#### 2. Update the .env file to contain the following parameters:
The remaining variables that need to be updated in the `/config/keys.js` folder include the following:

- MONGO_URI
- SECRET_OR_KEY
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN_KEY
- TWITTER_ACCESS_TOKEN_SECRET
- GITHUB_ACCESS_TOKEN

#### 3. Run the server
To run the server, execute the following command in one of the terminals once the .env file is updated with the appropriate variables: `node server`.

### Running locally from docker
To run locally inside docker containers:
- Install dependencies from app and client with `npm i`
- Create an .env file in the root and in the `/packages/app` folder with the following values:
  ```
    NODE_ENV=development
    UN_ADMIN_PRIVATE_KEY=0x24aa8091c7bdf58fbd1c9ffb1bd30aa66a6ca238526da50a319e411365f64415
    MONGO_URI=mongodb://localhost:27017/app
    SECRET_OR_KEY=raging-dog-cat
    CLIENT_URL=http://localhost:3000
    ATTACHMENT_URL=localhost:5000
    ETHEREUM_PROVIDER_URL=http://[YOUR_MACHINE_IP]:8545
    SENDGRID_API_KEY=[SEND_GRID_API_KEY]
    AWS_ACCESS_KEY=[AWS_ACCESS_KEY]
    AWS_SECRET_KEY=[AWS_SECRET_KEY]
    AWS_BUCKET_NAME=[AWS_BUCKET_NAME]
    ATRIUM_WALLET_SECRET=[MY_SECRET]
  ```
- Run `docker-compose -f docker-compose-dev.yml up --build` - this builds and runs all the containers
- Contracts will be automatically deployed and seeds `create-user.js` and `learningResourcesSeed.js` will run
- You can login with `test@unicef.com` and `password`


### Running tests
Backend has some integration tests available.
To run them the environment variables need to be setup and ganache/parity need to be running with contracts deployed.

To run them just cd into a desired package such as `cd packages/app` and run `npm run test`

*Issues running tests with node 10.12 were reported but a solution hasn't been found yet*

## Running with minikube
```
cd k8s
# Create your secret
kubectl create secret docker-registry appliedblockchain-reg \
  --docker-server=docker.io \
  --docker-username=<YOUR_DOCKER_HUB_USERNAME> \
  --docker-password=<YOUR_DOCKER_HUB_PASSWORD> \
  --docker-email=<YOUR_DOCKER_HUB_EMAIL>

# Apply dev secrets
kubectl apply -f dev-secrets.yaml
# Apply config map
kubectl apply -f atrium-configmaps.yaml
# Apply config map
kubectl apply -f k8s/ganache-dev.yaml
# Apply deployments and services
kubectl apply -f atrium.yaml
````
## Contact

If you have questions or comments about the project, please reach out to blockchain@uninnovation.network.
