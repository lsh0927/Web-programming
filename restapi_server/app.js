const express = require('express');
const Web3 = require('web3');

const app = express();
const web3 = new Web3('http://59.6.236.50:7545');
const contractAddress = 
'0xDa217aa171E8045E8F54D3E3C22ef757aee249Fc'; // Replace with the address of your deployed contract
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
			
		  });
		}
	  });
  });
  app.post('/setData', async (req, res) => {
   const vae = req.body;
   //항목마다 변수 설정을 하고, 해당 값을 호출하는 메소드를 여러번 선언
   const accountAddress = '0x58435079A26bF31D2879a8f4550CC510C8433f63';
   const value2 = await contract.methods.setMessage(vae).send({ from: accountAddress });
   // 여기를 반복하면 원하는 항목에 대한 결과를 알 수 있음
   // ex) const vae3에 req.body.id를 넣고 postman으로 전송시
   // const value3= await contract.methods.setMessage(vae3).send({ from: accountAddress });등으로 변수에 저장, console.log혹은 res.send로 확인 가능
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


  app.listen(3000, () => {
    console.log('Server started on port 30110');
  });