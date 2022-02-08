import React, { useState, useRef, useEffect,useContext } from "react";
import "../assets/index.sass"
import "../assets/loader.css"
import { AppContext } from "../App.js";

const Tokens = () => {
    const {accountAddress, contractState, reload, setReload, totalSupply} = useContext(AppContext);
    const GetURI = async (data) => {
    
        const TotalSupply = await contractState.methods.totalSupply().call()
        
    }    

    return(
        <div className="tokens-container">
            <h1>Available</h1>

        </div>
    )
}

export default Tokens;