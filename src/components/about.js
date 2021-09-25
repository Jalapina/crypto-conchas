import React from "react";

const sliptAddressText = (address) =>{
  return address.split("").splice(-5);
}

const About = ({drizzle}) =>{
    
    return(
        <div className="subtitle">
        <h1 className="other-font">About Crypto Conchas.</h1>
        <a
          href={`https://Rinkeby.etherscan.io/address/${drizzle.contractList[0].address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>&nbsp;{sliptAddressText(drizzle.contractList[0].address)}</p>
        </a>
        <p>I like conchas</p>
      </div>
    )
}

export default About;
