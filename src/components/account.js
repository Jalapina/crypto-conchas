import React, { useState, useEffect, useContext} from 'react';
import {useImage} from 'react-image';
import TokenInventory from "./token.js";
import "../assets/account.sass";
import "../assets/animations.css";
import * as menuStyles from "../assets/menu.module.scss";
import closeIcon from "../images/close.png";
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

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));

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
      <div className="account-collection-container">
        {nftMetadata?(
          <div className="nft-container">

          <div className={` ${menuStyles.menu} ${ NftIsClicked ? `${menuStyles.open}` : ""}`}>
            
              <div className="close-icon-wrapper">
                <img onClick={nftExpanded} className="close-icon" width="40px" src={closeIcon}/>
              </div>

              {NftIsClicked ?(
                <div className="modal-container">

                  <div className="nft-image-focus">
                    <img className="artwork" width="200px" src={nftMetadata.image} />
                  </div>
                  
                  <div className="token-options">
                    <h2>{nftMetadata.name}</h2>
                  </div>

                </div>
              ): ""}
          </div>

          <h2 className="token-name">{nftMetadata.name}</h2>      
          <img onClick={nftExpanded} className="artwork" width="200px" height="200px" src={nftMetadata.image} alt="Token Image"/>

        </div>
        ):
        <div class="lds-hourglass"></div>
        }
      </div>
    );

}


const Account = () => {
  
  const {accountAddress, contractState, setReload} = useContext(AppContext);
  
  let toStringSupply = undefined;
  const [emptyArray,setEmptyArray] = useState([])
  
  const [loading, setLoading] = useState(false);
  let tokenIndex = -1

  const getContractName = async() => {
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
    try {
        
        const transaction = await contractState.mint(accountAddress, {
            value: '10000000000000000',
            gasLimit: 9000000
        });

        await transaction.wait().then(result =>{
            setReload(true)
        })

        setLoading(false);
    } catch (e) {
        setLoading(false);
        console.error(e);
    }

  };

  useEffect(()=>{
      // setLoading(true);
      if(contractState != undefined){
          getContractName();
      }

  },[accountAddress])

  return (
        
    <div className="account">
        <div className="account-information">
            <p className="account-address">Address: {sliptAddressText(accountAddress)}</p>
        </div>
        {emptyArray.length>0 ?(
            
            emptyArray.map((something, index)=>{
                return (
                    <DisplayImage
                        index={something}
                        accountAddress={accountAddress}
                        contractState={contractState} />
                )}
            )
        ):(
            <div className="no-artwork">
              <p className="other-font">You're low on bread!</p>

              <div className="bakery-image-container" onClick={() => createNFTTransaction()}>
                  <img className="heartbeat-2" width="100px" src={src} />
              </div>
            </div>
        )
        }
    </div>

  )
}

export default Account;
