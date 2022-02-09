import React, {useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import "../assets/nft.sass"
import "../assets/animations.css";
import closeIcon from "../images/close.png"
import * as menuStyles from "../assets/menu.module.scss";
import { AppContext } from "../App.js";

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}


const Nft = ({color,nftMetadata,tokenId}) => {
  const {accountAddress, contractState, reload, setReload, totalSupply} = useContext(AppContext);
  
  const [txQueue, setTxQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const _tokenID = Number(tokenId)
  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));
  
  let history = useHistory();

  return (
    <div className="none-minted-token-container">

      <div className={`nft ${menuStyles.menu} ${ NftIsClicked ? `${menuStyles.open}` : ""}`}>
        
        <div className="close-icon-wrapper">
          <img onClick={nftExpanded} className="close-icon" width="40px" src={closeIcon}/>
        </div>

        {NftIsClicked ?(
          <div className="modal-container">

            <div className="nft-image-focus">
              <img className="artwork" width="60%" src={nftMetadata.image} />
            </div>
            
            <div className="token-options">
              <h2 className="token-name">{nftMetadata.name}</h2>
              <a href={`https://testnets.opensea.io/assets/0x66c77d082cfdf7ededb8330a335257b2f558f481/${_tokenID}`}>OpenSea</a>
            </div>

          </div>
        ): ""}

      </div>
      <img onClick={nftExpanded} className="artwork" width="60%" src={nftMetadata.image} alt="Token Image"/>
    </div>
    
  )
};

export default Nft;
