import {
  CallWithSyncFeeRequest,
  GelatoRelay,
  SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk";
import { providers, Wallet } from "ethers";

import * as dotenv from "dotenv";
import { CounterSponsored__factory } from "../typechain-types/factories/CounterSponsored.sol/CounterSponsored__factory";
dotenv.config();

const relay = new GelatoRelay();

const sponsoredCall= async () => {
  let priv_key = process.env["PRIVATE_KEY"]!;

  const provider = new providers.JsonRpcProvider(`url`);

  let wallet: Wallet = new Wallet(priv_key);
  const signer = await wallet.connect(provider);


  const addresssponsoredCall = "0xe486ea0bc6b7e21cf56c3e55895830a512625b35";
  const counterSponsored = CounterSponsored__factory.connect(
    addresssponsoredCall,
    signer
  );

  const { data } = await counterSponsored.populateTransaction.setNumber(9);

  // populate the relay SDK request body 0x06fa4d6a22eac3c378bda7644ccb10cc8094be3bb4caea6e080f0511c45c6b81
  const request = {
    chainId: 5, // Goerli in this case
    target: addresssponsoredCall, // target contract address
    data: data!, // encoded transaction datas

  };

  // send relayRequest to Gelato Relay API 



  const sponsorApiKey = '1NnnocBNgXnG1VgUnFTHXmUICsvYqfjtKsAq1OCmaxk_';

  const relayResponse = await relay.sponsoredCall(
    request,
    sponsorApiKey
  );
  let taskId = relayResponse.taskId;
  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`);
};

sponsoredCall()
  .then()
  .catch((error) => console.log(error))
  .finally();
