let script = `forge verify-contract --chain-id 5 --num-of-optimizations 1000 --watch --compiler-version v0.8.17+commit.8df45f5f 0xaacd421be196dbe6dc4e7c71d374dbb579537593 src/CounterSyncFee.sol:CounterSyncFee
`

// --flatten forge script script/NFT.s.sol:MyScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv