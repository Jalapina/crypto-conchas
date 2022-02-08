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

  // const createNFTTransaction = async (hash,publicUrl) => {
        
  //     const tokenURI = publicUrl;
    
  //     const removeFromQueue = () => {
  //       const newTxQueue = txQueue.filter((uri) => uri !== tokenURI);
  //       setTxQueue(newTxQueue);
  //     };
    
  //     try {
  //       setTxQueue([...txQueue, tokenURI]);

  //       await contractState.methods.mint(hash,publicUrl).send({from: accountAddress});

  //     }catch(e) {
  //         console.error(e);
  //         removeFromQueue(tokenURI);
  //         setLoading(false);
  //         return history.push("/mintable");
  //       }
  // };

  // const handleButtonClick = async (newTokenId) => {

  //   try {
  //     const date = new Date();
  //     const timestamp = date.getTime();
      
  //     const { hash } = await fleekStorage.upload({
  //       apiKey: "5p1Nxgb8eIEOEYjwduM4Fg==",
  //       apiSecret: "HC4pKXrmEITQwS0bC9fXwrbiPnwEhfUcXoao7JoHCu8=",
  //       key: `nft/${newTokenId}-${timestamp}`,
  //       data: "https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/"+color+"-concha.png",
  //     });

  //     const url = {
  //       name: color,
  //       color: color,
  //       description: color+" Concha.",
  //       image_url: "https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/"+color+"-concha.png",
  //       hash: hash
  //     }

  //     const { publicUrl } = await fleekStorage.upload({
  //       apiKey: "5p1Nxgb8eIEOEYjwduM4Fg==",
  //       apiSecret: "HC4pKXrmEITQwS0bC9fXwrbiPnwEhfUcXoao7JoHCu8=",
  //       key: `nft/${newTokenId}-${timestamp}`,
  //       data: JSON.stringify(url),
  //     });
      
  //     setLoading(false);
  //     await createNFTTransaction(hash,publicUrl);
  //     return history.push("/");
  //   } catch (e) {
  //     console.error(e);
  //     setLoading(false);
  //     return history.push("/mintable");
  //   }
  // };

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
              <a href={`https://testnets.opensea.io/assets/0x0840813925b376532171575bd5e122c860829c1f/${_tokenID}`}>OpenSea</a>
            </div>

          </div>
        ): ""}

      </div>
      <img onClick={nftExpanded} className="artwork" width="60%" src={nftMetadata.image} alt="Token Image"/>
    </div>
    
  )
};

export default Nft;
