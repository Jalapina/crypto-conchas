import React, { useReducer, useState } from 'react'
import update from 'immutability-helper';
import Header from './header.js'
// import Menu from './menu.js'
import Footer from './footer.js'
import '../index.css'
import '../assets/index.sass'
import CryptoConchas from '../CryptoConchas'
import Inventory from "./inventory.js";
import TokenMeta from "./tokenMeta.js";
import Minted from './minted.js'
import Landing from './landing.js'
import About from './about.js'
import Introduction from './introduction.js'
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

const Layout = ({ drizzleContext }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const { drizzle, drizzleState, initialized } = drizzleContext;

    console.log(initialized,drizzleState)

     return (
        <AppContext.Provider >
            <div className="layout-wrapper">
                {(() => {
                    if(drizzleState == null || initialized === "false" || drizzleState.web3.status === "failed" ) {
                    return (
                        <div>
                            <Header initialized={false}/>
                            <Route exact path="/">
                                <Introduction/>
                                <Landing />
                            </Route>
                        </div>
                    )
                    } else if (drizzleState.web3.status !== "failed") {
                    return (
                        <div className="web3">
                            <Header initialized={true}/>
                            <Route exact path="/">
                                <Introduction/>
                                <CryptoConchas drizzle={drizzle} drizzleState={drizzleState} />
                                <Inventory drizzle={drizzle} drizzleState={drizzleState} />
                                <Minted drizzle={drizzle} drizzleState={drizzleState} />
                            </Route>
                            <Route path="/mintable">
                                <MintableShowcase drizzle={drizzle} drizzleState={drizzleState} />
                            </Route>
                        </div>
                    )}
                })()}

                <Route path="/about">
                    <About />
                </Route>

                <Route path="/token/:tokenId">   
                    <TokenMeta/>
                </Route>

                <Footer />
            </div>
        </AppContext.Provider>
    )
}

export default Layout
