import React, {useEffect,useState, useContext} from "react";
import "../assets/header.sass"
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { injected } from "../components/connectors";
import CryptoConchasRinkeby from "../contracts/CryptoConchasRinkeby.json";
import { AppContext } from "../App.js";

const Header = () => {

    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const {accountAddress, setAccountAddress,contractState, setContractState, setTotalSupply} = useContext(AppContext);
    
    const [address, setAddress] = useState();
  
    let network = undefined;
    let cryptoConchasRinkeby = undefined;
    
    const loadBlockchainData = async() => {
      try {
        await activate(injected);
        if(active){
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          network = await provider.getNetwork();
          cryptoConchasRinkeby = new ethers.Contract("0x66c77D082cfDf7EdEDb8330a335257b2f558F481", CryptoConchasRinkeby.abi, provider.getSigner());
          const totalSupply = await cryptoConchasRinkeby.totalSupply()
          setTotalSupply(Number(totalSupply))
          setContractState(cryptoConchasRinkeby);
        }
      } catch (ex) {
        console.log(ex);
      }
      
    }
    
    setAccountAddress(account);
    
    useEffect(()=>{
      loadBlockchainData();
    },[])
  
  
    const sliptAddressText = (address) =>{
      return address.split("").splice(-5);
    }

    return (
        <header>
            <Link style={{display:'block'}} to="/"><h1 className="dApp-title">Crypto Conchas</h1></Link>
            {(() => {
              if(account != undefined){
                return(
                  <Link to="/inventory">
                    <h1 className="other-font">{sliptAddressText(account)}</h1>
                  </Link>
                )
              }else{
                return(         
                    <div className="connect-wallet-container">
                        <h1 onClick={loadBlockchainData} className="other-font">Connect Wallet</h1>
                    </div>       
                  )
              }  
            })()}
            <Link to="/about"><h1 className="other-font">What?</h1></Link>
            
        </header>
    );
};

export default Header;
