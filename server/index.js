/*
TODO:
1. RUN NODE.JS SERVER 
2. WEB3 RECOVER ON THE RECIVED MSG
3. LOOK UP IN THE SMART CONTRACT OF EVAN NETWORK IF IT IS THE VALID KEY
4. RETURN TO CLIENT SUCCESS OR FAIL
*/
const express       = require('express');
const bodyParser    = require("body-parser");
const cookieParser  = require('cookie-parser');
const url           = require('url');
const logger        = require('morgan');
const proxy         = require('./lib/proxy');
var cors            = require('cors');
const request       = require('request');

// set up the app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.get('/', function(req, res) {
  res.json({
    message: "server is live"
  });
});

app.get('/ping', function(req, res) {
  res.json({
    message: "pong"
  });
});

app.get('/shakehand',function(req, res) {
  const siginfo = req.body
 console.log("signature info == ", siginfo);

  //await this.runtime.executor.signer.accountStore.getPrivateKey(this.config.ethAccount)
//const signature = await web3.eth.sign("Hello world", account);
 //account === signingAddress
 unsign = runtime.web3.eth.accounts.recover(siginfo.message, siginfo.signature);
 
  console.log('done',unsign);
  //console.log(productionProfile)
  if (productionProfile.authorizedusers.includes(unsign)){
    res.sendStatus(200);
  }
  else{
    res.sendStatus(403);
  }
  
});


// require blockchain-core dependencies
const Web3 = require('web3');

// require blockchain-core
const { Ipfs, createDefaultRuntime, DigitalTwin, Container } = require('@evan.network/api-blockchain-core');

// ipfs configuration for evan.network testnet storage
const ipfsConfig = {host: 'ipfs.test.evan.network', port: '443', protocol: 'https'};
// web3 provider config (currently evan.network testcore)
const web3Provider = 'wss://testcore.evan.network/ws'



let privateKey;
let siginfo;
let unsign;
let runtime 
let productionProfile

async function init() {
  // initialize dependencies
  const provider = new Web3.providers.WebsocketProvider(
    web3Provider,
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
  const web3 = new Web3(provider, { transactionConfirmationBlocks: 1 });
  const dfs = new Ipfs({ dfsConfig: ipfsConfig });

  // create runtime
   runtime = await createDefaultRuntime(
    web3,
    dfs,
    {
      mnemonic: 'connect neither prefer select wild grit shield vast tornado blouse record flat',
      password: 'Password123'
    }
  );

  const bigCrane = new DigitalTwin(runtime, {
    accountId: runtime.activeAccount,
    address: '0xf409947edd419d08A1d070a2CC3d8C68e3807ecF'
  });

  const bigCraneDataInfo = await bigCrane.getEntry('data');
  const bigCraneData = bigCraneDataInfo.value;

  productionProfile = await bigCraneData.getEntry('productionProfile');

  console.dir(productionProfile);

  //const account = web3.eth.accounts[0];
  //console.log("runtime ===  ",runtime.web3.accounts)
   /* const privateKey = await runtime.executor.signer.accountStore.getPrivateKey(    {
    mnemonic: 'connect neither prefer select wild grit shield vast tornado blouse record flat',
    password: 'Password123'
  })  */

//  privateKey = await runtime.executor.signer.accountStore.getPrivateKey( runtime.activeAccount); 
  //  console.log("prive", privateKey)

  /* const privateKey = "0xdf6f541cccdb01ac32a5b6eae6aaa2d5c6ac0e2ef12ff344b23eb48339f0df2b" */
  
//siginfo =  runtime.web3.eth.accounts.sign("AltTubeRocks", `0x${privateKey}`)
  //console.log("signature == ", siginfo);

  //await this.runtime.executor.signer.accountStore.getPrivateKey(this.config.ethAccount)
//const signature = await web3.eth.sign("Hello world", account);
//unsign = runtime.web3.eth.accounts.recover("AltTubeRocks", siginfo.signature);
 //account === signingAddress

  //console.log('done',unsign);
}
init()
module.exports = app;