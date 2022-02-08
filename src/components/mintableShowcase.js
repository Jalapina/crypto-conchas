import React, { useState, useEffect, useContext } from "react";
import * as Utils from 'web3-utils';
import Tokens from './tokens';
import Nft from './nft';
import "../assets/nft.sass";
import "../assets/animations.css";
import "../assets/mintable.sass";
import { AppContext } from "../App.js";

const SortShowcase = ({imageColorArray,tokenSupply}) =>{
  
  const {accountAddress, contractState, reload, setReload, totalSupply} = useContext(AppContext);
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

        tokenId = await contractState.methods.tokenByIndex(x).call();
        URL = await contractState.methods.tokenURI(tokenId).call();

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
  }, [accountAddress]);

  const sortedColorList = showcase.map((color,index) => 
      <Nft color={color} />
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

const MintableShowcase = () => {
  const {accountAddress, contractState, reload, setReload, totalSupply} = useContext(AppContext);
  
  const createNFTTransaction = async () => {
    // setLoading(true)
    try {
        
        // const transaction = await drizzleState.mint(drizzle.Address, {
        //     value: '45000000000000000',
        // });


        // const transaction =  await drizzle.contracts.CryptoConchasRinkeby.methods.mint(drizzleState.accounts[0]).send({from: drizzleState.accounts[0],value: Utils.toWei('0.25')});
         const transaction =  await contractState.methods.mint(accountAddress).send();
        

        await transaction.wait().then(result =>{
            // setReload(true)
            console.log(result);
        })

        // setLoading(false);
    } catch (e) {
        // setLoading(false);
        console.error(e);
    }

  };

  return (
    <div className="mintable-container showcase">
      <h2>Mintable</h2>
      <p className="other-font">Ready for the oven</p>
      <div class="mint-button-wrapper">
        <button onClick={() => createNFTTransaction()} >
          MINT
        </button>
      </div>
    </div>
  )

};

export default MintableShowcase;
