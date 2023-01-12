import * as dotenv from 'dotenv';
dotenv.config();

export const deploy = async () => {
    let priv_key =  process.env['PRIVATE_KEY'];


    const { spawn } = await import("child_process");

    let rpc = 'http://127.0.0.1:8545'
    rpc ='https://goerli.infura.io/v3/1e43f3d31eea4244bf25ed4c13bfde0e'; //testnet rpc

    let deployScriptPath = 'script/Deploy.s.sol:DeployScript ';
    let params = ['script',deployScriptPath,`--rpc-url=${rpc}`,'--broadcast'];

    if (priv_key) params.push(`--private-key=${priv_key}`)


    const childProcess = spawn('forge', params, {
        stdio: "inherit",
      });
    

    childProcess.once("close", (status) => {
        childProcess.removeAllListeners("error");
  
        if (status === 0) {
        console.log('ok')
        } else {
            console.log('error')
        }

      });
  
      childProcess.once("error", (_status) => {
        childProcess.removeAllListeners("close");
        console.log('error')
      });

}

deploy();

