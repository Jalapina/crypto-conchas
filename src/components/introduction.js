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

const Introduction = ({drizzle}) =>{
    
    return(
        <div className="introduction-container">

          <div className="conchas-introduction-statement">
            <div>
              <p className="first-statement">
                Crypto Conchas is a digital collection of the most delicious Mexican sweet bread
                known to everyone.
              </p>
            </div>
            <div className="white-background">
              <p>
                Our mission is to introduce the new concepts of the internet to the latino community, the blockchain will take these delicious Conchas into the future.
              </p>
            </div>
          </div>

      </div>
    )
}

export default Introduction;
