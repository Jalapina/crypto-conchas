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

const DisplayImage = ({contractState,accountAddress,index,background}) => {
  
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
      <div className="token-container" style={{background:background}}>
        {nftMetadata?(
          <Nft tokenId={index} background={background} contractAddress={contractState.address} nftMetadata={nftMetadata} tokenOwner={accountAddress} />
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
  const [totalSupply, setTotalSupply] = useState();
  const imageColorArray = ["blue","brown","green","cornsilk","#72e104","orange","pink","red","#7fff01","#008b8a",
  "turquoise","Aquamarine","white","yellow","purple","Bisque","Crimson","Dark Goldenrod","#fff8dc","#01ffff","#d658cf","turquoise","Aquamarine","white","yellow","purple","Bisque","Crimson","Dark Goldenrod","#fff8dc","#01ffff","#d658cf","turquoise","Aquamarine","white","yellow","purple","Bisque","Crimson","Dark Goldenrod","#fff8dc","#01ffff","#d658cf"];
  // let tokenIndex = -1 //wallet of Owner array index position
  
  const addViewCount = () =>{
    let count = 0;

    while(count < 5){
      if(emptyArray.length<totalSupply){
        setEmptyArray(oldArray => [...oldArray, ""]);
      }
      count++
    }

  }

  const getSupply = async() => {
    try{
      let supply = await contractState.totalSupply();
      supply = Number(supply);
      setTotalSupply(supply)

      for(let i=1;i<=10;i++){ 
          setEmptyArray(oldArray => [...oldArray, ""]);
        }

      }catch(err){
        return console.log(err)
      }
    }
    
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

  useEffect(()=>{
      if(contractState != undefined){
          getSupply();
      }
    },[accountAddress,contractState])

  return (
        
    <div className="inventory">
          {(() => {
              if(emptyArray.length>0){
                return(
                  <div className="token-image-container" >
                    <p className="other-font">Minted Bakery</p>
                    <p className="other-font">
                      {totalSupply}/10000
                    </p>
                    {
                    emptyArray.map((_, index)=>{
                    return (
                      <div key={index} className="display-image-container">
                        <DisplayImage
                          index={index+1}
                          background={imageColorArray[index]}
                          accountAddress={accountAddress}
                          contractState={contractState} />
                      </div>
                    )})
                    }
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
           {emptyArray.length>0?(
              <div>
                {emptyArray.length != totalSupply ? (
                  <button onClick={()=>addViewCount()}>
                    See More
                  </button>
                ):""
                }
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

export default Inventory;
