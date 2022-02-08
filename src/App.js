import React ,{useState,useEffect}from "react";
import "./App.css";
import Layout from "./components/layout.js";
import { Web3ReactProvider } from '@web3-react/core'
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Web3 from 'web3'
import Landing from './components/landing.js'
import Introduction from './components/introduction.js'
import Footer from './components/footer.js'
import Header from './components/header.js'
import NoWeb3 from './components/noWeb3.js'

export const AppContext = React.createContext();

const App = () => {
  
  const [accountAddress, setAccountAddress] = useState();
  const [contractState, setContractState] = useState(undefined);
  const [reload, setReload] = useState(false);
  const [totalSupply, setTotalSupply] = useState();

  const value = {
    accountAddress, 
    setAccountAddress,
    contractState,
    setContractState,
    reload,
    setReload,
    totalSupply,
    setTotalSupply
  }

  
  function getLibrary(provider) {
    return new Web3(provider)
  }


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContext.Provider value={value}>
        <Router> 
          <div>
            {accountAddress != undefined ?(
              <Layout accountAddress={accountAddress} contractState={contractState}/>
            ):(
              <Route exact path="/">
                  <Header />
                  <NoWeb3 />
                  <Introduction />
                  <Landing />
              </Route>
            )}
          </div>
          <Footer />
        </Router>
      </AppContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;