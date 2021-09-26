import React, { useState, useRef, useEffect } from "react";
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import "../assets/index.sass"
import "../assets/loader.css"
import { AppContext } from "./layout.js";

const { ContractData } = newContextComponents;

const Tokens = ({drizzle,drizzleState}) => {
    
    const GetURI = async (data) => {
    
        const TotalSupply = await data.drizzle.contracts.CryptoConchasRinkeby.methods.totalSupply().call()
        
    }    

    return(
        <div className="tokens-container">
            <h1>Available</h1>

        </div>
    )
}

export default Tokens;