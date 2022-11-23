// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract libraryModules  {
  // Contract owner
  address payable owner;

  //List of all memos received from Dapp users 
  Memo[] memos;

  //Even to emit when a memo is created
  event newMemo(
    address indexed from,
    uint256 timestamp,
    string name,
    string module
  );

  //Structure of Memo
  struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string module;
  }
  
  constructor() {
    owner = payable(msg.sender);
  }

  /** Function to buy module 
   *  This Function Requires that users pay 2 or More MATIC to get access to a module
   */

  function buyModule(string memory _name, string memory _module) payable public {
    require(msg.value >= 2, "Not Enough Matic");
    
    //Add the Memo to storage 
    memos.push(Memo(
      msg.sender,
      block.timestamp, 
      _name,
      _module
    ));

    //Emit a log event when a new memo is created;
    emit newMemo(
      msg.sender,
      block.timestamp,
      _name,
      _module
    );

  }

  /**
   * Sends the balance of the contract to the owner 
   */
  function withdrawPurchases() public {
    require(owner.send(address(this).balance));

  }

  /**
   * This function retreives all the memos stored on the blockchain
   */
  function getMemos() public view returns(Memo[] memory) {
    return memos;
  }
}