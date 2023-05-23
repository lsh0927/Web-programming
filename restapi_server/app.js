const express = require('express');
const Web3 = require('web3');
//const abiDecoder = require('abi-decoder');

const app = express();
const web3 = new Web3('http://59.6.236.50:10000');
const contractAddress = 
'0xFf0d19D6D3aC21eE857d186B44Ff492eeADAcA5a'; // Replace with the address of your deployed 

//const txdata='0x608060405234801561001057600080fd5b5061085a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063368b87721461003b578063ce6d41de14610057575b600080fd5b610055600480360381019061005091906103ac565b610075565b005b61005f6100fe565b60405161006c9190610474565b60405180910390f35b6100b36040518060400160405280600581526020017f68656c6c6f000000000000000000000000000000000000000000000000000000815250610190565b80600090816100c291906106ac565b507f3d7f415c35b881f2d0a109b3d9a1377e1e14afec5cc1fd06b563ed160c5e263060006040516100f39190610802565b60405180910390a150565b60606000805461010d906104c5565b80601f0160208091040260200160405190810160405280929190818152602001828054610139906104c5565b80156101865780601f1061015b57610100808354040283529160200191610186565b820191906000526020600020905b81548152906001019060200180831161016957829003601f168201915b5050505050905090565b610226816040516024016101a49190610474565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610229565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6102b982610270565b810181811067ffffffffffffffff821117156102d8576102d7610281565b5b80604052505050565b60006102eb610252565b90506102f782826102b0565b919050565b600067ffffffffffffffff82111561031757610316610281565b5b61032082610270565b9050602081019050919050565b82818337600083830152505050565b600061034f61034a846102fc565b6102e1565b90508281526020810184848401111561036b5761036a61026b565b5b61037684828561032d565b509392505050565b600082601f83011261039357610392610266565b5b81356103a384826020860161033c565b91505092915050565b6000602082840312156103c2576103c161025c565b5b600082013567ffffffffffffffff8111156103e0576103df610261565b5b6103ec8482850161037e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561042f578082015181840152602081019050610414565b60008484015250505050565b6000610446826103f5565b6104508185610400565b9350610460818560208601610411565b61046981610270565b840191505092915050565b6000602082019050818103600083015261048e818461043b565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806104dd57607f821691505b6020821081036104f0576104ef610496565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026105587fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261051b565b610562868361051b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006105a96105a461059f8461057a565b610584565b61057a565b9050919050565b6000819050919050565b6105c38361058e565b6105d76105cf826105b0565b848454610528565b825550505050565b600090565b6105ec6105df565b6105f78184846105ba565b505050565b5b8181101561061b576106106000826105e4565b6001810190506105fd565b5050565b601f82111561066057610631816104f6565b61063a8461050b565b81016020851015610649578190505b61065d6106558561050b565b8301826105fc565b50505b505050565b600082821c905092915050565b600061068360001984600802610665565b1980831691505092915050565b600061069c8383610672565b9150826002028217905092915050565b6106b5826103f5565b67ffffffffffffffff8111156106ce576106cd610281565b5b6106d882546104c5565b6106e382828561061f565b600060209050601f8311600181146107165760008415610704578287015190505b61070e8582610690565b865550610776565b601f198416610724866104f6565b60005b8281101561074c57848901518255600182019150602085019450602081019050610727565b868310156107695784890151610765601f891682610672565b8355505b6001600288020188555050505b505050505050565b6000815461078b816104c5565b6107958186610400565b945060018216600081146107b057600181146107c6576107f9565b60ff1983168652811515602002860193506107f9565b6107cf856104f6565b60005b838110156107f1578154818901526001820191506020810190506107d2565b808801955050505b50505092915050565b6000602082019050818103600083015261081c818461077e565b90509291505056fea264697066735822122096a3cc9c5d42e6e44492621655d42c4b7aea86ce9b8e8a51e9140dfa51f9442564736f6c63430008120033';

let currentTxData = '';

