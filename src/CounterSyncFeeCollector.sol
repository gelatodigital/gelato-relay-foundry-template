// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import { GelatoRelayFeeCollector } from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CounterSyncFeeCollector is GelatoRelayFeeCollector {
  using SafeERC20 for IERC20;

  uint256 public number;

  address immutable NATIVE_TOKEN = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

  function setNumber(uint256 newNumber, uint256 fee) external onlyGelatoRelay {
    number = newNumber;
    address feeCollector = _getFeeCollector();
    address nativeToken = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    // Payment to Gelato
    // NOTE: be very careful here!
    // if you do not use the onlyGelatoRelay modifier,
    // anyone could encode themselves as the fee collector
    // in the low-level data and drain tokens from this contract.
    transfer(nativeToken, feeCollector, fee);
  }

  function transfer(address _token, address _to, uint256 _amount) internal {
    if (_amount == 0) return;
    _token == NATIVE_TOKEN ? Address.sendValue(payable(_to), _amount) : IERC20(_token).safeTransfer(_to, _amount);
  }

  receive() external payable { }
}
