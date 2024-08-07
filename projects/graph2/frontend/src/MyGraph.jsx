import React, { useEffect,useState} from "react";
import { MultiGraph, MultiDirectedGraph,UndirectedGraph,Graph } from "graphology";
import { useSigma, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import EdgeCurveProgram, { DEFAULT_EDGE_CURVATURE, indexParallelEdgesIndex } from "@sigma/edge-curve";
//import { useRandom } from "some-random-library"; // Ensure this is the correct import for the library providing `faker` and `randomColor`
//import { indexParallelEdges } from "graphology-layout-parallel-edges";

const MyGraph = ({data}) => {
  const loadGraph = useLoadGraph();
/*
  useEffect(() => {
    // Create the graph
    const graph = new MultiDirectedGraph();
    graph.addNode(data.name, { x: 0, y: 0, label: "Node A", size: 10 ,color:'red'});
    graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 10 ,color:'blue'});
    graph.addEdge(data.name, "B", { label: 'edge1', size: 4, color : 'orange'});
    loadGraph(graph);
  }, [loadGraph,data]);
*/  const [graph, setGraph] = useState(null);
    useEffect(() => {
        if (!data) return;
        console.log(data)
        //const graph = new MultiDirectedGraph();
        //graph.addNode(data.name, { x: 0, y: 0, label: data.name, size: 10, color: 'red' });
        //graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 10, color: 'blue' });
        //graph.addEdge(data.name, "B", { label: 'edge1', size: 4, color: 'orange' });
        const graph = Graph.from(data);
        loadGraph(graph);
        //edit propierties as size and color
        graph.forEachNode((node) => {      
          const label_n = graph.getNodeAttribute(node,"y"); 
          console.log(label_n)
            graph.setNodeAttribute(node, "size", 8);
        });
        loadGraph(graph)

      }, [loadGraph, data]);
  return null;
}
export default MyGraph;
