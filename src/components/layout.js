import React, { useReducer } from 'react'
import update from 'immutability-helper';
import Header from './header.js'
// import Menu from './menu.js'
import Footer from './footer.js'
import '../index.css'
import '../assets/index.sass'
import CryptoConchas from '../CryptoConchas'
import Inventory from "./inventory.js";
import TokenMeta from "./tokenMeta.js";
import Gallery from './gallery.js'
import Minted from './minted.js'
import About from './about.js'
import MintableShowcase from './mintableShowcase.js'
import Nft from './nft.js'
import { newContextComponents, AccountData } from "@drizzle/react-components";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export const AppContext = React.createContext();
const { ContractData } = newContextComponents;

const initialState = {
    categoryNumber: 0,
  };
  
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_INDEX':
            return update(state, {
                categoryNumber: {$set: action.data},
            });
  
        default:
            return initialState;
    }
}

const Layout = ({ drizzle, drizzleState }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
     return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className="">
                <Header contractName={drizzle.contractList[0].contractName}/>
                <div className="title">
                {state.tag}
                </div>
                {/* <Menu /> */}
                    <Route exact path="/">   
                        <CryptoConchas drizzle={drizzle} drizzleState={drizzleState} />
                        <Inventory drizzle={drizzle} drizzleState={drizzleState} />
                        <Minted drizzle={drizzle} drizzleState={drizzleState} />
                    </Route>
                    <Route path="/token/:tokenId">   
                        <TokenMeta/>
                    </Route>
                    <Route path="/gallery">   
                        <Gallery drizzle={drizzle} drizzleState={drizzleState} />
                    </Route>
                    <Route path="/mintable">
                        <MintableShowcase drizzle={drizzle} drizzleState={drizzleState} />
                    </Route>
                    <Route path="/about">
                        <About drizzle={drizzle} drizzleState={drizzleState} />
                    </Route>
                    {/* <Route path="/minted">   
                    </Route> */}
                <Footer />
            </div>
        </AppContext.Provider>
    )
}

export default Layout
