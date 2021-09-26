import React, { useState, useEffect } from "react";
import { newContextComponents, AccountData } from "@drizzle/react-components";
import Tokens from './tokens';
import Nft from './nft';
import "../assets/nft.sass";
import "../assets/animations.css";
import "../assets/mintable.sass";

const { ContractData } = newContextComponents;

const SortShowcase = ({imageColorArray,drizzle,drizzleState,tokenSupply}) =>{

  const [loading, setLoading] = useState(false);
  const [showcase, setShowcase] = useState([]);
  const [mintedColors, setMintedColors] = useState();
  const [nftMetadata, setNftMetadata] = useState();
  
  let _imageColorArray = imageColorArray
  let _tokenSupply = tokenSupply
  
  let mintedColorsArray = []
  let URL = null
  let tokenId = null

  const emptyArray = [];
  const arrayLength = _tokenSupply;
  for(let i=0;i<arrayLength;i++){ emptyArray.push('') }

  const checkForDuplicates = (arry1,arry2) =>{
    
    let array1 = arry1;
    let array2 = arry2;
    
    return  array1.filter(function(n) { return array2.indexOf(n) == -1;});
  }

  const GetURL = async () => {    
    try {
  
      for(let x=0; x<_tokenSupply;x++){

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

      let sortedArray = await checkForDuplicates(_imageColorArray,mintedColorsArray);

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
      { showcase.length > 0 ? (
        <div className="landing-display">
          {sortedColorList}
        </div>
      ):(
        <div>
          {emptyArray.map((_,index) =>
            <div className="gallery-loader">           
              <div key={index} className="lds-hourglass">
              </div>
            </div>
            )
          }
        </div>
      )
      }
    </div>
  )

}

const MintableShowcase = ({ drizzle, drizzleState }) => {
  
  const imageColorArray = ["blue","brown","dark-brown","green","light-brown","orange","pink","red","turquoise","white","yellow","purple","dark","mexican-colors","turquoise-purple-orange","turquoise-purple","chocolate-vanilla"];


  return (
    <div className="mintable-container showcase">
      <h2>Mintable</h2>
      <p className="other-font">Ready for the overn</p>
      <ContractData
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract="CryptoConchasRinkeby"
        method="totalSupply"
        render={(balanceOf) => {
          const emptyArray = [];
          const arrayLength = Number(balanceOf);
          for(let i=0;i<arrayLength;i++){ emptyArray.push('') }
          if(emptyArray.length === 0) {
            return (
              <div className="no-tokens">
                {imageColorArray.map((color,index) => (
                  <Nft drizzle={drizzle} drizzleState={drizzleState} color={color} />
                ))
                }
              </div>
            )
          }return (
            <SortShowcase tokenSupply={arrayLength} imageColorArray={imageColorArray} drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
        />
    </div>
  )

};

export default MintableShowcase;
