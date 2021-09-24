import React from "react";
import {dizzleReactHooks} from "@drizzle/react-plugin";

const {useDizzleState} = dizzleReactHooks

const About = ({drizzle}) =>{
    
    return(
        <div className="subtitle">
        <p className="other-font">Smart Contract:</p>
        <a
          href={`https://Rinkeby.etherscan.io/address/${drizzle.contractList[0].address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>&nbsp;{sliptAddressText(drizzle.contractList[0].address)}</p>
        </a>
      </div>
    )
}

export default About;
