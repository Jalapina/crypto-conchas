import React from "react";
import { Jumbotron } from 'react-bootstrap';
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
import Layout from "./components/layout.js";
import { BrowserRouter } from "react-router-dom";

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized || drizzleState.web3.status === 'failed') {
            return (
              <Jumbotron className="loading-jumbo">
                <div className="loading-network-page">
                  <div className="loading-network-statement-container">
                    <h2 className="loading-network-statement">Connect Metamask to start the app</h2>
                    <h2 className="loading-network-statement">This app works on the Rinkeby Testnet</h2>
                    <div class="lds-ripple"><div></div><div></div></div>
                    <div className="opensea-link">
                      <a href="https://testnets.opensea.io/collection/cryptoconchasrinkeby">View Our Project on OpenSea</a>
                    </div>
                  </div>
                </div>
              </Jumbotron>
            )
          }

          return (
            <BrowserRouter>
              <Layout drizzle={drizzle} drizzleState={drizzleState} />
            </BrowserRouter>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;