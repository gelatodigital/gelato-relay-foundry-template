let script = `forge verify-contract --chain-id 5 --num-of-optimizations 1000 --watch --compiler-version v0.8.17+commit.8df45f5f --constructor-args $(cast abi-encode "constructor(address)" "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92") 0xe486ea0bc6b7e21cf56c3e55895830a512625b35 src/CounterSponsored.sol:CounterSponsored
`
let args = `--constructor-args $(cast abi-encode "constructor(address)" "0xaBcC9b596420A9E9172FD5938620E265a0f9Df92")`
// --flatten forge script script/NFT.s.sol:MyScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv