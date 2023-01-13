// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import { GelatoRelayContext } from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";

contract CounterSyncFee is GelatoRelayContext {
  uint256 public number;

  function setNumber(uint256 newNumber) external onlyGelatoRelay {
    number = newNumber;
    _transferRelayFee();
  }

  receive() external payable { }
}
