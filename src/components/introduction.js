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
{/* 
          <div className="conchas-image-container rainbow-concha-image-container">
            <img className="concha-image image-rotation-" src={rainbowConchas}/>
          </div>
          
          <div className="pink-concha-image-container conchas-image-container">
            <img className="concha-image image-rotation-" src={pinkConchas}/>
          </div>
          
          <div className="white-concha-image-container conchas-image-container">
            <img className="concha-image image-rotation-" src={whiteConchas}/>
          </div>
          <div className="azteca-concha-image-container conchas-image-container">
            <img className="concha-image image-rotation-" src={aztecaConcha}/>
          </div> */}

          <div className="conchas-introduction-statement">
            <p className="indent">Crypto Conchas is a digital collection of the most delicious Mexican sweet bread
            known to everyone, and a Mexican tradition.
            </p>
            <p>
              Our mission is to introduce the new concepts of the internet to the latino community, the blockchain will take these delicious Conchas into the future.
            </p>
          </div>

      </div>
    )
}

export default Introduction;
