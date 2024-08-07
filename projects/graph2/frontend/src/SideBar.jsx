import React, { useState,useEffect } from "react";
import "./SideBar.css"; // Import your CSS file
import ChartsOverviewDemo from "./plots.jsx";
import MenuDesp from "./MenuDesp.jsx";
import  {ChangeButton}  from "./ChangeButtom.jsx";
import ShowTable from "./ShowTable.jsx";

const SideBar = ({ onToggle,data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const w3_open = () => {
    setIsOpen(true);
  };

  const w3_close = () => {
    setIsOpen(false);
  };

  const [measure,setMeasure] = useState('grado');
  const [isNode,setIsNode] = useState(false);

  useEffect(() => {
    // Any side effect you want to run when isNode changes
    console.log(`isNode changed: ${isNode}`);
  }, [isNode]);
  // <a href="#" className="w3-bar-item w3-button" style={{width:'50px',alignSelf:'center'}}>Graficas</a>
  return (
    <>
      <div className={`w3-sidebar w3-bar-block w3-card ${isOpen ? 'open' : 'closed'}`} id="mySidebar">
        <button className="w3-bar-item w3-button w3-hide-large" onClick={w3_close}>Close &times;</button>
        <MenuDesp setMeasure={setMeasure}/>
        
        <ChangeButton isNode={isNode} setIsNode={setIsNode}/>
        <ShowTable isNode={isNode} data = {data} measure={measure}/>
        <ChartsOverviewDemo isNode={isNode} data = {data} measure = {measure}/>
        
      </div>
      <div style={{ display: 'inline-block', justifyContent: 'flex-end',position:'fixed',right:'0px' }}>
        <button className="w3-button" onClick={w3_open}>&#9776;</button>
        
      </div>
    </>
  );
};

export default SideBar;
