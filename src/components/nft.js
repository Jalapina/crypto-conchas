import React, {useState} from 'react';
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import * as menuStyles from "../assets/menu.module.scss";
import "../assets/nft.sass"

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const { ContractData } = newContextComponents;

const Nft = ({color,drizzle,drizzleState}) => {

  const [artwork, setArtwork] = useState([]);
  const [imageSource, setimageSource] = useState();
  const [txQueue, setTxQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const initialNftState = {name: "", category: ""}
  const [nftData, setNftData] = useState(initialNftState);

  const[NftIsClicked, setNftIsClicked] = useState(false)
  const nftExpanded = React.useCallback(() => setNftIsClicked(!NftIsClicked));
  
  const clearPreview = () => {
    setArtwork([]);
  };

  const createNFTTransaction = async (hash,publicUrl) => {
        
      const tokenURI = publicUrl;
    
      const removeFromQueue = () => {
        const newTxQueue = txQueue.filter((uri) => uri !== tokenURI);
        setTxQueue(newTxQueue);
      };
    
      try {
        setTxQueue([...txQueue, tokenURI]);

        await drizzle.contracts.CryptoConchasRinkeby.methods.mint(hash,publicUrl).send({from: drizzleState.accounts[0]});

        setNftData(initialNftState);
      }catch(e) {
          console.error(e);
          setNftData(initialNftState);      
          removeFromQueue(tokenURI);
        }
      };


  const handleButtonClick = async (newTokenId) => {

    setLoading(true)
    
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
        description: color,
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
      clearPreview();
      createNFTTransaction(hash,publicUrl);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const isEnabled = nftData.name.length > 0 && nftData.category.length > 1;

  return (
    <div onClick={nftExpanded} className="nft-container">

      <div className={`nft ${menuStyles.menu} ${ NftIsClicked ? `${menuStyles.open}` : ""}`}>
        {NftIsClicked ?(
          <div className="modal-container">

            <div className="nft-image-focus">
              <img className="artwork" width="90%" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${color}-concha.png`} />
            </div>
            
            <div className="token-options">
              <h2>{color}</h2>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CryptoConchasRinkeby"
                method="totalSupply"
                render={(supply) => (
                  <div>
                    <Button
                      onClick={() => handleButtonClick(supply)}
                      className="button"
                    >
                     <span>MINT</span>
                  </Button>
                </div>
                )}
              />
            </div>

          </div>
        ): ""}

      </div>
      <div className="landing-display">
        <img className="artwork" width="95%" src={`https://storageapi.fleek.co/jalapina-team-bucket/nft/conchas/${color}-concha.png`} />
      </div>
    </div>
  )
};

export default Nft;