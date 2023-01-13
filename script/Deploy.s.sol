// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import { CounterSyncFee } from "../src/CounterSyncFee.sol";
import { CounterSyncFeeCollector } from "../src/CounterSyncFeeCollector.sol";
import { CounterSponsoredERC2771 } from "../src/CounterSponsoredERC2771.sol";
import { CounterSponsored } from "../src/CounterSponsored.sol";

contract DeployScript is Script {
  CounterSyncFee counterSyncFee;
  CounterSyncFeeCollector counterSyncFeeCollector;
  CounterSponsoredERC2771 counterSponsoredERC2771;
  CounterSponsored counterSponsored;

  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);
    
    counterSyncFee = new CounterSyncFee();
    payable(address(counterSyncFee)).transfer(0.01 ether);

    counterSyncFeeCollector = new CounterSyncFeeCollector();
    payable(address(counterSyncFeeCollector)).transfer(0.01 ether);

    counterSponsoredERC2771 = new CounterSponsoredERC2771();

    counterSponsored = new CounterSponsored(address(0xaBcC9b596420A9E9172FD5938620E265a0f9Df92));

    vm.stopBroadcast();
  }
}
