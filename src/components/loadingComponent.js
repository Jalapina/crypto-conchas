import React from "react";
import {dizzleReactHooks} from "@drizzle/react-plugin";

const {useDizzleState} = dizzleReactHooks

const LoadingComponent = () =>{
    const drizzleStatus = useDizzleState()
}

export default LoadingComponent;