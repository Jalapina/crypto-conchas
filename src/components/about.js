import React from "react";
import "../assets/about.sass"

import Conchas from "../images/crypto-conchas-logo.png"
import mexicanConchas from "../images/mexican-colors-concha.png"
import pinkConchas from "../images/pink-concha.png"
import whiteConchas from "../images/white-concha.png"
import Faq from "../components/faq"

const sliptAddressText = (address) =>{
  return address.split("").splice(-6);
}

const About = () =>{
    
    return(
        <div className="what-is-crypto-conchas">
          <h1 className="other-font">What?</h1>
          <p className="other-font">¿Qué es esto?</p>

          <div className="conchas-images-container">
              <img className="concha-about-image mexican" src={mexicanConchas}/>
              <img className="concha-about-image pink" src={pinkConchas}/>
              <img className="concha-about-image white" src={whiteConchas}/>
          </div>

          <div className="conchas-statement">
            <p>
              Crypto Conchas is a digital collection of a declicous Mexican pastry that has been imbedded in Mexican culture for years.
            </p>
            <p>
              Conchas are a Mexican style sweet bread that was orignially inspiration by Brioche, but somewhere along the way they decided to add sugar on top and now rest is history.
            </p>

          </div>
          
          <h3 className="other-font">How they work</h3>

          <div className="smart-contract">
            
            <div className="concha-image">
              <img src={Conchas}/>
            </div>

            <p style={  {fontFamily: 'Bounties', fontSize: "25px"}}>View ERC-721 Contract</p>
            <a
              href="https://Rinkeby.etherscan.io/address/0x3473146b6fFEB474f3B6Ea90D0bA6AD30E909f9E"
              target="_blank"
              rel="noopener noreferrer"
              >
              Our Smart Contract
            </a>

            <div className="conchas-statement">
              <p>This project is an ERC-721 smart contract running in the Ethereum Rinkeby testnet.</p>
              <p>Each concha is stored using InterPlanetary File System (IPFS) protocol.</p>
              <p>That means each concha will live in the network forever.</p>
              <p>Once you mint a token, you're assigned a unique concha to your address that belongs to you.</p>
            </div>
          </div>

          <Faq/>
      </div>
    )
}

export default About;
