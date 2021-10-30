import React , {useState}from "react";
import "../assets/header.sass"
import { Link } from "react-router-dom";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'

const Header = ({initialized}) => {

    return (
        <header>
            <Link style={{display:'block'}} to="/"><h1 className="dApp-title">Crypto Conchas</h1></Link>
            {initialized?(
                <Link to="/mintable"><h1 className="other-font">Mint A Concha</h1></Link>
                
            ):
                <div className="connect-wallet-container">
                    <h1 className="other-font">Connect Wallet</h1>
                </div>
            }
            <Link to="/about"><h1 className="other-font">What?</h1></Link>
        </header>
    );
};

export default Header;
