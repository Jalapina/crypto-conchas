import React, { useState, useEffect } from "react";
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import * as menuStyles from "../assets/menu.module.scss";
import TokenInventory from "./token.js"

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const DisplayImage = (NftData) => {
    
    const [nftMetadata, setNftMetadata] = useState();
    const [owner, setOwner] = useState();
  
    const sliptAddressText = (address) =>{
      return address.split("").splice(-5);
    }
  
    const isUrlValid = (url) =>{
      return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    } 
  
  
    const GetURI = async (data) => {
      
      const _owner = await data.drizzle.contracts.CryptoConchasRinkeby.methods.ownerOf(data.tokenId).call()
      
      setOwner(_owner);
  
      if(data === "undefined") return [];
      
      const nftURI = await data.drizzle.contracts.CryptoConchasRinkeby.methods.tokenURI(data.tokenId).call()
      
      if(!isUrlValid(nftURI)) return console.log("No URI: ", nftURI);
    
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
          console.log(data)
          return setNftMetadata(data || []);
        })
        .catch(err => {
          return console.log(err);
      });
      
    };
  
    const callUri = async() =>{
      const data = await GetURI(NftData)
      setNftMetadata(data)
    }
  
    useEffect(() => {
    }, [nftMetadata]);
  
    useEffect(() => {
      GetURI(NftData)
    }, [NftData.tokenId]);
  
    return (
      <div className="token-container">
  
        <ContractData
          drizzle={NftData.drizzle}
          drizzleState={NftData.drizzleState}
          contract="CryptoConchasRinkeby"
          method="CID"
          methodArgs={[NftData.tokenId]}
          render={(cid) =>(
            <div className="token-container">
              <TokenInventory cid={cid} address={NftData.address} owner={owner} metadata={nftMetadata} tokenId={NftData.tokenId} />
            </div>
          )}
        />
  
      </div>
    );
  
}

const { ContractData } = newContextComponents;

const Inventory = ({drizzle,drizzleState}) => {
    return (
        
    <div className="collection-title">
    
        <h1>Collection</h1>

        <div className="colleciton-subtitle">These fine pieces of art belong to: 
            <a href={`https://rinkeby.etherscan.io/address/${drizzleState.accounts[0]}`} target="_blank" rel="noopener noreferrer">
                {drizzleState.accounts[0].address}
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
              <Jumbotron className="no-artwork">
                You have no artwork in your collection!
              </Jumbotron>
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
                                <div>
                                  <DisplayImage address={drizzle.contractList[0].address} tokenId={tokenId} drizzle={drizzle} drizzleState={drizzleState} />
                                </div>
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