const contractAbi =
[
   {
      "inputs": [
         {
            "internalType": "string",
            "name": "_message",
            "type": "string"
         }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
         {
            "internalType": "string",
            "name": "",
            "type": "string"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   }
];
// Replace with the ABI of your smart contract
//abiDecoder.addABI(contractAbi);

app.use(express.json());

  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  //const methodData = contract.methods..encodeABI();

 
  let data=[];
 // let gdata=[];

  app.get('/getData', async (req, res) => {
    const result = await contract.methods.getMessage().call();
   const data = {
      person: result.person,
      vote: result.vote,
      time: result.time
     };
   
     res.send(data);
    // let gdata=[];
   // gdata.push(result);
   // if(gdata.length%5!=0)
   // {
   //    for(let i = 0; i < gdata.length; i++) {
   //    const item=await contract.methods.getMessage().call();
   //    data.push(result);
   //    //data.push(item);
   // ``}
   //    res.send(data);
   // }
   // else
   // {
   //    for(let i = 0; i < gdata.length; i++) {
   //       const item=await contract.methods.getMessage().call();
   //       data.push(item);
   //    ``}
   //    res.send("아직 투표수가 부족합니다.");
   // }
   
   //next();

  });

 

  app.post('/setData', async (req, res) => {
   const { person, vote, time } = req.body;
  
   const accountAddress = '0x58435079A26bF31D2879a8f4550CC510C8433f63';
   const value1 = await contract.methods.setMessage(person).send({ from: accountAddress });
   const value2 = await contract.methods.setMessage(vote).send({ from: accountAddress });
   const value3 = await contract.methods.setMessage(time).send({ from: accountAddress });
   //currentTxData = txdata;
   //const decodedData = abiDecoder.decodeMethod(currentTxData);

  

 
   contract.methods.getMessage().call()
   .then((result) => {


   const data = {
      person: result.person,
      vote: result.vote,
      time: result.time
     };
      // Format the data as necessary
     const formattedData1 = person
     const formattedData2 = vote;
     const formattedData3 = time;

     //console.log(vae);

     
     //console.log(result);   
     console.log(formattedData1);//그 다음 블럭의 tx data를 자동으로 가리키도록 해야함/
     console.log(formattedData2);
     console.log(formattedData3);
    // console.log(decodedData);
    // for(let i = 0; i < 3; i++) {
      res.send(person,vote,time);
   
   //}
     //res.send();
   })
   .catch(error => console.error(error));
  
 
   
 //  res.send(vae);

  });

  app.get('/status-board', async (req, res) => {
   const message = await contract.methods.getMessage().call();
   const formattedMessage = `Message: ${message}`;
   res.send(`
  <html>
   <head>
     <meta charset="UTF-8">
     <title>My App</title>
   </head>
   <body>
     <h1>My App</h1>
     <p id="message"></p>
     <script src="https://cdn.jsdelivr.net/npm/web3@1.3.0/dist/web3.min.js"></script>
     <script>
      const web3 = new Web3('http://localhost:7545');
      const contractAddress = '0x4ec5DFA0B2118B924832cDe808ea5Da44B279232';
      const contractAbi = [
         {
            "inputs": [
               {
                  "internalType": "string",
                  "name": "_message",
                  "type": "string"
               }
            ],
            "name": "setMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
         },
         {
            "inputs": [],
            "name": "getMessage",
            "outputs": [
               {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
               }
            ],
            "stateMutability": "view",
            "type": "function"
         }
          ];
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
  
      contract.methods.getMessage().call()
        .then((result) => {
         document.getElementById('message').textContent = result;
        })
        .catch((error) => {
         console.error(error);
        });
     </script>
   </body>
  </html>
   `);
  });
/*
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My App</title>
  </head>
  <body>
    <h1>My App</h1>
    <p id="message"></p>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.3.0/dist/web3.min.js"></script>
    <script>
      const web3 = new Web3('http://localhost:8545');
      const contractAddress = '0x1234567890123456789012345678901234567890'; // Replace with the address of your deployed contract
      const contractAbi = [ Replace with the ABI of your smart contract ];
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      contract.methods.getMessage().call()
        .then((result) => {
          document.getElementById('message').textContent = result;
        })
        .catch((error) => {
          console.error(error);
        });
    </script>
  </body>
</html>

*/



  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });