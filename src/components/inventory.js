import React, { useState, useEffect, useContext} from 'react';
import {useImage} from 'react-image';
import TokenInventory from "./token.js";
import "../assets/nft.sass";
import "../assets/inventory.sass";
import "../assets/animations.css";
import { Link } from "react-router-dom";
import Nft from './nft.js';
import src from '../images/bakery-shop.png';
import { AppContext } from "../App.js";

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const DisplayImage = ({contractState,accountAddress,index}) => {
  
  const [nftMetadata, setNftMetadata] = useState()
  const [tokenOwner, setTokenOwner] = useState()
  const [tokenId, setTokenId] = useState()
  console.log(index)

  const sliptAddressText = (address) =>{
    return address.split("").splice(-5);
  }

  const GetURI = async (data) => {
    
    if(data === "undefined") return [];

    const tokenUri = await contractState.tokenURI(index);
    
    await fetch(tokenUri , {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      })
      .then(data => {
        return data.json();
      })
      .then(data => {
        return setNftMetadata(data || []);
      })
      .catch(err => {
        return console.log(err);
    });
    
  };

  useEffect(() => {
    GetURI()
  }, [index]);
  
  return (
      <div className="token-container">
        {nftMetadata?(
          <Nft tokenId={index} contractAddress={contractState.address} nftMetadata={nftMetadata} tokenOwner={accountAddress} />
        ):
        <div class="lds-hourglass"></div>
      }
      </div>
    );

}


const Inventory = () => {
  
  const {accountAddress, contractState, setReload} = useContext(AppContext);
  
  let toStringSupply = undefined;
  const [emptyArray,setEmptyArray] = useState([])
  
  const [loading, setLoading] = useState(false);
  let tokenIndex = -1 //wallet of Owner array index position

  const getSupply = async() => {
    try{
      const supply = await contractState.walletOfOwner(accountAddress);
      console.log(supply)
      for(let i=supply.length;i!=0;i--){ 
          tokenIndex++
          setEmptyArray(oldArray => [...oldArray, supply[tokenIndex]]);
        }
    }catch(err){
      return console.log(err)
    }
  }

  const createNFTTransaction = async () => {
    setLoading(true)
    console.log(contractState)
    try {
        
        const transaction = await contractState.mint(1, {
          value: '10000000000000000',
          gasLimit: 9000000
        });

        await transaction.wait().then(result =>{
          console.log(result)
        })
        
        setEmptyArray([])
        getSupply()
        setLoading(false);
    } catch (e) {
        setLoading(false);
        console.error(e);
    }

  };

  useEffect(()=>{
      // setLoading(true);
      if(contractState != undefined){
          getSupply();
      }

  },[accountAddress,contractState])

  return (
        
    <div className="inventory">
    
      <p className="other-font">Your Bakery</p>
      {(() => {
              if(emptyArray.length>0){
                return(
                  <div>
                    {
                    emptyArray.map((something, index)=>{
                    return (
                      <div key={index} className="display-image-container">
                        <DisplayImage
                          index={something}
                          accountAddress={accountAddress}
                          contractState={contractState} />
                      </div>
                    )})
                    }
                    
                    <div className="no-artwork">
                    
                      <p className="other-font">Mint a concha</p>

                      <div className="bakery-image-container" onClick={() => createNFTTransaction()}>
                        <img className="heartbeat-2" width="100px" src={src} />
                      </div>
                    </div>

                  </div>
                )
              }else{
                return(                
                  <div className="no-artwork">
                    
                    <p className="other-font">You're low on bread!</p>

                    <div className="bakery-image-container" onClick={() => createNFTTransaction()}>
                      <img className="heartbeat-2" width="100px" src={src} />
                    </div>
                  </div>
                  )
              }  
            })()}
           
    </div>

  )
}

export default Inventory;
