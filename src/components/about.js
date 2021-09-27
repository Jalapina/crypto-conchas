import React from "react";
import "../assets/about.sass"

import Conchas from "../images/crypto-conchas-logo.png"
import mexicanConchas from "../images/mexican-colors-concha.png"
import pinkConchas from "../images/pink-concha.png"
import whiteConchas from "../images/white-concha.png"

const sliptAddressText = (address) =>{
  return address.split("").splice(-6);
}

const About = ({drizzle}) =>{
    
    return(
        <div className="what-is-crypto-conchas">
          <h1 className="other-font">What?</h1>

          <div className="conchas-images-container">
              <img className="concha-about-image mexican" src={mexicanConchas}/>
              <img className="concha-about-image pink" src={pinkConchas}/>
              <img className="concha-about-image white" src={whiteConchas}/>
          </div>

          <p className="conchas-statement">
            Crypto Conchas is a digital collection of the most delicious breakfast snacks known to man, but most importantly, a Mexican tradition.
            This Mexican tradition dates back hundreds of years, and the blockchain will take these delicious Conchas into the future.
            Why? Because I grew up eating Conchas y cafe all my life and love the artistry Mexico brings to everything. Even food.
          </p>
          
          <h3 className="other-font">These are NFT's (Testnet for now)</h3>

          <div className="smart-contract">
            <div className="concha-image">
              <img src={Conchas}/>
            </div>
            <p style={  {fontFamily: 'Bounties', fontSize: "25px"}}>View ERC-721 Contract</p>
            <a
              href={`https://Rinkeby.etherscan.io/address/${drizzle.contractList[0].address}`}
              target="_blank"
              rel="noopener noreferrer"
              >
              {sliptAddressText(drizzle.contractList[0].address)}
            </a>
          </div>

          <p className="conchas-statement">This project is an ERC-721 smart contract running in the Ethereum Rinkeby testnet, I hope on launching in the mainnet very soon.</p>

      </div>
    )
}

export default About;
