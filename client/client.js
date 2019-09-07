// require blockchain-core dependencies
const Web3 = require('web3');

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
            mnemonic: 'omit champion track input wet match enemy uncover slim summer assume pill',
            password: 'Latercera19'
        }
    );

    const privateKey = await runtime.executor.signer.accountStore.getPrivateKey(runtime.activeAccount);
    console.log("prive", privateKey)

    const siginfo = runtime.web3.eth.accounts.sign("AltTubeRocks", `0x${privateKey}`)
    console.log("signature == ", siginfo);
}


init();

