import React from "react";
import "../assets/introduction.sass"
import "../assets/about.sass"

import Conchas from "../images/crypto-conchas-logo.png"
import mexicanConchas from "../images/mexican-colors-concha.png"
import pinkConchas from "../images/pink-concha.png"
import whiteConchas from "../images/white-concha.png"

const sliptAddressText = (address) =>{
  return address.split("").splice(-6);
}

const Introduction = ({drizzle}) =>{
    
    return(
        <div className="introduction-container">

          <div className="conchas-images-container">
            <img className="concha-about-image mexican" src={mexicanConchas}/>
            <img className="concha-about-image pink" src={pinkConchas}/>
            <img className="concha-about-image white" src={whiteConchas}/>
          </div>

          <h3 className="other-font">These are NFT's (Testnet for now)</h3>

      </div>
    )
}

export default Introduction;
