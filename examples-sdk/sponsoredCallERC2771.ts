import {
  CallWithSyncFeeRequest,
  GelatoRelay,
  SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk";
import { providers, Wallet } from "ethers";

import * as dotenv from "dotenv";
import { CounterSponsoredERC2771__factory } from "../typechain-types/factories/CounterSponsoredERC2771.sol/CounterSponsoredERC2771__factory";
dotenv.config();

const relay = new GelatoRelay();

const sponsoredCallERC2771= async () => {
  let priv_key = process.env["PRIVATE_KEY"]!;

  const provider = new providers.JsonRpcProvider(`url`);

  let wallet: Wallet = new Wallet(priv_key);
  const signer = await wallet.connect(provider);

  const feeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const addresssponsoredCallERC2771 = "0xaacd421be196dbe6dc4e7c71d374dbb579537593";
  const counterSponsoredERC2771 = CounterSponsoredERC2771__factory.connect(
    addresssponsoredCallERC2771,
    signer
  );

  const { data } = await counterSponsoredERC2771.populateTransaction.setNumber(4);

  // populate the relay SDK request body 0x06fa4d6a22eac3c378bda7644ccb10cc8094be3bb4caea6e080f0511c45c6b81
  const request = {
    chainId: 5, // Goerli in this case
    target: addresssponsoredCallERC2771, // target contract address
    data: data!, // encoded transaction datas
   user: signer.address
  };

  // send relayRequest to Gelato Relay API 



  const sponsorApiKey = '1NnnocBNgXnG1VgUnFTHXmUICsvYqfjtKsAq1OCmaxk_';

  const relayResponse = await relay.sponsoredCallERC2771(
    request,
    signer as providers.Web3Provider, // new providers.Web3Provider(provider),
    sponsorApiKey
  );
  let taskId = relayResponse.taskId;
  console.log(`https://relay.gelato.digital/tasks/status/${taskId}`);
};

sponsoredCallERC2771()
  .then()
  .catch((error) => console.log(error))
  .finally();
