import React, { useState, useEffect, useContext} from 'react';
import "../assets/inventory.sass";
import "../assets/animations.css";
import { Link } from "react-router-dom";
import src from '../images/bakery-shop.png';
import { AppContext } from "../App.js";


const Mint = () => {
  
  const {accountAddress, contractState, setReload} = useContext(AppContext);
  
  const createNFTTransaction = async () => {
      setLoading(true)

      try {
        
        const transaction = await contractState.mint(1, {
          value: '10000000000000000',
          gasLimit: 9000000
        });
        
        await transaction.wait().then(result =>{
          setEmptyArray(oldArray => [...oldArray, ""]);
        })
        
        setLoading(false);
      } catch (e) {
          setLoading(false);
          console.error(e);
      }

  };

  return (
        
    <div className="mint-function">
           {emptyArray.length>0?(
              <div>
                <button onClick={()=>addViewCount()}>
                  See More
                </button>
              <div className="mint-options">
                <p className="other-font mint-button">Mint a concha</p>

                <div className="bakery-image-container" onClick={() => createNFTTransaction()}>
                  <img className="heartbeat-2" width="100px" src={src} />
                </div>
              </div>
              </div>
           ):""}
    </div>

  )
}

export default Mint;