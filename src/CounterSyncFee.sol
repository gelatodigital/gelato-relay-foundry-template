// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {GelatoRelayContext} from "@gelatonetwork/relay-context/contracts/GelatoRelayContext.sol";

contract CounterSyncFee {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
