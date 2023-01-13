import {
  CallWithSyncFeeRequest,
  GelatoRelay,
  SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk";
import { providers, utils, Wallet } from "ethers";
import { CounterSyncFeeCollector__factory } from "../typechain-types/factories/CounterSyncFeeCollector__factory";

import axios from "axios";

import * as dotenv from "dotenv";
dotenv.config();

const relay = new GelatoRelay();

const callSyncFeeCollector = async () => {
  const feeToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

  const GELATO_RELAY_URL = "https://relay.gelato.digital";
  let path = `${GELATO_RELAY_URL}/oracles/5/estimate`;
  let gasLimit = 1000000

  let estimateObject = {
    paymentToken: feeToken,
    gasLimit,
    isHighPriority: false
  };
  let result = (await axios.get(path, {params: estimateObject})).data;

  let estimatedFee = result.estimatedFee * 2; 

  console.log(estimatedFee);

  let priv_key = process.env["PRIVATE_KEY"]!;

  const provider = new providers.JsonRpcProvider(`url`);

  let wallet: Wallet = new Wallet(priv_key);
  const signer = await wallet.connect(provider);

  const addressCallSyncFeeCollector = "0x3d19febff443c6c2268574f7c2e02124bdfdf263";
  const counterSyncFeCollector = CounterSyncFeeCollector__factory.connect(
    addressCallSyncFeeCollector,
    signer
  );

  const { data } = await counterSyncFeCollector.populateTransaction.setNumber(7,estimatedFee);

  // populate the relay SDK request body 
  const request = {
    chainId: 5, // Goerli in this case
    target: addressCallSyncFeeCollector, // target contract address
    data: data!, // encoded transaction datas
    isRelayContext: true, // are we using context contracts
    feeToken: feeToken, // token to pay the relayer
  };

  // send relayRequest to Gelato Relay API

  const relayResponse = await relay.callWithSyncFee(request);
  let taskId = relayResponse.taskId;
  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`);
};

callSyncFeeCollector()
  .then()
  .catch((error) => console.log(error))
  .finally();
