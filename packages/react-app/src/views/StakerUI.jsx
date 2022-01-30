import { SyncOutlined } from "@ant-design/icons";
import { utils, BigNumber } from "ethers";
import { Button, Alert, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, List } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events } from "../components";
import humanizeDuration from "humanize-duration";



export default function StakerUI({
    completeDisplay,
    address,
    mainnetProvider,
    localProvider,
    yourLocalBalance,
    price,
    tx,
    writeContracts,
    readContracts,
    timeLeft,
    stakerContractBalance,
    threshold,
    balanceStaked,
    Contract,
    stakeEvents
    //start
    // putting eveything i curly braces in uncommented code in here...
}) {
    const [newPurpose, setNewPurpose] = useState("loading...");
    const { ethers } = require("ethers");


    return (
        <div>
            {completeDisplay}

            <div style={{ padding: 8, marginTop: 32 }}>
                <div>Staker Contract:</div>
                <Address value={readContracts && readContracts.Staker && readContracts.Staker.address} />
            </div>

            <div style={{ padding: 8, marginTop: 32 }}>
                <div>Timeleft:</div>
                {timeLeft && humanizeDuration(timeLeft.toNumber() * 1000)}
            </div>

            <div style={{ padding: 8 }}>
                <div>Total staked:</div>
                <Balance balance={stakerContractBalance} fontSize={64} />/<Balance balance={threshold} fontSize={64} />
            </div>

            <div style={{ padding: 8 }}>
                <div>You staked:</div>
                <Balance balance={balanceStaked} fontSize={64} />
            </div>

            <div style={{ padding: 8 }}>
                <Button
                    type={"default"}
                    onClick={() => {
                        tx(writeContracts.Staker.execute());
                    }}
                >
                    📡 Execute!
              </Button>
            </div>

            <div style={{ padding: 8 }}>
                <Button
                    type={"default"}
                    onClick={() => {
                        tx(writeContracts.Staker.withdraw(address));
                    }}
                >
                    🏧 Withdraw
              </Button>
            </div>

            <div style={{ padding: 8 }}>
                <Button
                    type={balanceStaked ? "success" : "primary"}
                    onClick={() => {
                        tx(writeContracts.Staker.stake({ value: ethers.utils.parseEther("0.5") }));
                    }}
                >
                    🥩 Stake 0.5 ether!
              </Button>
            </div>

            {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}

            <div style={{ width: 500, margin: "auto", marginTop: 64 }}>
                <div>Stake Events:</div>
                <List
                    dataSource={stakeEvents}
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