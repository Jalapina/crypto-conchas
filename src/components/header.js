import React from "react";
import "../assets/header.sass"
import { Link } from "react-router-dom";

const Header = (contract) => {

    return (
        <header>
            <Link style={{display:'block'}} to="/"><h1 className="dApp-title">Crypto Conchas</h1></Link>
            <Link to="/mintable"><h1 className="other-font">Mint A Concha</h1></Link>
            <Link to="/about"><h1 className="other-font">What?</h1></Link>
        </header>
  );
};

export default Header;
