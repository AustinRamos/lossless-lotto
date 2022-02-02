pragma solidity ^0.8.4;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./Lotto.sol";


contract LottoController {

//   Lotto [] public exampleExternalContract;
  //Lotto [] public lotto_contracts;
//          some sort of id? or is that dumb.
    //mappping(uint256=>Lotto) public lotto_contracts;
        mapping(uint256 => Lotto) public lotto_contracts;
            //and then mapping of lottos to addresses?

            //ugh so confused trying to do id's and work with lotto thru lotto controller instead of 
            //directly. try to do something simple.. getting to complicated here. 

            //that is dumb bc can just go address(lottocon)
       // mapping(Lotto => address) public lotto_addresses; //or vice versa

uint256 public counter;//keep track of lotto id's
//emit id...?


//events**********
event lottoStarted(address lottoAddress,uint id);

constructor() public{
counter=0;
}

//function get_lotto_info(id)  (emit big event?)
//and the array of ids is 1-lotto_contracts.length

//display id's and all

function gethasStarted(uint id) public view returns (bool) {
   
    Lotto l = lotto_contracts[id];
    bool has = l.hasStarted();
  //  console.log(has);
    return has;

}
//but if this deploys and starts then needs to call start on it too... 

    // function getId() returns (uint256){
    //     lotto_contats
    // }

function start() public returns(address newlottoaddress) {
    Lotto newcon = new Lotto(address(this),counter);
   // lotto_addresses[newcon] = address(newcon);
    lotto_contracts[counter] = newcon;
    newcon.startLottery(); 
    counter++;
    emit lottoStarted(address(newcon),counter);
    return address(newcon);
}

   }