import {  CallWithSyncFeeRequest,GelatoRelay,SponsoredCallERC2771Request } from '@gelatonetwork/relay-sdk';
import { providers, Wallet } from 'ethers';
import { CounterSyncFee__factory } from '../typechain-types/factories/CounterSyncFee__factory';

import * as dotenv from 'dotenv';
dotenv.config();

const relay = new GelatoRelay();

const  callSyncFee = async () => {

    let priv_key =  process.env['PRIVATE_KEY']!;

    const provider = new providers.JsonRpcProvider(`url`);

  let wallet:Wallet = new Wallet(priv_key);
   const signer  = await wallet.connect(provider);

  const feeToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const addressCallSyncFee = '0xaacd421be196dbe6dc4e7c71d374dbb579537593'
  const counterSyncFe = CounterSyncFee__factory.connect(addressCallSyncFee,signer)
  
  const { data } =
    await counterSyncFe.populateTransaction.setNumber(4);


  // populate the relay SDK request body 0x06fa4d6a22eac3c378bda7644ccb10cc8094be3bb4caea6e080f0511c45c6b81
  const request = {
    chainId: 5, // Goerli in this case
    target: addressCallSyncFee, // target contract address
    data: data!, // encoded transaction datas
    isRelayContext: true, // are we using context contracts
    feeToken: feeToken, // token to pay the relayer
  };

  // send relayRequest to Gelato Relay API
  const relayResponse = await  relay.callWithSyncFee(request);
    let taskId = relayResponse.taskId
  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`)

}

callSyncFee().then().catch(error=> console.log(error)).finally()