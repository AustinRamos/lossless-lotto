pragma solidity ^0.8.4;
//pragma solidity 0.8.4;
//pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
//import "@openzeppelin/contracts/utils/math/SafeMath.sol";
//import "./SafeMath.sol";

contract Staker {

  ExampleExternalContract public exampleExternalContract;

   mapping (address=>uint) public balances;
   uint256 public constant threshold = 1 ether;
   uint total_staked;
    uint deadline;
  uint time_to_stake = 10500; //giving 1 minutes rather than 30 seconds... 
  
    event Stake(address indexed sender ,uint256 amount);


  constructor(address exampleExternalContractAddress) public {
      exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
      deadline = block.timestamp + time_to_stake;
  }
//test;
  function stake() public payable ExternalNotComplete{
    require(block.timestamp<deadline);

    balances[msg.sender] +=msg.value;
    emit Stake(msg.sender,msg.value);

  }

  modifier ExternalNotComplete(){
    require(!exampleExternalContract.completed(), "External Contract not yet called");
      _;
  }

//could do bool ot mean inverse or other... 
  modifier DeadlineReached(uint time){
    require(time>=deadline, "Deadline not yet reached!");
      _;
  }


  // After some `deadline` allow anyone to call an `execute()` function
  //  It should either call `exampleExternalContract.complete{value: address(this).balance}()` to send all the value


//only can withdaw if deadline is reached and threshold not met.

function withdraw(address usr_address) DeadlineReached(block.timestamp) public{
require (total_staked < threshold && msg.sender==usr_address);
uint userBalance = balances[msg.sender];
    total_staked-= userBalance;
    balances[msg.sender]=0; // just assume fiull withrawl..
   //msg.sender.call.value(balances[msg.sender]);
   (bool sent,) = msg.sender.call{value: userBalance}("");
       require(sent, "Failed to send user balance back to the user");
}

//modifiers
function execute() DeadlineReached(block.timestamp) public {

   uint256 contractBalance = address(this).balance;

    // check the contract has enough ETH to reach the treshold
    require(contractBalance >= threshold, "Threshold not reached");
   // Execute the external contract, transfer all the balance to the contract
    // (bool sent, bytes memory data) = exampleExternalContract.complete{value: contractBalance}();
    (bool sent,) = address(exampleExternalContract).call{value: contractBalance}(abi.encodeWithSignature("complete()"));

    require(sent, "exampleExternalContract.complete failed");

//exampleExternalContract.address.call.value(1);

}

  function timeLeft() public view returns(uint timeLeft) {
      //require(exampleExternalContract.completed);
       if(block.timestamp>=deadline){
         return 0;
       }else{
      //return deadline- block.timestamp;
      return deadline -block.timestamp;
  }}
  // Add the `receive()` special function that receives eth and calls stake()

}