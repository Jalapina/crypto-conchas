import React, { useState, useEffect } from "react";
import { newContextComponents, AccountData } from "@drizzle/react-components";
import { Jumbotron } from 'react-bootstrap';

import TokenInventory from "./token.js";
import Nft from './nft.js';

import "../assets/minted.sass"
import "../assets/animations.css";

const { ContractData } = newContextComponents;

const DisplayImage = ({backgroundColor,NftData,drizzle,drizzleState,tokenId}) => {
    
    const [nftMetadata, setNftMetadata] = useState();
    const [owner, setOwner] = useState();
  
    const sliptAddressText = (address) =>{
      return address.split("").splice(-5);
    }
  
    const GetURI = async (data) => {
      
      const _owner = await drizzle.contracts.CryptoConchasRinkeby.methods.ownerOf(tokenId).call()
      
      setOwner(_owner);
  
      if(data === "undefined") return [];
      
      const nftURI = await drizzle.contracts.CryptoConchasRinkeby.methods.tokenURI(tokenId).call()
      
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

const Minted = ({drizzle, drizzleState}) =>{
    
    const backgroundColor = ["#fb84ef","#ab2121","#663399","#4169e1","#ffffff","#ffff00","#2e8b57","#ff9c00","#ea0000"];

    return(

        <div className="minted-container showcase">
        
            <h1>Minted and Baked</h1>

            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CryptoConchasRinkeby"
                method="totalSupply"
                labels="length"
                render={(balanceOf) => {
                const emptyArray = [];
                const arrayLength = Number(balanceOf);
                for(let i=0;i<arrayLength;i++){ emptyArray.push('') }
                if(emptyArray.length === 0) {
                    return (
                    <Jumbotron className="no-artwork">
                        No Conchas have been minted and baked yet.
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
                                method="tokenByIndex"
                                methodArgs={[arrayLength - 1 - index]}
                                render={(tokenId) => (
                                    <ContractData
                                    key={index}
                                    drizzle={drizzle}
                                    drizzleState={drizzleState}
                                    contract="CryptoConchasRinkeby"
                                    method="tokenURI"
                                    methodArgs={[tokenId]}
                                    render={(uri) =>  (
                                        <>
                                            <DisplayImage backgroundColor={backgroundColor[index]} address={drizzle.contractList[0].address} tokenId={tokenId} drizzle={drizzle} drizzleState={drizzleState} />
                                        </>
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

export default Minted
