import React from "react";
import "./MenuDesp.css";
//menu that receive and setSate and a set of labels
const MenuDesp = ({setMeasure}) =>{


    return (
        <>
            <div className="dropdown">
            <button className="dropbtn">Medidas</button>
            <div className="dropdown-content" >
                <a><button onClick={()=>setMeasure('Grado')}>Grado</button></a>
                <a><button onClick={()=>setMeasure('Fortaleza')}>Fortaleza</button></a>
                <a><button onClick={()=>setMeasure('Entropia (H)')}>Entropia (H)</button></a>
            </div>
            </div>
        </>
    );

};

export default MenuDesp;
