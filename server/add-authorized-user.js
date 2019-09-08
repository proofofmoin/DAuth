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

  // creat a new twin with a description
  const description = {
    name: 'Big Crane 250',
    description: 'Digital Twin for my heavy machine "Big Crane 250"',
    author: 'Manufacturer',
    version: '0.1.0',
    dbcpVersion: 2,
  };
  const bigCrane250 = await DigitalTwin.create(
    runtime, { accountId: runtime.activeAccount, description });
  console.log(`created new digital twin with address "${await bigCrane250.getContractAddress()}"`);

  // create a container with default template
  const { data } = await bigCrane250.createContainers({
    data: {},
  });

  // add data to container
  await data.setEntry(
    'productionProfile',
    {
      id: 'BC250-4711',
      dateOfManufacturing: '1554458858126',
      category: 'hem-c',
      authorizedusers:["0x7855a8D02bBD139258Ca6Bb19C016F7D290f14BF","0xf69d9E11943A7a04d313cbc083cf807c8dd49d1A"]
    },
  );
  await data.setEntry('manual', 'https://a-link-the-manual...');

  console.log('done');

}

init();