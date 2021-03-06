import { SyncOutlined } from "@ant-design/icons";
import { utils, BigNumber } from "ethers";
import { Button, Alert, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch , List} from "antd";
import React, { useState } from "react";
import { Address, Balance,Events } from "../components";
import humanizeDuration from "humanize-duration";

export default function Lotto({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  lotto_timeLeft,
  totalEntries,
  ethInLotto,
  newLottoStarted
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  
    //so.. is there a way to have a specific Lotto object or something like useContractReader("LottoController, contracts(1)")
   // console.log("readContracts.Lotto: " + readContracts.LottoController.contracts);

  return (
 
    <div>
    
      
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Welcome to the Lottery:</h2>
        {/*<h2>isActive: {hasLottoStarted} </h2> **how to see if a particular lotto in the contracts array is active? */}
        <h2>Total Entries: {parseInt(totalEntries)}</h2>
        <h2>Eth in pool: {/*utils.formatUnits(ethInLotto.toString(),"eth")*/}</h2>
        <Divider />
        <div style={{ margin: 8 }}>
        {//console.log("*************************entries: " + parseInt(totalEntries))
        }

        <div style={{ padding: 8, marginTop: 32 }}>
              <div>Timeleft:</div>
              {lotto_timeLeft && humanizeDuration(lotto_timeLeft.toNumber() * 1000)}
            </div>
         
    
              
          
          <Button
            style={{ marginTop: 8 }}
            //onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              // const result = tx(writeContracts.YourContract.setPurpose(newPurpose), update => {
              //   console.log("📡 Transaction Update:", update);
              //   if (update && (update.status === "confirmed" || update.status === 1)) {
              //     console.log(" 🍾 Transaction " + update.hash + " finished!");
              //     console.log(
              //       " ⛽️ " +
              //         update.gasUsed +
              //         "/" +
              //         (update.gasLimit || update.gas) +
              //         " @ " +
              //         parseFloat(update.gasPrice) / 1000000000 +
              //         " gwei",
              //     );
              //   }
              // });
              onClick={async () => {
                /* look how you call setPurpose on your contract: */
                /* notice how you pass a call back for tx updates too */
             /*   tx({
                  to: writeContracts.YourContract.address,
                  value: utils.parseEther("0.001"),
                });*/
              
                  //i guess YourContract is variable for Lotto_Pool abstracted away
               // console.log("readContracts.Lotto: " + readContracts.Lotto);
                  // if(!readContracts.hasStarted){
                  //   alert("Lottery has not Started")
                  // }     



// Not sure what I am trying to do now sort of lost my way.
// think of next way to progress and work on that.
//console.log("balances: " + lotto_users);
//well for some reason it's false again, maybe need to render the use contract thing on this side.
//if i start lotto and enter lotto in one then it kinda <works className=""></works>



//**whole point of what i am trying to solve rn is so that users cant enter twice. */

//looks like it's solved? not sure, just look around and keep see what is the next logical step... emitting events maybe but
// like a lotto controller? 
//and start looking at designs and stuff for other projects to make it look legit..



            //  if(balances)
                  //bad name, really lotto_users is if the current address signed in has already entered.
               //   console.log("LOTTO: " + lotto_users);
               //for some reason this was working but now is false... 

               //*** AND HAVE TO CHECK HERE THAT LOTTO HASNT STARTED YET */
               const is_in_lotto = await readContracts.Lotto.balances(address);
console.log("test99 balances: " + is_in_lotto);
console.log("test99 address: " + address);
            if(is_in_lotto){
              alert("You have already entered");
            }else{

               const result = tx( writeContracts.Lotto.deposit({
                    value: utils.parseEther("1"),
                  }) );
              
               console.log("awaiting metamask/web3 confirm result...", result);
            
             //  console.log(await result);

               console.log(await result);
               console.log("result: " + result);
              }}
            }
            
          >
            Enter Lotto!
          </Button>
            <br/>
          
          <br/>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.YourContract.setPurpose(newPurpose), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Claim Winnings
          </Button>




        </div>
       
      
      </div>
          
      <div style={{ width: 500, margin: "auto", marginTop: 64 }}>
              <div>new lotto started</div>
              <List
                dataSource={newLottoStarted}
                renderItem={item => { 
                  const val = item.hasStarted;
                  const val2 = item.args[0];
                  console.log("EVENTBEFORE RETURN??********************");
                  console.log("item.args: " + item.args);
                  console.log("item[0]: " + item.args[0]);
                  console.log("item[1]: " + item.args[1]);
                  return (
                    //BUT WAIT... why is TimeLEFT not need an event? anyways.,maybe i just messed up first
                    <List.Item key={item.blockNumber}>
                      <div />
                      <p hello   /> 
                      
             <span>  Event Triggered  </span>
                       {/* lottery length: {item.args[0]}
                      lottery length: {item.args[1]}
                      Has Started: {hasLottoStarted}  */}
                    </List.Item> 
                  );

                }}
              />
      </div> 



      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
    {/* //************* 

so i figured more or less events, just not how to render the avtual values 
*/ }





{/*Sliders, Date pickers, icons etc..  
      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
        <Card>
          Check out all the{" "}
          <a
            href="https://github.com/austintgriffith/scaffold-eth/tree/master/packages/react-app/src/components"
            target="_blank"
            rel="noopener noreferrer"
          >
            📦 components
          </a>
        </Card>

        <Card style={{ marginTop: 32 }}>
          <div>
            There are tons of generic components included from{" "}
            <a href="https://ant.design/components/overview/" target="_blank" rel="noopener noreferrer">
              🐜 ant.design
            </a>{" "}
            too!
          </div>

          <div style={{ marginTop: 8 }}>
            <Button type="primary">Buttons</Button>
          </div>

          <div style={{ marginTop: 8 }}>
            <SyncOutlined spin /> Icons
          </div>

          <div style={{ marginTop: 8 }}>
            Date Pickers?
            <div style={{ marginTop: 2 }}>
              <DatePicker onChange={() => {}} />
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Slider range defaultValue={[20, 50]} onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Switch defaultChecked onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Progress percent={50} status="active" />
          </div>

          <div style={{ marginTop: 32 }}>
            <Spin />
          </div>
        </Card>
      </div>
    */}
    </div>
  );
}
