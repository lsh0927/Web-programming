const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('http://localhost:7545');
const contractAddress = 
'0x66e4788dD87356ca8C2BA78199FFc7759633537D'; // Replace with the address of your deployed contract


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
   const accountAddress = '0x100c2597E8e56d0f409D8f7f72CBA1FF5823589d';
   const value2 = await contract.methods.setMessage(vae).send({ from: accountAddress });
   res.send(vae);
  });



  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });