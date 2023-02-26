const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('http://localhost:7545');
const contractAddress = 
'0xC6411F693c4FfA3CE7d7906f7e0B3A5449A1F08e'; // Replace with the address of your deployed contract


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
  
app.use(express.json());
  
  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  
  app.get('/getData', async (req, res) => {
    const result = await contract.methods.getMessage().call();
    res.send(result);
  });

  app.post('/setData', async (req, res) => {
   const vae = req.body.greeting;
   const accountAddress = '0x64B4E78932B33482d05cF114844e659a257006B0';
   const value2 = await contract.methods.setMessage(vae).send({ from: accountAddress });
   res.send(vae);
  });



  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });