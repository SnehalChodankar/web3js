import React from 'react';
import Web3 from 'web3';

var Tx = require('ethereumjs-tx').Transaction;

var privateKey = Buffer.from('f345c92928aeb1d4f8859d6a537e3217b528995e7ad020c7507233668912fb2a', 'hex');
var account = '0xc49dBe82ea1d95EA1dccf0E317b63bA9ec74954b';
var rawTx = '0xf86880843b9aca00831e8480945dca078351f2a541580378cc92acb71626fc0d9a8405f5e1008029a0011e94bad7b1cab558e217736722dd6883fc86810fe923561e5e33e233e3f258a01ff0628c9fb749f002262504287bddbd4c69460fcf700bfeed1ff87d2cf29f9e';

function createObj(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);
    console.log(web3);
}

function createAcc(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    var acc = web3.eth.accounts.create();
    console.log(acc);
}

function signTxs(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);
    
    web3.eth.accounts.signTransaction({
        to: '0x5DCa078351f2A541580378cC92acB71626Fc0d9a',
        value: '1000000000',
        gas: 2000000
    }, '0xf345c92928aeb1d4f8859d6a537e3217b528995e7ad020c7507233668912fb2a')
    .then(console.log);
}

function sendTx(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    var tx = new Tx(rawTx, {'chain':'ropsten'});
    tx.sign(privateKey);
    
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
}

function createContract(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    const abi = [{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];   
    const address = '0xFd9aCd010DAfbd1e3601c81e0c779033dDFf2443';

    const contract = new web3.eth.Contract(abi, address);

    console.log(contract);
}

function callretrieve(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    const abi = [{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];   
    const address = '0xFd9aCd010DAfbd1e3601c81e0c779033dDFf2443';

    const contract = new web3.eth.Contract(abi, address);

    contract.methods.retrieve().call((error, result) => {
        console.log(result);
      });
}

function callstore(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    const abi = [{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];   
    const address = '0xFd9aCd010DAfbd1e3601c81e0c779033dDFf2443';

    const contract = new web3.eth.Contract(abi, address);

    web3.eth.getTransactionCount(account, (error, txCount) =>{
        const data = contract.methods.store(1).encodeABI();

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: address,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            data: data
          };

        const tx = new Tx(txObject,  {'chain':'ropsten'});
        tx.sign(privateKey);

        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');

        web3.eth.sendSignedTransaction(raw, (error, txHash) => {
            console.log(txHash);
        });
    });
}

function signSendTxs(){
    var pvtKey = Buffer.from('af91b44603bfe180f567ce84977e9d65746d8d409108172643027281a4da7ca3', 'hex');
    var pvtKeyNormal = '0xaf91b44603bfe180f567ce84977e9d65746d8d409108172643027281a4da7ca3';

    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);
    
    web3.eth.accounts.signTransaction({
        to: '0x1C89B038bE466e422d8308305945efff0127175a',
        value: '50000000000000000',
        gas: 2000000
    }, pvtKeyNormal, function(err, res){
        console.log(res, res.rawTransaction);
        var rawTxn = res.rawTransaction;
        var tx = new Tx(rawTxn, {'chain':'ropsten'});
        tx.sign(pvtKey);
        
        var serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log);
    });
    
}

function checkBalance(){
    let url_infura = 'https://ropsten.infura.io/v3/58319f91b4914ca08bacfb5bdc3b363e';
    let web3 = new Web3(url_infura);

    web3.eth.getBalance('0xE661ae93Cc951E6e901052208b2b78f453f9676D')
    .then(console.log);
}

function Web3Testing(){
    return(
        <div>
            <button onClick={createObj}>Create Object</button>
            <button onClick={createAcc}>Create account</button>
            <button onClick={signTxs}>Sign Txs (Ether transfer)</button>
            <button onClick={sendTx}>Send Txs (Ether transfer)</button>
            <button onClick={createContract}>Create Smart Contract Instance</button>
            <button onClick={callretrieve}>Call retrieve method</button>
            <button onClick={callstore}>Call store method</button>
            <button onClick={signSendTxs}>Sign and send ethers</button>
            <button onClick={checkBalance}>Check balance</button>
        </div>
    );
}

export default Web3Testing;