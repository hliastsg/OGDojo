import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.jsx";


ReactDOM.render(
    <App/> ,
  document.getElementById('app')
);
//ReactDOM.render(<App />, document.querySelector("#root"));

if (module.hot) // eslint-disable-line no-undef  
  module.hot.accept()
