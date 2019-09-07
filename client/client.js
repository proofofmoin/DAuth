// require blockchain-core dependencies
const Web3 = require('web3');

const request       = require('request');


// require blockchain-core
const { Ipfs, createDefaultRuntime, DigitalTwin, Container } = require('@evan.network/api-blockchain-core');

// ipfs configuration for evan.network testnet storage
const ipfsConfig = { host: 'ipfs.test.evan.network', port: '443', protocol: 'https' };

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
            // mnemonic: 'connect neither prefer select wild grit shield vast tornado blouse record flat',
            // password: 'Password123'

            // My own credentials
            mnemonic: 'omit champion track input wet match enemy uncover slim summer assume pill',
            password: 'Latercera19'
        }
    );

    const privateKey = await runtime.executor.signer.accountStore.getPrivateKey(runtime.activeAccount);
    // console.log("prive", privateKey)

    const siginfo = runtime.web3.eth.accounts.sign("AltTubeRocks", `0x${privateKey}`)
    console.log("signature == ", siginfo);

    
    request.get("http://localhost:4017/shakehand", { 
        "message": "AltTubeRocks",
        "messageHash":"0xe032ccfd9f39a07e75e28688568699d6251b12a339061e7714c7452101b1f4c4",
        "signature":"0xfa0506373f40224bef3dc6f583c415c21945bd9235ef05e00debc77d9a0facc311a5bf1c41aab661b817470183d2dd188db55922f6065e3266d8ea56535409831b"
    })
}

init();

