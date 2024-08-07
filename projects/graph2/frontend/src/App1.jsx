import React from "react";
import ReactDOM from "react-dom";
import LoadGraphWithProp from "./LoadGraphWithProp";
//import './App.css'

const App = () => {
  const containerStyle = { width: "700px", height: "650px" };

  return (
    <div>
      <LoadGraphWithProp style={containerStyle} />
    </div>
  );
};

export default App