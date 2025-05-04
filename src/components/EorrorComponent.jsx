import { useRouteError } from "react-router"
import React from "react";

const ErrorComponent = () => {
    const errors =  useRouteError();
    return (<div className="error-Component">
        <h1> Oop's!!!</h1>
        <h2>{errors.data}</h2>
    </div>)
}
export default ErrorComponent