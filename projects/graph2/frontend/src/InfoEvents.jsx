import React, { useEffect, useState } from "react";
import { useSigma, useRegisterEvents } from "@react-sigma/core";

const InfoEvents = ({setNodeLabel}) => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  console.log('SetNode_s:', setNodeLabel);
  useEffect(() => {
    // Register the events
    registerEvents({

      clickNode: (event) => {
        event.preventSigmaDefault();
        console.log('info');
        const clickedNode = event.node;
        const NewNode = sigma.getGraph().getNodeAttribute(clickedNode,'label');
        setNodeLabel(NewNode);

        
      },
    });
  }, [registerEvents, sigma,setNodeLabel]);

  return null;
};

export default InfoEvents;