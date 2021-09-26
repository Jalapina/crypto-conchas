import React, {useState} from 'react';
import * as menuStyles from "../assets/menu.module.scss";
import "../index.css"
import "../assets/nft.sass"

import closeIcon from "../images/close.png"

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const TokenInventory = ({address, owner, metadata, tokenId}) => {
  
  const [imageSource, setimageSource] = useState(metadata.image_url );

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));
  
  return (
    <div onClick={nftExpanded} className="nft-container">
      <div className={`nft ${menuStyles.menu} ${
        NftIsClicked ? `${menuStyles.open}` : ""
      }`}>

        {NftIsClicked ?(
            <div className="modal-container">
              <div className="token-meta">
                <h2>{metadata.name} concha  #{tokenId} </h2>
                <a href={`https://testnets.opensea.io/assets/`+address+`/`+tokenId}><p style={{color:"#007cff"}} className="other-font opensea-token-link">OpenSea Profile</p></a>
                <p className="other-font">{metadata.description ? metadata.description : metadata.category}</p>
                <p className="other-font token-owner">Baker: </p> 
                <a className="owner-address" style={{color:"#007cff"}} href={`https://Rinkeby.etherscan.io/address/${owner}`}>{sliptAddressText(owner)}</a>
              </div>
              <div className="token-artwork">
                <img className="artwork heartbeat" width="35%" src={imageSource ? imageSource : 'Loading...'} />
              </div>
            </div>
        ): ""}

        </div>
      <div className="token-name-container">
        <h2 className="token-id">#{tokenId}</h2>
      </div>
      <img className="artwork text-pop-up-top" width="100%" src={imageSource ? imageSource: 'Loading...'} />
    </div>
  )
};

export default TokenInventory;
