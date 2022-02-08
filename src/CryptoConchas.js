import React, { useState, useRef, useEffect, useContext } from "react";
import "./assets/index.sass"
import "./assets/loader.css"
import Inventory from "./components/inventory.js";
import Nft from './components/nft.js'
import Uploader from './components/uploader.js'
import Minted from './components/minted.js'

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const DisplayImage = (NftData) => {
  
  const [nftMetadata, setNftMetadata] = useState();
  const [owner, setOwner] = useState();

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
    <div>
{/* 
      <ContractData
        drizzle={NftData.drizzle}
        drizzleState={NftData.drizzleState}
        contract="CryptoConchasRinkeby"
        method="CID"
        methodArgs={[NftData.tokenId]}
        render={(cid) =>(
          <Nft cid={cid} address={NftData.address} owner={owner} metadata={nftMetadata} tokenId={NftData.tokenId} />
        )}
      /> */}

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

  const isEnabled = nftData.name.length > 0 && nftData.category.length > 1;

  return (
    <div className="App">
      
      {/* <Inventory drizzle={drizzle} drizzleState={drizzleState} /> */}
      {/* <Minted drizzle={drizzle} drizzleState={drizzleState} /> */}

      {/* <Uploader drizzle={drizzle} drizzleState={drizzleState} /> */}

    </div>
    
  );

};

export default CryptoConchas
