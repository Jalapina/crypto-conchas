  
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
    <Nft  onClick={toggleModal} drizzle={drizzle} drizzleState={drizzleState} color={color} />
  ));

  return (
    <div className="gallery-container">
      <div className="center-container">
        {ImageList}
      </div>
    </div>
  )

};

export default Gallery;
