// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import { ERC2771Context } from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract CounterSyncFee is ERC2771Context {
  uint256 public number;

  constructor() ERC2771Context(address(0xBf175FCC7086b4f9bd59d5EAE8eA67b8f940DE0d)) { }

  function setNumber(uint256 newNumber) external onlyTrustedForwarder {
    number = newNumber;
  }

  modifier onlyTrustedForwarder() {
    require(isTrustedForwarder(msg.sender), "Only callable by Trusted Forwarder");
    _;
  }
}
