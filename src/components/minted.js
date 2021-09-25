import React, { useState, useEffect } from "react";
import { newContextComponents, AccountData } from "@drizzle/react-components";
import { Jumbotron } from 'react-bootstrap';
import Nft from './nft.js';
import "../assets/minted.sass"
const { ContractData } = newContextComponents;

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
        <div className="minted-individual-token" style={{background:NftData.color}}>
            {nftMetadata?
                <img className="artwork" src={nftMetadata.image_url} />
                :""
            }
        </div>
    );
  
}

const Minted = ({drizzle, drizzleState}) =>{
    
    const backgroundColor = ["#fb84ef","#ab2121","#663399","#4169e1","#ffff00","#2e8b57"];

    return(

        <div className="minted-container">
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
                                        <DisplayImage color={backgroundColor[index]} address={drizzle.contractList[0].address} tokenId={tokenId} drizzle={drizzle} drizzleState={drizzleState} />
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
