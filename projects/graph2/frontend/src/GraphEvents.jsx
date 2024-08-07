import React, { useEffect, useState } from "react";
import { useSigma, useRegisterEvents } from "@react-sigma/core";

const GraphEvents = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState(null);
  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      mousemovebody: (e) => {
        if (!draggedNode) return;
        // Get new position of node
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      // On mouse up, we reset the autoscale and the dragging mode
      mouseup: () => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      doubleClickNode: (event) => {
        event.preventSigmaDefault();
        const clickedNode = event.node;
  
        // Clear previous highlights
        sigma.getGraph().forEachNode((node) => {
          sigma.getGraph().setNodeAttribute(node, 'highlighted', false);
          sigma.getGraph().setNodeAttribute(node, 'color', '');
        });

        sigma.getGraph().forEachEdge((edge) => {
          sigma.getGraph().setEdgeAttribute(edge, 'highlighted', false);
          sigma.getGraph().setEdgeAttribute(edge, 'color', ''); // Reset the color
        });
  
        // Highlight the clicked node
        sigma.getGraph().setNodeAttribute(clickedNode, 'highlighted', true);
        sigma.getGraph().setNodeAttribute(clickedNode, 'color', 'blue');
  
        // Highlight connected nodes
        sigma.getGraph().forEachNeighbor(clickedNode, (neighbor,edge) => {
          sigma.getGraph().setNodeAttribute(neighbor, 'highlighted', true);
          sigma.getGraph().setNodeAttribute(neighbor, 'color', 'lightblue');
          
          sigma.getGraph().edges(clickedNode, neighbor).forEach((edge) => {
            sigma.getGraph().setEdgeAttribute(edge, 'highlighted', true);
            sigma.getGraph().setEdgeAttribute(edge, 'color', 'lightblue');
          });
        });
  
        // Update the graph to reflect changes
        sigma.refresh();
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

export default GraphEvents;
