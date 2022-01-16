import React, { useState, useRef, useEffect, useContext } from "react";
import { newContextComponents, AccountData } from "@drizzle/react-components";
import ReactPlayer from 'react-player'
import "../assets/index.sass"
import "../assets/landing.sass"
import "../assets/animations.css"
import "../assets/roadmap.scss"
import Introduction from './introduction.js'
import opensea from "../images/opensea-logo.png"
import rarible from "../images/rarible-logo.svg"
import video from "../images/conchas-animation.webm"
import concha from "../images/crypto-conchas-logo.png"
import Cornsilk from "../images/Cornsilk-concha.png"
import alacran from "../images/el-alacran.png"
import gold from "../images/Gold.png"

const Landing = () => { 

  return (
    <div className="landing">
        <Introduction/>
        <div className="no-web3">
        <div class="blob">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"/>
          </svg>
        </div>

          <div className="info-marketplaces-wrapper">
            <div className="no-wallet-statement">
              <p className="slide-right">No wallet?</p> 
              <p className="slide-right">No worries, view our Conchas on these marketplaces.</p>
            </div>
            <div className="marketplaces-image-container">
              
              <div className="marketplace-image-conatiner">
                <a href="https://testnets.opensea.io/collection/cryptoconchasrinkeby">
                  <img className="opensea-image" src={opensea}/>
                </a>
              </div>

              <div className="marketplace-image-conatiner">
                <a href="https://rinkeby.rarible.com/collection/0x3473146b6ffeb474f3b6ea90d0ba6ad30e909f9e">
                  <img className="opensea-image" src={rarible}/>
                </a>
              </div>

            </div>
          </div>

        </div>
        <div className="road-map">


        </div>
        <div class="timeline"> 
          <div class="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
            <div class="timeline__event__icon ">
              <i class="lni-cake"></i>
              <img src={concha}/>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content ">
              <div class="timeline__event__title">
                Birthday
              </div>
              <div class="timeline__event__description">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit accusantium id aut architecto harum quidem dolorem in!</p>
              </div>
            </div>
          </div>
          <div class="timeline__event animated fadeInUp delay-2s timeline__event--type2">
            <div class="timeline__event__icon">
              <i class="lni-burger"></i>
              <img src={gold}/>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Lunch
              </div>
              <div class="timeline__event__description">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit accusantium id aut architecto harum quidem dolorem in!</p>
              </div>
            </div>
          </div>
          <div class="timeline__event animated fadeInUp delay-1s timeline__event--type3">
            <div class="timeline__event__icon">
              <i class="lni-slim"></i>
              <img src={Cornsilk}/>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Exercise
              </div>
              <div class="timeline__event__description">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit accusantium id aut architecto harum quidem dolorem in!</p>
              </div>

            </div>
          </div>
          <div class="timeline__event animated fadeInUp timeline__event--type1">
            <div class="timeline__event__icon">
              <i class="lni-cake"></i>
              <img src={alacran}/>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Birthday
              </div>
              <div class="timeline__event__description">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, nam! Nam eveniet ut aliquam ab asperiores, accusamus iure veniam corporis incidunt reprehenderit accusantium id aut architecto harum quidem dolorem in!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="the-team-container">
          <h2>The Team</h2>

          <div className="the-team">
            <h3>Founder</h3>
            <img src={concha}/>            
          </div>

          <div className="the-team">
            <h3>Software Developer</h3>
            <img src={concha}/>
          </div>
        </div>
        {/* <div className="video-player-container">
            <ReactPlayer className='react-player' playing={true} loop={true} width={"650px"} url={video} />
          </div> */}
    </div>
    
  );

};

export default Landing
