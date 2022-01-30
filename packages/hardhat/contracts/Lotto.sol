pragma solidity ^0.8.4;

//ragma solidity >=0.6.0 <0.7.0;
//pragma solidity 0.8.4;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

//so the smartcontract when pool created has a uint expiry variable
//uint expiry = blockstamp.time + 1000(for 10 min or whatev)

//browser somehow checke everytime if unix time has passed that expiry time on its end?

//*****basically how will smart contract know when time is passed?

//I mean i know i can do block.timestamp plus time
//but how does the picking winner trigger when that happens?
//has to be done via ui

//block.timestamp + 1000 = 10 minute delay.

//what to work on today a  'create/start pool' button
//withj param (5 days etc) for when pool expires and wnner is chosen
//and i guess anyone would be able to call function
//but itd require the date to be past it?

contract Lotto {
    //smartcontractprogrammer youyubt now..

    //sp we're gonne make sure ppl can only put in $1
    //which is 300000000000000 wei

    // event SetPurpose(address sender, string purpose);

    //tring public purpose = "Building Unstoppable Apps!!!";

    mapping(address => bool) public balances;
    mapping(uint256 => address) public entries; //unsure sbout this might be redundant
    address payable[] public entries2;
    uint256 public totalEntries;
    uint256 public treasury;
    address payable public winner;
    uint256 public winnings; //so it can be shown on javascript side
    uint256 public fees_accruded;
    uint256 lengthOfLottery;
    bool public hasStarted;
    bool hasEnded;
    uint256 ticketPrice = 1 ether;
    //got this idea from some event things..
    uint256 lotteryEndTime;

    //event Stake(address indexed sender ,uint256 amount); ??lotto

  //  ***
        //so where i am is that the lotto contract compiles with everything(i think), and the stake contract has clever way react side to show time left.
        //so copy that fo the lotto and maybe have another tab, stake and lotto?
   // ***


    event LotteryhasEnded(address winner, uint256 winnings); //dont need winnings for both of these
    event lotteryHasStarted(uint lengthOfLottery, uint lotteryEndTime);
    /// The auction has already ended.
    error LottoAlreadyEnded();

    // event pick_winner_and_send(address winner, uint winnings);
   // //constructor(uint lengthofLottery   -> saw this but dont get why that would be good. oh bc each contract ois a lottery and i am building lottery system and individual lottery!!!
   //above better if the contract is being called from another contract poolmaster.
    constructor() {
        hasStarted=false;
        hasEnded=false;
        lengthOfLottery = 150000; //15 minutes
       // winner - 0x0;
        // what should we do on deploy?
        totalEntries = 0; //is this even necessary?
        treasury = 0; //not importatnt i guess just teh balance. but rinning in case several lottos are ahppebibg or something

    }

    //RETHINGK THE CLAIM/PICK WINNER.
    //CLAIM CALL HAS TO HAVE AN ERROR FOR IF SOMEONE CLAIMS BEFORE
    //AND THAT msg.sender is winner etc. does contract have gas inside that to take care of that idk?

    //returns bool if success?
    //function createPool() external returns (bool) {}

    function balanceOf() external view returns (uint256) {
        console.log("balance: %s", address(this).balance);
        return address(this).balance;
    }

    function startLottery() public  {
        require(!hasStarted, "Lottery has already started");
 hasStarted=true;
 lotteryEndTime = block.timestamp + lengthOfLottery;
        //not using this in react, will have to learn how.
    emit lotteryHasStarted(lengthOfLottery,lotteryEndTime);
    }

    //but maybe a function so it has to be the same amount for everyone.
    function deposit() public payable {
        require(hasStarted, "This lottery has not started yet");
        //or use revert soemtimes require others
        require(hasStarted && !balances[msg.sender] && msg.value == ticketPrice);
        // Revert the deposit if the lotto
        // period is over.
        if (block.timestamp > lotteryEndTime) revert LottoAlreadyEnded();
        console.log("msg.amount: %s", msg.value);
        console.log("address(this).balance: %s", address(this).balance);
        treasury+=ticketPrice;
        winnings+=ticketPrice;//? or just get it somewhere else?
        balances[msg.sender] = true;
        entries[totalEntries] = msg.sender; //necessary for random picking at end
        entries2.push(payable(msg.sender));
        totalEntries++;
        console.log("new entry from %s", msg.sender);
        //console.log("entries.length test: %s", entries.length);
        console.log("Total # of entries: %s", totalEntries);
     
    }
function endLottery () public {
  // pickgwinner
   winner = payable(pickWinner());
   //other state changes
   // emit lotteryhasendedl
   //enable claiming
}

    //the very very naive weay for randomness... will have to evaluate.
    function random() private view returns (uint256) {
        // sha3 and now have been deprecated
        // console.log("entries: %s",entries);
        //console.log("entries length: %s",entries.length);

        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        entries2
                    )
                )
            );
        // convert hash to integer
        // players is an array of entrants
    }

    function claim() public {
        require(msg.sender == winner);
        console.log("before winner balance: %s", winner.balance);
        payable(winner).transfer(winnings);
        winnings = 0;
        console.log("%s transferred to %s", winnings, winner);
        console.log("after winner balance:", winnings, winner.balance);

        console.log("final smart contract balance: %s", address(this).balance);
    }

    function pickWinner() private returns(address){
        uint256 index = random() % totalEntries;
        winner = entries2[index];
        winnings = address(this).balance;
        console.log(
            "winner of %s Wei is is: %s",
            address(this).balance,
            winner
        );
        return winner;
    }

    function timeLeft() public view returns(uint timeLeft) {
      //require(exampleExternalContract.completed);
       if(block.timestamp>=lotteryEndTime){
         return 0;
       }else{
      //return deadline- block.timestamp;
      return lotteryEndTime -block.timestamp;
  }}
}

//so first take ability to adda  5% fee...
//obw would only take fees off teh yield.

//thats funny, pickeinner can be calle several times.
//it should only be able to be called if a lotto is active or if there are no funds to be claimed?

//so ability to create pools with defined 'time leases'
// and above example is 1 pool, would that all be in same contract? or new pool in diff protbably..
//uint private leaseTime = 100000
//uint expiry = block.timestamp + leaseTime
//but wait who is picking the winner... that has to be done algorithmically ot by calling something elsse
//not some guy pushing the button...

//require instead of if...

//still dont fully understand the middle pat where what the javascript recieves
//and decodes from calls to the contract

//USERS WILL HAVE TO CLAIM FUNDS which is much better.

//* FALLBACK approach does not work for number of reasons. unless i trat fallback as
//complete as deposit into lotery... bc deposits into there will go totally untracked. *//

//things to work on:

//calculate total amount won and send to them.

//duration of lotto

//withdrawing before lotto time is up

//event for whrn lotto expires and winner is chosen?

//taking a small fee and keeping in 'treasury

//last steo w

//make a substack going over my thought pocess and how to start small and expand
//if i do suybstack thing vastly simpify the react front end for caffold to make it very simple

//order for tuturial
/* fork scaffold ether
add ability to deposit for 1 user
limit tp 1 entry ofa fixed amount
maps and addresses explain why necessary
once winner is picked
then claim availability... lot to think about for that.
does it go into some sort of vault, or just sit in the contract?
const address winner = 0x00000
then set it in 
later let people add however much they want and they get a precentage chance... 
*/

//final notes for later
//transfering winnings isnt working. look into that
//claim being weird
//obviously pick winner should be private and ppl should not be able to call it again once a winner is set.
//and some event wayu to do that?
