import React, {useState}  from "react"
import "../assets/faq.sass"
import "../assets/wave.scss"

const Faq = () =>{

    const [dropDown, setDropDown] = useState({height:"auto"});  

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(previousValue => !previousValue);

    const dropdownOptions = modal ? 'show_recepie' : '';
    return(
        <div className="faq-container">
        
            <div className="wave">

            </div>

            <div className="faq-header">
                <h1>FAQ</h1>
            </div>
    
            <div className="faq-container">
                <div className="faq">
                    <div className="faq-question">
                        <h2>How do I get one?</h2>
                    </div>
                    <div className="faq-answer">
                    <ul>
                        <li>
                            Download and install a Chrome browser plugin called <a href="https://metamask.io/">MetaMask</a>. This will allow websites (that you authorize) access to your Ethereum account.
                        </li>
                        <li>
                            If on mobile, try using the <a href="https://www.coinbase.com/wallet">Coinbase Wallet browser</a>
                        </li>
                        <li>
                            Once you have the plugin installed, or are using the Coinbase web3 brower this website will recognize it and then display a buy(Mint) button along with your inventory.
                        </li>
                    </ul>
                    </div>
                </div>
    
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What's an NFT?</h2>
                    </div>
                    <div className="faq-answer">
                    <ul>
                        <li>
                            Non-fungible token or NFT is a unique token that points to WHATEVER YOU WANT, usually a url of a picture | video or a concha.
                        </li>

                        <li>
                            NFT's usally have one owner and can be verified on the ledger.
                        </li>
                            
                        <li>
                            A Non-fungible token cannot be dubplicated and is stored in the blockchain.
                        </li>
                    </ul>
                    </div>
                </div>
    
                <div className="faq">
                    <div className="faq-question">
                        <h2>How to get a crypto wallet</h2>
                    </div>
                    <div className="faq-answer">
                    <ul>
                        <li>
                            Download and install <a href="https://metamask.io/">MetaMask</a> if you're on chrome or a suitable alternative.
                        </li>
                        <li>
                            If on mobile, try using the <a href="https://www.coinbase.com/wallet">Coinbase Wallet</a>
                        </li>
                    </ul>
                    </div>
                </div>
            
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What's the blockchain?</h2>
                    </div>
                    <div className="faq-answer">
                    <ul>
                        <li>
                            The blockchain is a distributed database (Used to store data).
                        </li>
                        <li>
                            The data stored on a blockchain are cryptocurrency transactions.
                        </li>
                        <li>
                            Blockchains store data (transactions) in chronological groups, known as blocks, instead of folders and tables like normal databases. 
                        </li>
                        <li>
                            Bitcoin | Ethereum & Solana's blockchain is open and accessible to anyone, unlike a centralized database run by a company.
                        </li>
                        <li>
                            Unlike databases where information can be added, removed or edited, blockchains can only be added to.
                        </li>
                    </ul>
                    </div>
                </div>

                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What are conchas?</h2>
                    </div>
                    <div className="faq-answer">
                    <p>
                        Conchas get their name from their round shape and striped seashell(concha in spanish) like appearance. A concha consists of two parts, a sweetened bread roll, and a crunchy topping.
                    </p>
                    <p>
                        Conchas are a Mexican style sweet bread that was orignially inspiration by Brioche, but somewhere along the way we decided to make it fun and added colorful sugar on top and now rest is history.
                        You can find conchas all over North America at any Mexican bakery (Probably just in Mexico and the U.S 😬)
                    </p>
                    </div>
                </div>
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>How to make conchas</h2>
                    </div>
                    <div className="faq-answer">
                    <p>
                        Easy, all you need it flour | butter | milk | eggs and baking powder
                    </p>
                    <a className="recipe-link" href="https://www.mexicoinmykitchen.com/concha-recipe/">
                        Concha recipe
                    </a>
                    <a className="recipe-link" href="https://www.youtube.com/watch?v=cCX3fqfEfZg">
                        Concha video recipe (Spanish)
                    </a>
                    </div>
                </div>
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>Who are we?</h2>
                    </div>
                    <div className="faq-answer">
                    <p>
                        We're a small team of developers trying to build cool things on the internet.
                    </p>
                    <p>
                        We believe in web3 and see a future where everyone utilizes it. We want to be part of building that future.
                    </p>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default Faq
