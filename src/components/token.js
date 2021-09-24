import React, {useState} from 'react';
import "../index.css"
import * as menuStyles from "../assets/menu.module.scss";
import "../assets/nft.sass"

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const TokenInventory = (data) => {
  
  const [imageSource, setimageSource] = useState(data);

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
                <h2>{data.metadata.name} concha  #{data.tokenId} </h2>
                <a href={`https://testnets.opensea.io/assets/`+data.address+`/`+data.tokenId}><p className="other-font opensea-token-link">OpenSea Profile</p></a>
                <p className="other-font">{data.metadata.description ? data.metadata.description : data.metadata.category}</p>
                <p className="other-font token-owner">Baker: </p> 
                <a className="owner-address" href={`https://Rinkeby.etherscan.io/address/${data.owner}`}>{sliptAddressText(data.owner)}</a>
              </div>
              <div className="token-artwork">
                <img className="artwork heartbeat" width="35%" src={imageSource.metadata.image_url ? imageSource.metadata.image_url : 'Loading...'} />
              </div>
            </div>
        ): ""}

        </div>
      <div className="token-name-container">
        <h2 className="token-id">#{data.tokenId} </h2>
      </div>
      <img className="artwork text-pop-up-top" width="100%" src={imageSource.metadata.image_url ? imageSource.metadata.image_url : 'Loading...'} />
    </div>
  )
};

export default TokenInventory;
