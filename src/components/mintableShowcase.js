import React, { useState, useEffect } from "react";
import { newContextComponents, AccountData } from "@drizzle/react-components";
import Tokens from './tokens';
import "../assets/nft.sass";
import Nft from './nft';

const { ContractData } = newContextComponents;

const SortShowcase = ({drizzle,drizzleState}) =>{

  const [loading, setLoading] = useState(false);
  const [showcase, setShowcase] = useState([]);
  const [mintedColors, setMintedColors] = useState();
  const [nftMetadata, setNftMetadata] = useState();

  const imageColorArray = ["blue","brown","dark-brown","green","light-brown","orange","pink","red","turquoise","white","yellow","purple","dark","mexican-colors","turquoise-purple-orange","turquoise-purple","chocolate-vanilla"];  
  let mintedColorsArray = []
  let tokenSupply = null
  let URL = null
  let tokenId = null

  const checkForDuplicates = (arry1,arry2) =>{
    let array1 = arry1;
    let array2 = arry2;
    
    return  array1.filter(function(n) { return array2.indexOf(n) == -1;});

  }

  const GetURL = async () => {    
    try {
  
      tokenSupply = await drizzle.contracts.CryptoConchasRinkeby.methods.totalSupply().call();
  
      for(let x=0; x<tokenSupply;x++){

        tokenId = await drizzle.contracts.CryptoConchasRinkeby.methods.tokenByIndex(x).call();
        URL = await drizzle.contracts.CryptoConchasRinkeby.methods.tokenURI(tokenId).call();

        await fetch(URL , {
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
            return mintedColorsArray.push(data.name);
          })
          .catch(err => {
            return console.log(err);
        });
        
      }
      let sortedArray = await checkForDuplicates(imageColorArray,mintedColorsArray);

      setShowcase(sortedArray);

    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    GetURL()
  }, [drizzle]);

  const sortedColorList = showcase.map((color,index) => 
      <Nft color={color} drizzle={drizzle} drizzleState={drizzleState}/>
  );
    

  return(
    <div className="mintable">
      { showcase ? (
        <div className="landing-display">
          {sortedColorList}
        </div>
      ):"...Loading"}
    </div>
  )

}

const MintableShowcase = ({ drizzle, drizzleState }) => {
  
  return (
    <div className="mintable-container showcase">
      <h2>Mintable</h2>
      <SortShowcase drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  )

};

export default MintableShowcase;
