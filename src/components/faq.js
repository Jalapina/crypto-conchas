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
                {/* <div class="ocean"> */}
                {/* <div class="wave"></div> */}
                {/* <div class="wave"></div> */}
                {/* </div>  */}
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
                        <p>
                        <span className="bold-text">Tree roots intrusion</span>, roots will grow into joints and create a nest inside the pipe and catch toilet paper, human feces that will eventually create a sewer backup.
                        </p>
                    </div>
                </div>
    
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What's an NFT?</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        To check the conditions of the sewer line. A sewer line scoping will reveal its current condition and can help you identify potential issues to avoid costly surprises in the future.
                    </p>
                    </div>
                </div>
    
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>How to get a crypto wallet.</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        Flushing undissolvable items down the toilet like <span className="bold-text">baby wipes, femal e products, or paper towels</span>. These items can eventually cause a backup when they begin to accumulate and catch other debri.
                    </p>
                    </div>
                </div>
            
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What's the blockchain?</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        When you have a backup. Slow draining water is a symptoms that you might have blockage due to <span className="bold-text">tree roots, build up, or misalignments</span>
                    </p>
                    </div>
                </div>

                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>What are conchas?</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        Hydrojetting is used when there is large amounts of roots or sludge in the line, for example accumulation of <span className="bold-text">grease, human feces, and toilet paper</span>. This method is used when the power rodding does not remove the clog.
                    </p>
                    </div>
                </div>
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>How to make conchas</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        There is a <span className="bold-text">P-trap</span> underneath the floor in a <span className="bold-text">U</span> shape that holds the water, the purpose of the water inside the P-trap is to prevent sewer gases from coming up. If you smell sewer gases, check your floor drains for water. If they are empty simply add water.
                    </p>
                    </div>
                </div>
                <div className="faq">
                    <div className="faq-question">
                    
                        <h2>Who are we?</h2>
                    </div>
                    <div className={`faq-answer faq-answer{}`}>
                    <p>
                        <span className="bold-text">Your P-traps is dry</span> or an exposed pipe with no P-trap or no cap on.  With no water in the P-trap, there is nothing to hold the sewer gases. Simply add water.
                    </p>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default Faq
