// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import { ERC2771Context } from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract CounterSyncFee {
  uint256 public number;
  address public trustedForwarder;

  constructor(address _trustedForwarder) {
    trustedForwarder = _trustedForwarder;
  }

  function setNumber(uint256 newNumber) external onlyTrustedForwarder {
    number = newNumber;
  }

  modifier onlyTrustedForwarder() {
    require(trustedForwarder == msg.sender, "Only callable by Trusted Forwarder");
    _;
  }
}
