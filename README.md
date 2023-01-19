# Gelato Foundry template for Relay

The purpose of this repo is to showcase examples of using Gelato Relay with Foundry enviroment. 


## Geting started

Fist we need to install Foundry in order to run `forge` commands. We can found all Foundry relevant information at the [Foundry book](https://book.getfoundry.sh/), and wth regards to [installation](https://book.getfoundry.sh/getting-started/installation). The method I've used is **build from source**

Once we have foundry installed we can move on

### forge init
The command `forge init` would scaffold a new foundry project, we have inlcuded relay examples and added typescript support for some helper funcitons (the vanilla forge repo does not have npm_modules)

So let's go ahead:

`git clone https://github.com/donoso-eth/gelato-foundry-relay-template`

`cd gelato-foundry-relay-template`

`yarn`


### forge? vs helpers
When starting with foundry sometimes is difficult to remember the diferent commnads and parameters, therefore we have created a set of scripts to ease the foundry onboarding.

There are three main commands in `forge`, `cast` and `anvil`. We don't use `cast` in this repo, it is used to query the blockchaoin. `anvil` is used to spin a local blockchain node like hardhat.

`anvil 


## Gelato Relay sdk
  &nbsp; 

| Gelato Auth | Payment              | Inheriting Contract            | SDK/API method                |
| ----------- | -------------------- | ------------------------------ | ----------------------------- |
| no          | User                 | GelatoRelayContext             | relayWithSyncFee              |
| yes         | User                 | GelatoRelayContextERC2771      | relayWithSyncFeeERC2771       |
| no          | 1Balance             | n. a.                          | relayWithSponsoredCall        |
| yes1       | 1Balance             | ERC2771Context                 | relayWithSponsoredCallERC2771 |

relay-context-contracts#gelatorelayfeecollector).
1. A SponsorKey is required; visit Gelato 1Balance [here](https://relay.gelato.network/)


  &nbsp; 
### callSyncFee

Contrat code in [https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSyncFee.sol](https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSyncFee.sol)

Contract verified at [https://goerli.etherscan.io/address/0xaacd421be196dbe6dc4e7c71d374dbb579537593#readContract](https://goerli.etherscan.io/address/0xaacd421be196dbe6dc4e7c71d374dbb579537593#readContract)

**SDK Implementation**


```ts
  const { data } = await counterSyncFe.populateTransaction.setNumber(4);

  // populate the relay SDK request body 
  const request = {
    chainId: 5, // Goerli in this case
    target: addressCallSyncFee, // target contract address
    data: data!, // encoded transaction datas
    isRelayContext: true, // are we using context contracts
    feeToken: feeToken, // token to pay the relayer
  };

  // send relayRequest to Gelato Relay API 

  const relayResponse = await relay.callWithSyncFee(request);
  let taskId = relayResponse.taskId;
  ```


### sponsoredCall


Contrat code in [https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSponsored.sol](https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSponsored.sol)



Contract verified at [https://goerli.etherscan.io/address/0xe486ea0bc6b7e21cf56c3e55895830a512625b35](https://goerli.etherscan.io/address/0xe486ea0bc6b7e21cf56c3e55895830a512625b35)  

  &nbsp; 

### sponsoredCallERC2771

Contrat code in [https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSponsoredERC2771.sol](https://github.com/donoso-eth/gelato-foundry-relay-template/blob/main/src/CounterSponsoredERC2771.sol)

Contract verified at [ https://goerli.etherscan.io/address/0xd11decb96f0fcb8f92c0ed146dce8fb726d1c676](https://goerli.etherscan.io/address/0xd11decb96f0fcb8f92c0ed146dce8fb726d1c676)




