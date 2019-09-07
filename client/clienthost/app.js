var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// require blockchain-core dependencies
const Web3 = require('web3');

const request       = require('request');


// require blockchain-core
const { Ipfs, createDefaultRuntime, DigitalTwin, Container } = require('@evan.network/api-blockchain-core');

// ipfs configuration for evan.network testnet storage
const ipfsConfig = { host: 'ipfs.test.evan.network', port: '443', protocol: 'https' };

// web3 provider config (currently evan.network testcore)
const web3Provider = 'wss://testcore.evan.network/ws'


const fs = require('fs')


var apiRouter = require('./routes/api.js');

////
const app = express();
////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/*', apiRouter);

app.get('/*',async function(req,res,next){

  console.log(req.originalUrl)
    // initialize dependencies
    const provider = new Web3.providers.WebsocketProvider(
        web3Provider,
        { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
     const web3 = new Web3(provider, { transactionConfirmationBlocks: 1 });
    const dfs = new Ipfs({ dfsConfig: ipfsConfig });

    // create runtime
     const runtime = await createDefaultRuntime(
        web3,
        dfs,
        {
            // My own credentials
            mnemonic: 'omit champion track input wet match enemy uncover slim summer assume pill',
            password: 'Latercera19'
        }
    );

    const privateKey = await runtime.executor.signer.accountStore.getPrivateKey(runtime.activeAccount);



  const siginfo = runtime.web3.eth.accounts.sign("AltTubeRocks", `0x${privateKey}`)

  parsedSig = siginfo

  //var url = 'http://pom-hackathon_pom-vpn-server:4017/shakehand'+req.originalUrl
  var url = 'http://localhost:4017/shakehand'+req.originalUrl

  var options = {
    method: 'get',
    body: parsedSig,
    json: true,
    url: url
  }
  request(options, function (err, r_res, body) {
      if (err) {
        console.error('error posting json: ', err)
        throw err
      }
      res.send(body)
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
    //res.status(404).sendFile(BUILD_DIR+"/404/index.html");
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    throw err;
  });
  
  module.exports = app;
