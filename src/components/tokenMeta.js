
import React, {useState} from 'react';
import "../index.css"
import * as menuStyles from "../assets/menu.module.scss";

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const TokenMeta = (data) => {
  
  const [imageSource, setimageSource] = useState(data);

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));
  
  return (
    <div className="nft-meta-container">
      <div className={`nft`}>
        {NftIsClicked ?(
            <>
                <h2>{data.metadata.name} #{data.tokenId}</h2>
                <p>{data.metadata.description ? data.metadata.description : data.metadata.category}</p>
                <p>Owner: <a className="owner-address" href={`https://Rinkeby.etherscan.io/address/${data.owner}`}>{sliptAddressText(data.owner)}</a></p>
                <a href={`https://testnets.opensea.io/assets/`+data.address+`/`+data.tokenId}>OpenSea</a>
                <button className="buy-button">Buy</button>
                <img className="artwork heartbeat" width="85%" src={imageSource.metadata.image_url ? imageSource.metadata.image_url : 'Loading...'} />
            </>
        ): ""}
        </div>
    </div>
  )
};

export default TokenMeta;
