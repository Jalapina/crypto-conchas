import React, { useState, useRef, useEffect, useContext } from "react";
import { Spinner, Button, Jumbotron } from 'react-bootstrap';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { newContextComponents, AccountData } from "@drizzle/react-components";
import ImageUploader from "react-images-upload";
import "./assets/index.sass"
import "./assets/loader.css"
import { AppContext } from "./components/layout.js";
import Nft from './components/nft.js'

const { ContractData } = newContextComponents;

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const DisplayImage = (NftData) => {
  
  const {state, dispatch} = useContext(AppContext);
  
  const changeIndexValue = (newValue) => {
    dispatch({ type: 'UPDATE_INDEX', data: newValue});
  };

  const [nftMetadata, setNftMetadata] = useState()
  const [owner, setOwner] = useState()

  const sliptAddressText = (address) =>{
    return address.split("").splice(-5);
  }

  const isUrlValid = (url) =>{
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
  } 


  const GetURI = async (data) => {
    
    const _owner = await data.drizzle.contracts.CryptoConchasRinkeby.methods.ownerOf(data.tokenId).call()
    
    setOwner(_owner);

    if(data === "undefined") return [];
    
    const nftURI = await data.drizzle.contracts.CryptoConchasRinkeby.methods.tokenURI(data.tokenId).call()
    
    if(!isUrlValid(nftURI)) return console.log("No URI: ", nftURI);
  
    await fetch(nftURI , {
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
        console.log(data)
        return setNftMetadata(data || []);
      })
      .catch(err => {
        return console.log(err);
    });
    
  };

  const callUri = async() =>{
    const data = await GetURI(NftData)
    setNftMetadata(data)
  }

  useEffect(() => {
  }, [nftMetadata]);

  useEffect(() => {
    GetURI(NftData)
  }, [NftData.tokenId]);

  return (
    <div className="token-container">

      <ContractData
        drizzle={NftData.drizzle}
        drizzleState={NftData.drizzleState}
        contract="CryptoConchasRinkeby"
        method="CID"
        methodArgs={[NftData.tokenId]}
        render={(cid) =>(
          <div className="token-container">
            <Nft cid={cid} address={NftData.address} owner={owner} metadata={nftMetadata} tokenId={NftData.tokenId} />
          </div>
        )}
      />

    </div>
  );

}

const CryptoConchas = ({ drizzle, drizzleState }) => { 
  
  const imageUploaderRef = useRef(null);
  const [artwork, setArtwork] = useState([]);
  const [imageCount, setBatchImageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txQueue, setTxQueue] = useState([]);
  const [nftStuff, setNftStuff] = useState();
  
  const initialNftState = {name: "", category: ""}
  
  const [nftData, setNftData] = useState(initialNftState);
  const [tokenId, setTokenId] = useState();


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

  const handleBatchMint = async (newTokenId) => {
    console.log(artwork)
    setLoading(true);
    let tokenId = parseInt(newTokenId);

    try {
      
      for(let i=0; i<artwork.length;i++){
        
        try {
          
          const date = new Date();
          const timestamp = date.getTime();
          tokenId += 1
          
          const { hash } = await fleekStorage.upload({
            apiKey: "ezmuRXUXulan6Kj0PXU4LA==",
            apiSecret: "W7gKpPrEtZGS9WGhZyYa130VXtJZ9CROCguNoxHLq2A=",
            key: `nft/${tokenId}-${timestamp}`,
            data: artwork[i],
          });
    
          const url = {
            name: nftData.name,
            category: nftData.category.toLowerCase(),
            description: nftData.category,
            image_url: "https://ipfs.fleek.co/ipfs/"+hash,
            external_url: "https://CryptoConchas.io/",
            image_hash: hash
          }
    
          const { publicUrl } = await fleekStorage.upload({
            apiKey: "ezmuRXUXulan6Kj0PXU4LA==",
            apiSecret: "W7gKpPrEtZGS9WGhZyYa130VXtJZ9CROCguNoxHLq2A=",
            key: `nft/${tokenId}-${timestamp}`,
            data: JSON.stringify(url),
          });

          console.log("Token ID: "+tokenId+" Sending hash: "+hash+" and metadata: "+publicUrl);

          await createNFTTransaction(hash, publicUrl);
        } catch (e) {
          setLoading(false);
          return console.error(e);
        }


      }

      setTxQueue([]);
      clearPreview();
      setLoading(false);
    }catch (e) {
      setLoading(false);
      console.error(e);
    }

    setBatchImageCount(1)    
    setArtwork([])
    
  }

  const isEnabled = nftData.name.length > 0 && nftData.category.length > 1;

  return (
    <div className="App">
      <div className="subtitle">
        {"ERC-721 Address: "}
        <a
          href={`https://Rinkeby.etherscan.io/address/${drizzle.contractList[0].address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {drizzle.contractList[0].address}
          </a>
      </div>

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
                onClick={() => handleBatchMint(supply)}
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

      <div className="collection-title"><h1>Collection</h1></div>

      <div className="colleciton-subtitle">These fine pieces of art belong to: 
        <a href={`https://rinkeby.etherscan.io/address/${drizzleState.accounts[0]}`} target="_blank" rel="noopener noreferrer">
          {drizzleState.accounts[0].address}
        </a>
      </div>
    
     <ContractData
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract="CryptoConchasRinkeby"
        method="balanceOf"
        methodArgs={[drizzleState.accounts[0]]}
        render={(balanceOf) => {
          const emptyArray = [];
          const arrayLength = Number(balanceOf);
          for(let i=0;i<arrayLength;i++){ emptyArray.push('') }
          if(emptyArray.length === 0) {
            return (
              <Jumbotron className="no-artwork">
                You have no artwork in your collection!
              </Jumbotron>
            )
          }
          return (
              <div className="collection-container">
                  {emptyArray.map(( _, index) => {
                    return (
                      <ContractData
                        key={index}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="CryptoConchasRinkeby"
                        method="tokenOfOwnerByIndex"
                        methodArgs={[drizzleState.accounts[0], arrayLength - 1 - index]}
                        render={(tokenId) => (
                            <ContractData
                              key={index}
                              drizzle={drizzle}
                              drizzleState={drizzleState}
                              contract="CryptoConchasRinkeby"
                              method="tokenURI"
                              methodArgs={[tokenId]}
                              render={(uri) =>  (
                                <div>
                                  <DisplayImage address={drizzle.contractList[0].address} tokenId={tokenId} drizzle={drizzle} drizzleState={drizzleState} />
                                </div>
                              )}
                            />
                        )}
                      />

                    )}
                  )}
              </div>
            );
        }}
      />

    </div>
    
  );

};

export default CryptoConchas
