const Web3 = require('web3');

var Accounts = require('web3-eth-accounts');

// Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
var accounts = new Accounts('ws://localhost:8546');

console.log(accounts);

