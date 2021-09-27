import React, {useState} from 'react';
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import { useHistory } from "react-router-dom";
import * as menuStyles from "../assets/menu.module.scss";
import "../assets/nft.sass"
import "../assets/animations.css";

import closeIcon from "../images/close.png"

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const { ContractData } = newContextComponents;

const Nft = ({color,drizzle,drizzleState}) => {

  const [txQueue, setTxQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));
  
  let history = useHistory();

  const createNFTTransaction = async (hash,publicUrl) => {
        
      const tokenURI = publicUrl;
    
      const removeFromQueue = () => {
        const newTxQueue = txQueue.filter((uri) => uri !== tokenURI);
        setTxQueue(newTxQueue);
      };
    
      try {
        setTxQueue([...txQueue, tokenURI]);

        await drizzle.contracts.CryptoConchasRinkeby.methods.mint(hash,publicUrl).send({from: drizzleState.accounts[0]});

      }catch(e) {
          console.error(e);
          removeFromQueue(tokenURI);
          setLoading(false);
          return history.push("/mintable");
        }
  };

  const handleButtonClick = async (newTokenId) => {

    try {
      const date = new Date();
      const timestamp = date.getTime();
      
      const { hash } = await fleekStorage.upload({
        apiKey: "5p1Nxgb8eIEOEYjwduM4Fg==",
        apiSecret: "HC4pKXrmEITQwS0bC9fXwrbiPnwEhfUcXoao7JoHCu8=",
        key: `nft/${newTokenId}-${timestamp}`,
        data: "https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/"+color+"-concha.png",
      });

      const url = {
        name: color,
        color: color,
        description: color+" Concha.",
        image_url: "https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/"+color+"-concha.png",
        hash: hash
      }

      const { publicUrl } = await fleekStorage.upload({
        apiKey: "ezmuRXUXulan6Kj0PXU4LA==",
        apiSecret: "W7gKpPrEtZGS9WGhZyYa130VXtJZ9CROCguNoxHLq2A=",
        key: `nft/${newTokenId}-${timestamp}`,
        data: JSON.stringify(url),
      });
      
      setLoading(false);
      await createNFTTransaction(hash,publicUrl);
      return history.push("/");
    } catch (e) {
      console.error(e);
      setLoading(false);
      return history.push("/mintable");
    }
  };

  return (
    <div className="none-minted-token-container">

      <div className={`nft ${menuStyles.menu} ${ NftIsClicked ? `${menuStyles.open}` : ""}`}>
        <div className="close-icon-wrapper">
          <img onClick={nftExpanded} className="close-icon" width="40px" src={closeIcon}/>
        </div>
        {NftIsClicked ?(
          <div className="modal-container">

            <div className="nft-image-focus">
              <img className="artwork" width="90%" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${color}-concha.png`} />
            </div>
            
            <div className="token-options">
              <h2>{color} Concha.</h2>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CryptoConchasRinkeby"
                method="totalSupply"
                render={(supply) => (
                  <div className="mint-button-container">
                    {loading?(
                      <Button
                        onClick={() =>{  setLoading(true); handleButtonClick(supply);}}
                        className="button"
                      >
                      <span>MINT</span>
                    </Button>
                    ):
                    <div class="loading-minting-container">
                      <div class="lds-hourglass">                    
                      </div>
                      <p>Minting your Conchas</p>                      
                      <p>One sec</p>                      
                    </div>
                    }

                </div>
                )}
              />
            </div>

          </div>
        ): ""}

      </div>
      <img onClick={nftExpanded} className="artwork" width="95%" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${color}-concha.png`} alt="Token Image"/>
    </div>
  )
};

export default Nft;
