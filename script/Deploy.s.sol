// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import { CounterSyncFee } from "../src/CounterSyncFee.sol";

contract DeployScript is Script {
  CounterSyncFee counterSyncFee;

  function setUp() public { }

  function run() public {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);
    counterSyncFee = new CounterSyncFee();
    payable(address(counterSyncFee)).transfer(0.001 ether);
    vm.stopBroadcast();
  }
}
