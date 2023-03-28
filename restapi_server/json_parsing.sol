// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string message;

    function setMessage(string memory _message) public {
        message = _message;
    }
    
    event TransactionStatus(bytes32 txHash, bool success);
    
    function doSomething() public {
    // Perform some operation here
    bytes32 txHash = keccak256(abi.encodePacked(msg.sender, block.number));
    bool success = true; // Set to false if the operation fails
    emit TransactionStatus(txHash, success);
  }


    function getMessage() public view returns (string memory) {
        return message;
    }
}
