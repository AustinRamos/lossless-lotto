import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events } from "../components";
//import Events from "../components";

export default function LottoController({
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
  newLottoStarted,
  numOfLottos
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  //const lottostartupdate = useEventListener(readContracts,contractName,"lotteryHasStarted",props.localProvider,1);
  //lottostartupdate.

  console.log("test99 NUMBER OF lottos: " + numOfLottos);
  return (
 
    <div>
    
      
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>LoseLess</h2>
        
        <Divider />
        <div style={{ margin: 8 }}>
        {//console.log("*************************entries: " + parseInt(totalEntries))
        }
{
  //perhaps need event to do this?
  //or some if condition so that it only shows if the bool is
}
          {/* <div style={{ width: 500, margin: "auto", marginTop: 64 }}>
              <div>Lotto Events:</div>
              <List
                dataSource={lottoHasStartedEvent}
                renderItem={item => {
                  return (
                    //BUT WAIT... why is TimeLEFT not need an event? anyways.,maybe i just messed up first
                    <List.Item key={item.blockNumber}>
                      lottery length: {item.args[0]}
                      lottery length: {item.args[1]}
                      Has Started: {hasLottoStarted}
                    </List.Item>
                  );
                }}
              />
            </div> */}

            {/* <div style={{ padding: 8, marginTop: 32 }}>
              <div> hasStarted: {hasLottoStarted}</div>
       
              <div> time: {lotto_timeLeft}</div>
             
            </div> */}

<Button
            style={{ marginTop: 8 }}
            
              onClick={async () => {
               // const hasStarted = await readContracts.LottoController.hasStarted();
               

               const result = tx( writeContracts.LottoController.start({}));
  
               console.log(await result);
               console.log("result " + result);

               //pass the id of the lotto. id's range from 1 to the len(lotto_contracts) in sol file
               const haslottoStarted = await readContracts.LottoController.gethasStarted(1);
console.log("test99 has started: " + haslottoStarted);
const contracts = await readContracts.LottoController.lotto_contracts;

//console.log("test99 lotto_contracts " + contracts);
            
                <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
         
        </div>

            }}
            
          >
            Start a new Lotto!
          </Button>
         
          <br/>
              
          
          <Button
            style={{ marginTop: 8 }}
         
              onClick={async () => {
 console.log("test")
              }}
            
            
          >
           View your active lottos!
          </Button>
            <br/>
          
       



        </div>
       
      
      </div>
     
      <div style={{ width: 500, margin: "auto", marginTop: 64 }}>
                <div>LottoController Events:</div>
                <List
                    dataSource={newLottoStarted}
                    renderItem={item => {
                        return (
                            <List.Item key={item.blockNumber}>
                                <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
                                <Balance balance={item.args[1]} />
                            </List.Item>
                        );
                    }}
                />
            </div>
    </div>
  );
}