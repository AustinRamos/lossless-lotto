pragma solidity ^0.8.4;
//pragma solidity 0.8.4;
//pragma solidity ^0.8.0;



//look at solitiy type i thigns start breaking!!

contract ExampleExternalContract {

  bool public completed;

  function complete() public payable {
    completed = true;
  }

}
