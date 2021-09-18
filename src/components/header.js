import React from "react";
import "../assets/header.sass"

const Header = (contract) => {

    return (
        <header>
            <h1 className="dApp-title">{contract.contractName}</h1>
        </header>
  );
};

export default Header;
