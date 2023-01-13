// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/CounterSyncFee.sol";

contract CounterSyncFeeTest is Test {
  CounterSyncFee public counterSyncFee;

  function setUp() public {
    counterSyncFee = new CounterSyncFee();
  }

  function testSetNumber(uint256 x) public {
    vm.expectRevert("onlyGelatoRelay");
    counterSyncFee.setNumber(x);
  }
}
