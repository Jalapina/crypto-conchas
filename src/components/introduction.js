import React from "react";
import "../assets/introduction.sass"
import "../assets/animations.css"

import Conchas from "../images/crypto-conchas-logo.png"
import mexicanConchas from "../images/mexican-colors-concha.png"
import pinkConchas from "../images/pink-concha.png"
import whiteConchas from "../images/white-concha.png"
import rainbowConchas from "../images/crypto-conchas-logo.png"

const sliptAddressText = (address) =>{
  return address.split("").splice(-6);
}

const Introduction = () =>{
    
    return(
        <div className="introduction-container">

          <div className="conchas-introduction-statement">
            <div>
              <p className="first-statement">
                Crypto Conchas is a digital collection of a declicous Mexican baked pastry. We want them to exist in the blockchain where they will stay delicious forever
              </p>
            </div>
            <div className="white-background">
              <p>
                Our mission is to introduce the new concepts of web3 to different communities and help break communication barriers
              </p>
            </div>
          </div>

      </div>
    )
}

export default Introduction;
