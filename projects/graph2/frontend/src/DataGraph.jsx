import React, { useState, useEffect } from 'react';
import { useSigma, useRegisterEvents } from "@react-sigma/core";


const DataGraph = ({data})=>{
    const sigma = useSigma();
    const [infoGraph,setInfoGraph] = useState({'nodos':0,'vinculos':0,'grado promedio':0});
    useEffect(()=>{
        //Calcular estos valores cada vez que se reenderice el grafo
        const graph = sigma.getGraph();

        // Calculate the number of nodes
        const nodos = graph.order;

        // Calculate the number of edges
        const vinculos = graph.size;

        const degrees = Array.from(graph.nodes()).map((node) => graph.degree(node));
        const totalDegree = degrees.reduce((sum, degree) => sum + degree, 0);
        const meanDegree = totalDegree / nodos;

        // Set the graph info
        setInfoGraph({ 'nodos': nodos, 'vinculos': vinculos, 'grado promedio': meanDegree });
    },[data]);

return (
    <article style={{position:'absolute',top:'5px',left:'5px',fontSize:'10',lineHeight:'0.5'}}>
        <h2>Info Red</h2>
        <h4>Numero de nodos : {infoGraph.nodos} </h4>
        <h4>Numero de vinculos : {infoGraph.vinculos} </h4>
        <h4>Grado Promedio : {infoGraph['grado promedio']} </h4>
    </article>

)};

export default DataGraph;