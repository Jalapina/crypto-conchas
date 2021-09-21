import React, { useReducer } from 'react'
import update from 'immutability-helper';
import Header from './header.js'
// import Menu from './menu.js'
import Footer from './footer.js'
import '../index.css'
import CryptoConchas from '../CryptoConchas'
import { newContextComponents, AccountData } from "@drizzle/react-components";

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
    console.log(drizzle.contractList[0])
     return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className="">
                <div className="">
                    <Header contractName={drizzle.contractList[0].contractName}/>
                    <div className="title">
                    {state.tag}
                    </div>
                    {/* <Menu /> */}
                    <CryptoConchas drizzle={drizzle} drizzleState={drizzleState} />
                </div>
                <Footer />
            </div>
        </AppContext.Provider>
    )
}

export default Layout
