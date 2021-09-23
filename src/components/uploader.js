import React, { useState, useRef } from "react";
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import ImageUploader from "react-images-upload";
import { newContextComponents, AccountData } from "@drizzle/react-components";

const { ContractData } = newContextComponents;

const Uploader = ({drizzle,drizzleState}) => {
  
  const imageUploaderRef = useRef(null);
  const [artwork, setArtwork] = useState([]);
  const [imageCount, setBatchImageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txQueue, setTxQueue] = useState([]);
  const [nftStuff, setNftStuff] = useState();
  
  const initialNftState = {name: "", category: ""}
  
  const [nftData, setNftData] = useState(initialNftState);
  const [tokenId, setTokenId] = useState();

  const isEnabled = nftData.name.length > 0 && nftData.category.length > 1;
  
  const onDrop = (picture) => { //Image is being uploaded
    
        console.log("pictures: ",picture);
    
        if(picture.length>1 && imageCount == 1){
          return setArtwork(picture);
        }else if(picture.length>0){
          setArtwork(artwork => [...artwork, picture[imageCount-1]]);
          setBatchImageCount(imageCount+1);
          return console.log(artwork,imageCount);
        }
        setArtwork([picture[0]]);
        return console.log(artwork);
        
  };

  const clearPreview = () => {
    setArtwork([]);
    imageUploaderRef.current.clearPictures();
  };

  const handleButtonClick = async (newTokenId) => {

    setLoading(true)
    
    try {
      const date = new Date();
      const timestamp = date.getTime();

      const { hash } = await fleekStorage.upload({
        apiKey: "ezmuRXUXulan6Kj0PXU4LA==",
        apiSecret: "W7gKpPrEtZGS9WGhZyYa130VXtJZ9CROCguNoxHLq2A=",
        key: `nft/${newTokenId}-${timestamp}`,
        data: artwork,
      });

      const url = {
        name: nftData.name,
        category: nftData.category.toLowerCase(),
        description: nftData.category,
        image_url: "https://ipfs.fleek.co/ipfs/"+hash,
        image_hash: hash
      }

      const { publicUrl } = await fleekStorage.upload({
        apiKey: "ezmuRXUXulan6Kj0PXU4LA==",
        apiSecret: "W7gKpPrEtZGS9WGhZyYa130VXtJZ9CROCguNoxHLq2A=",
        key: `nft/${newTokenId}-${timestamp}`,
        data: JSON.stringify(url),
      });
      
      setLoading(false);
      clearPreview();
      createNFTTransaction(hash, publicUrl);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const createNFTTransaction = async (hash, publicUrl) => {
    
        const tokenURI = `https://ipfs.io/ipfs/${hash}`;
    
        const removeFromQueue = () => {
          const newTxQueue = txQueue.filter((uri) => uri !== tokenURI);
          setTxQueue(newTxQueue);
        };
    
        try {
          setTxQueue([...txQueue, tokenURI]);
    
          await drizzle.contracts.CryptoConchasRinkeby.methods.mint(hash,publicUrl).send({from: drizzleState.accounts[0]});
    
          setNftData(initialNftState);
        } catch (e) {
          console.error(e);
          setNftData(initialNftState);      
          removeFromQueue(tokenURI);
        }
  };

  return(
      <Jumbotron>
      <div className="add-nft-title">
        <p>This app runs on the Rinkeby Testnet</p>
      </div>
      <div className="steps">
        <span>Upload a concha</span>
      </div>
      <div className="uploader">
        <ImageUploader
          withIcon={true}
          buttonText="Choose image"
          onChange={onDrop}
          imgExtension={[".jpg",".mov",".jpeg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={false}
          withPreview
          ref={iu => imageUploaderRef.current = iu}
        />
      </div>
  
      <div className="steps">
        <span>Create an NFT!</span>
        <div>
          Connect to the Rinkeby Network on Metamask
        </div>
      </div>
  
      <div className="nft-form-container">
        <form>
          <input disabled={!artwork} type="text" placeholder="Your NFT name" name="name" value={nftData.name} required onChange={e => setNftData({...nftData,name:e.currentTarget.value})} />
          <input disabled={!artwork} type="text" placeholder="NFT category" name="category" value={nftData.category} required onChange={e => setNftData({...nftData,category:e.currentTarget.value})} />
        </form>
      </div>
  
      <ContractData
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract="CryptoConchasRinkeby"
        method="totalSupply"
        render={(supply) => (
          <div>
            <Button
              disabled={!artwork || loading || !isEnabled}
              onClick={() => handleButtonClick(supply)}
              className="button"
            >
            {loading
              ? <Spinner animation="border" variant="light" size="sm" />
              : <span>Create NFT</span>
            }
          </Button>
        </div>
        )}
      />
  
      <div className="steps">
        Your artwork will appear in your collection once the transaction is accepted
      </div>
  
      <div>
        {txQueue.length === 1 && (
          <div>
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <div>Minting a new token...</div>
          </div>
        )}
        {txQueue.length > 1 && (
          <div>
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <div>Minting {txQueue.length} new tokens...</div>
          </div>
        )}
      </div>
      {
        txQueue.length > 0 && (
          <div>
            <Spinner animation="border" />
          </div>
        )
      }
  
    </Jumbotron>
  )
}

export default Uploader

