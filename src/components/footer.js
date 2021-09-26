import React from 'react'
import "../assets/footer.sass"

const Footer = () => {
    return (
        <footer className="footer">
            <p>Powered by Conchas y Cafe . 2021 </p>
            <a style={{color:'#000', width:"90%",margin:"7px"}} href="https://rinkeby.etherscan.io/address/0x3473146b6fFEB474f3B6Ea90D0bA6AD30E909f9E">
                <p>0x3473146b6fFEB474f3B6Ea90D0bA6AD30E909f9E</p>
            </a>
        </footer>
    )
}

export default Footer