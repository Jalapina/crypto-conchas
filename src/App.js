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
          return (
            <BrowserRouter>
              <Layout drizzleContext={drizzleContext} />
            </BrowserRouter>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;