import React, { useState, useEffect} from 'react'
import {useImage} from 'react-image'
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import * as menuStyles from "../assets/menu.module.scss";
import TokenInventory from "./token.js";
import "../assets/nft.sass";
import "../assets/inventory.sass";
import "../assets/animations.css";
import { Link } from "react-router-dom";
import src from '../images/bakery-shop.png'

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const DisplayImage = ({backgroundColor,NftData,drizzle,drizzleState,tokenId}) => {
  
  const [nftMetadata, setNftMetadata] = useState();
  const [owner, setOwner] = useState();

  const sliptAddressText = (address) =>{
    return address.split("").splice(-5);
  }

  const GetURI = async (data) => {
    
    const _owner = await drizzle.contracts.CryptoConchasRinkeby.methods.ownerOf(tokenId).call()
  //   const _owner = undefined
    
    setOwner(_owner);

    if(data === "undefined") return [];
    
    const nftURI = await drizzle.contracts.CryptoConchasRinkeby.methods.tokenURI(tokenId).call()
    console.log(nftURI)
  //   const nftURI = undefined
    
    await fetch(nftURI , {
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

  const callUri = async() =>{
    const data = await GetURI()
    setNftMetadata(data)
  }

  useEffect(() => {
  }, [nftMetadata]);

  useEffect(() => {
    GetURI()
  }, [tokenId]);

  return (
      <div className="minted-individual-token" style={{background:backgroundColor}}>
          {nftMetadata?
              <TokenInventory address={drizzle.contractList[0].address} owner={owner} metadata={nftMetadata} tokenId={tokenId} />
              :<div class="lds-hourglass"></div>
          }
      </div>
  );

}


const { ContractData } = newContextComponents;

const Inventory = ({drizzle,drizzleState}) => {
  

  return (
        
    <div className="inventory">
    

      <div className="colleciton-subtitle">
        
        <h1 className="other-font">Your Conchas</h1>
        <p style={{margin:'25px'}} className="other-font">These fine pieces of art belong to you</p>
        <a href={`https://rinkeby.etherscan.io/address/${drizzleState.accounts[0]}`} target="_blank" rel="noopener noreferrer">
          {sliptAddressText(drizzleState.accounts[0])}
        </a>

      </div>
    
      <ContractData
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract="CryptoConchasRinkeby"
        method="balanceOf"
        methodArgs={[drizzleState.accounts[0]]}
        render={(balanceOf) => {
          const emptyArray = [];
          const arrayLength = Number(balanceOf);
          for(let i=0;i<arrayLength;i++){ emptyArray.push('') }
          if(emptyArray.length === 0) {
            return (
              <div className="no-artwork">
                <p className="other-font">You're low on bread!</p>
                <div className="bakery-image-container">
                  <Link to="/mintable">
                    <img className="heartbeat-2" width="100px" src={src} />
                  </Link>
                </div>
                
              </div>
            )
          }
          return (
            <div className="collection-container">
              {emptyArray.map(( _, index) => {
                return (
                  <ContractData
                    key={index}
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="CryptoConchasRinkeby"
                    method="tokenOfOwnerByIndex"
                    methodArgs={[drizzleState.accounts[0], arrayLength - 1 - index]}
                    render={(tokenId) => (
                      <ContractData
                        key={index}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="CryptoConchasRinkeby"
                        method="tokenURI"
                        methodArgs={[tokenId]}
                        render={(uri) =>  (
                          <DisplayImage address={drizzle.contractList[0].address} tokenId={tokenId} drizzle={drizzle} drizzleState={drizzleState} />
                        )}
                      />
                    )}
                  />

                )}
              )}
            </div>
            );
        }}
      />
    </div>

  )
}

export default Inventory;
