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

app.get('/shakehand/:pathurl',function(req, res) {
  const siginfo = req.body;//JSON.parse(req.body);
 console.log("signature info == ", siginfo);
 let targetUrl = req.params.pathurl;
 console.log("targetUrl======",targetUrl)

  //await this.runtime.executor.signer.accountStore.getPrivateKey(this.config.ethAccount)
//const signature = await web3.eth.sign("Hello world", account);
 //account === signingAddress
 unsign = runtime.web3.eth.accounts.recover(siginfo.message, siginfo.signature);
 
  console.log('done',unsign);
  //console.log(productionProfile)
  if (productionProfile.authorizedusers.includes(unsign)){
   
request('http://'+targetUrl, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  res.send(body) // Print the HTML for the Google homepage.
});
  }
  else{
    res.sendStatus(403);
  }
  
});

app.get('/shakehand',function(req, res) {
  const siginfo = req.body;//JSON.parse(req.body);
 console.log("signature info == ", siginfo);

  //await this.runtime.executor.signer.accountStore.getPrivateKey(this.config.ethAccount)
//const signature = await web3.eth.sign("Hello world", account);
 //account === signingAddress
 unsign = runtime.web3.eth.accounts.recover(siginfo.message, siginfo.signature);
 
  console.log('done',unsign);
  //console.log(productionProfile)
  if (productionProfile.authorizedusers.includes(unsign)){
   
request('https://www.google.de', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  res.send(body) // Print the HTML for the Google homepage.
});
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

}
init()
module.exports = app;
