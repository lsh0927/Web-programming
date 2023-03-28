const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('http://localhost:7545');
const contractAddress = 
'0x4ec5DFA0B2118B924832cDe808ea5Da44B279232'; // Replace with the address of your deployed contract


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
  //const methodData = contract.methods..encodeABI();

 
  let data=[];
  let gdata=[];

  app.get('/getData', async (req, res) => {
    const result = await contract.methods.getMessage().call();
	gdata.push(result);
    
	for(let i = 0; i < 2; i++) {
		res.send(gdata[i]);
	}
	//next();
	contract.methods.getMessage().call(function(error, numItems) {
		if (error) {
		  console.log(error);
		  res.status(500).send('Error retrieving data');
		  return;
		}
	
		// Retrieve all the data items from your contract
		

		for (let i = 0; i < numItems; i++) {
			
		  contract.methods.getMessage(i).call(function(error, result) {
			
			if (error) {
			  console.log(error);
			  res.status(500).send('Error retrieving data');

			  return;
			 
			}
			
			// Add the data item to the array of data
			
			// Send the data back to the client when all items have been retrieved
			//if (data.length === numItems) {
			

			//}
		  });
		}
	  });
  });

 

  app.post('/setData', async (req, res) => {
   const vae = req.body.greeting;
   const accountAddress = '0xd498edF2a18cEFB5d81D5b4e043cf68a6262b49C';
   const value2 = await contract.methods.setMessage(vae).send({ from: accountAddress });
   contract.methods.getMessage().call()
   .then((result) => {
 	  // Format the data as necessary
	  const formattedData = result;
	  console.log(formattedData);
	  

	  data.push(formattedData);
	  res.send('Data item added successfully');
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



  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });