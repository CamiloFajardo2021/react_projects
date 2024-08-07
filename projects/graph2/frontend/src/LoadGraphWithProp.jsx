import React, { useState,useEffect } from "react";
import { MultiGraph,MultiDirectedGraph } from "graphology";
import  MyGraph  from './MyGraph.jsx';
import GraphEvents from './GraphEvents';
import InfoEvents from './InfoEvents';
import Data from "./get_data.jsx";
import DataGraph from "./DataGraph.jsx";
import SideBar from "./SideBar.jsx"
//import './App.css'

import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
  useRegisterEvents,
  useSigma,
  useLoadGraph
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";



const LoadGraphWithProp = ({ style }) => {

  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [nodeTable,setNodeTable] = useState(null);
  // Create the graph
  const graph = new MultiDirectedGraph();
  graph.addNode("A", { x: 0, y: 0, label: "Node A", size: 10 ,color : '	#FF0000'});
  graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 10 ,color : '	#FF0000'});
  graph.addEdge("A", "B", { label: 'e1', size: 5 });

  const combinedStyle = {
    ...style,
    border: "2px solid darkblue",
    labelFont: "Lato, sans-serif",
  };

  //settings
  const sigmaSettings = {
    allowInvalidContainer: true,
    renderLabels: true,
  };
  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const [nodeLabel,setNodeLabel] = useState('');
  return (
  <div className="container" style={{display:'flex'}}> 
  <div style={{ marginRight: isSidebarOpen ? "0" : "200px" ,display:'flex',flex:'1'}}>
    <div style={{width:'auto',backgroundColor:'lightgray',paddingRight:'5px'}}>
    <Data data = {data} setData = {setData}/>
    <h2>Info Nodo</h2>
    <h3 style={{fontFamily:'serif',marginInlineStart:'5px'}}>  Codigo : {nodeLabel}</h3>
    <h3 style={{fontFamily:'serif',marginInlineStart:'5px'}}>Nombre : {nodeLabel}</h3>
    <h3 style={{fontFamily:'serif',marginInlineStart:'5px'}}> Prevalencia : {nodeLabel}</h3>
    </div>
    <SigmaContainer style={combinedStyle} settings={sigmaSettings}>
      <MyGraph  data ={data}/>
      <GraphEvents />
      <InfoEvents setNodeLabel = {setNodeLabel}/>
      <DataGraph style = {{position: 'absolute',buttom: '5px', left: '40px'}} data = {data}/>
      <ControlsContainer position={"bottom-right"}>
      <ZoomControl />
      <FullScreenControl />
      </ControlsContainer>
      
    </SigmaContainer>
  </div>
      <SideBar onToggle={handleSidebarToggle} data={data}/>
  </div>)
};

export default LoadGraphWithProp;


