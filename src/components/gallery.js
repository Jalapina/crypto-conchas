  
import React, { useState, useContext } from "react";
import "../assets/nft.sass"

import Nft from './nft'

import { AppContext } from './layout'

const Gallery = ({ drizzle, drizzleState }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  
  const {state, dispatch} = useContext(AppContext);

  const changeIndexValue = (newValue) => {
    dispatch({ type: 'UPDATE_INDEX', data: newValue});
  };

  const imageArray = ["blue","brown","dark-brown","green","light-brown","orange","pink","red","turquoise","white","yellow","purple","dark","mexican-colors","turquoise-purple-orange","turquoise-purple","chocolate-vanilla"];


  const ImageList = imageArray.map((color,index) => (
    <li className={'gallery'}>
        <div onClick={toggleModal}>
            <div className="token-name-container">
              <h2>{color} concha</h2><h3 className="token-id">#{index+1}</h3>
            </div>
            <Nft drizzle={drizzle} drizzleState={drizzleState} color={color} />
        </div>
    </li>
  ));

  return (
    <div className="gallery-container">
      {ImageList}
    </div>
  )

};

export default Gallery;