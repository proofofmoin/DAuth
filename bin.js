// require blockchain-core dependencies
const Web3 = require('web3');

// require blockchain-core
const { Ipfs, createDefaultRuntime, DigitalTwin, Container } = require('@evan.network/api-blockchain-core');

// ipfs configuration for evan.network testnet storage
const ipfsConfig = {host: 'ipfs.test.evan.network', port: '443', protocol: 'https'};
// web3 provider config (currently evan.network testcore)
const web3Provider = 'wss://testcore.evan.network/ws'

async function init() {
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
      mnemonic: 'connect neither prefer select wild grit shield vast tornado blouse record flat',
      password: 'Password123'
    }
  );

  const bigCrane = new DigitalTwin(runtime, {
    accountId: runtime.activeAccount,
    address: '0xBE9A41A0E6417BBb384fDC11A07398D69F4950E3'
  });

  const bigCraneDataInfo = await bigCrane.getEntry('data');
  const bigCraneData = bigCraneDataInfo.value;

  const productionProfile = await bigCraneData.getEntry('productionProfile');

  console.dir(productionProfile);

  const account = web3.eth.accounts[0];
  //console.log("runtime ===  ",runtime.web3.accounts)
   /* const privateKey = await runtime.executor.signer.accountStore.getPrivateKey(    {
    mnemonic: 'connect neither prefer select wild grit shield vast tornado blouse record flat',
    password: 'Password123'
  })  */

  const privateKey = await runtime.executor.signer.accountStore.getPrivateKey( runtime.activeAccount); 
  console.log("prive", privateKey)

  /* const privateKey = "0xdf6f541cccdb01ac32a5b6eae6aaa2d5c6ac0e2ef12ff344b23eb48339f0df2b" */
  
  const siginfo =  runtime.web3.eth.accounts.sign("AltTubeRocks", `0x${privateKey}`)
  console.log("signature == ", siginfo);

  //await this.runtime.executor.signer.accountStore.getPrivateKey(this.config.ethAccount)
//const signature = await web3.eth.sign("Hello world", account);
const unsign = runtime.web3.eth.accounts.recover("AltTubeRocks", siginfo.signature);
 //account === signingAddress

  console.log('done',unsign);
}


init();

