import React, { useState, useRef, useEffect, useContext } from "react";
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import ReactPlayer from 'react-player'
import "../assets/index.sass"
import "../assets/landing.sass"
import Introduction from './introduction.js'
import opensea from "../images/opensea-logo.png"
import rarible from "../images/rarible-logo.svg"
import video from "../images/conchas-animation.webm"

const Landing = () => { 


  return (
    <div className="landing">
        <Introduction/>
        <div className="no-web3">
          <div className="info-marketplaces-wrapper">
            <p>No wallet?</p> 
            <p>No worries, you can view our Conchas on these marketplaces.</p>
            <div className="marketplaces-image-container">
              <div>
                <a href="https://testnets.opensea.io/collection/cryptoconchasrinkeby">
                  <img className="opensea-image" src={opensea}/>
                </a>
              </div>
              <div>
                <a href="https://rinkeby.rarible.com/collection/0x3473146b6ffeb474f3b6ea90d0ba6ad30e909f9e">
                  <img className="opensea-image" src={rarible}/>
                </a>
              </div>
            </div>
          </div>


        </div>
        <div className="video-player-container">
            <ReactPlayer className='react-player' playing={true} loop={true} width={"650px"} url={video} />
          </div>
    </div>
    
  );

};

export default Landing
