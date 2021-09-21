
import React, {useState} from 'react';
import * as menuStyles from "../assets/menu.module.scss";
import "../assets/nft.sass"
const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const Nft = (data) => {
  const [imageSource, setimageSource] = useState(data);

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));

  return (
    <div onClick={nftExpanded} className="nft-container">
    <div className={`nft ${menuStyles.menu} ${
      NftIsClicked ? `${menuStyles.open}` : ""
    }`}>
      {NftIsClicked ?(
          <div>
            <h2>{data.color}</h2>
          </div>
        ): ""}
        <button className="buy-button">
          Mint
        </button>
        <img className="artwork" width="450px" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${data.color}-concha.png`} />
        
      </div>
      <img className="artwork" width="250px" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${data.color}-concha.png`} />
    </div>
  )
};

export default Nft;