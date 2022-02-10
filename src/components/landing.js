import React, { useState, useRef, useEffect, useContext } from "react";
import ReactPlayer from 'react-player'
import "../assets/index.sass"
import "../assets/landing.sass"
import "../assets/animations.css"
import "../assets/roadmap.scss"
import Introduction from './introduction.js'
import Faq from "./faq"
import opensea from "../images/opensea-logo.png"
import rarible from "../images/rarible-logo.svg"
import video from "../images/conchas-animation.webm"
import concha from "../images/crypto-conchas-logo.png"
import Cornsilk from "../images/Cornsilk-concha.png"
import royal from "../images/royal-blue-v2.png"
import allColors from "../images/all-color-conchas.png"
import PinkInstagram from "../images/pink-instagram.png"
import discord from "../images/discord.png"
import twitter from "../images/twitter.png"

const Landing = () => { 

  return (
    <div className="landing">
   
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
                Launch
              </div>
              <div class="timeline__event__description">
                <p>Crypto conchas will launch with an a mint amount of 10,000 tokens!</p>
              </div>
            </div>
          </div>
          <div class="timeline__event animated fadeInUp delay-2s timeline__event--type2">
            <div class="timeline__event__icon">
              <i class="lni-burger"></i>
              <img src={Cornsilk}/>              
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Winner
              </div>
              <div class="timeline__event__description">
                <p>Winner of the raffel will be announced</p>
              </div>
            </div>
          </div>
          <div class="timeline__event animated fadeInUp delay-1s timeline__event--type3">
            <div class="timeline__event__icon">
              <img src={concha}/>
            
              <i class="lni-slim"></i>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Giveaway
              </div>
              <div class="timeline__event__description">
                <p>We will give out free conchas</p>
              </div>

            </div>
          </div>
          <div class="timeline__event animated fadeInUp timeline__event--type1">
            <div class="timeline__event__icon">
              <i class="lni-cake"></i>
              <img src={royal}/>
            </div>
            <div class="timeline__event__date">
              20-08-2019
            </div>
            <div class="timeline__event__content">
              <div class="timeline__event__title">
                Evolution
              </div>
              <div class="timeline__event__description">
                <p>If intial tokens sell out we will work on new and eveolved conchas that will go out for free to any of the first 1k mint</p>
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
        <div className="social-media">
          <div className="social-media-image-container">
            <a href="https://www.instagram.com/cryptoconchas/" className="social-media-link">
              <img src={PinkInstagram}/>
            </a>
          </div>
          <div className="social-media-image-container">
            <a href="https://discord.gg/KsHwRYKTQV" className="social-media-link">
              <img src={discord}/>          
            </a>
          </div>
          <div className="social-media-image-container">
            <a href="https://twitter.com/ConchasCrypto" className="social-media-link">
              <img src={twitter}/>          
            </a>
          </div>
        </div>
        <Faq/>
    </div>
    
  );

};

export default Landing
