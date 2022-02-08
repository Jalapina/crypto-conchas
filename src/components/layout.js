import React, { useReducer, useState } from 'react'
import update from 'immutability-helper';
import Header from './header.js'
import Footer from './footer.js'
import '../index.css'
import '../assets/index.sass'
import CryptoConchas from '../CryptoConchas'
import Inventory from "./inventory.js";
import Account from "./account.js";
import TokenMeta from "./tokenMeta.js";
import Minted from './minted.js'
import Landing from './landing.js'
import About from './about.js'
import Introduction from './introduction.js'
import MintableShowcase from './mintableShowcase.js'
import Nft from './nft.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Layout = ({ accountAddress }) => {

    return (

        <div className="layout-wrapper">

            <Route exact path="/">
                <Introduction/>
                <Inventory />
                <Landing />
            </Route>
            
            <Route path="/inventory">
                <Account accountAddress={accountAddress} />
            </Route>
            
        </div>
    )
}

export default Layout
