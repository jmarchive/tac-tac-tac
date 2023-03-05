import React from "react";
import styles from "./Panel.module.css";
import Position from "../Position/Position";
type Props = Immutable<{
    panelData :panelData;
    enabled :boolean;
    updatePanel :(position :number)=>void;
}>;
export default function Panel(props :Props){
    return(
        <div className={`${styles.panel} ${props.enabled ? styles.enabled : styles.notenabled}`}>
            <Position statusData={props.panelData[0]} updateStatus={()=>{updateStatus(0);}} />
            <Position statusData={props.panelData[1]} updateStatus={()=>{updateStatus(1);}} />
            <Position statusData={props.panelData[2]} updateStatus={()=>{updateStatus(2);}} />
            <Position statusData={props.panelData[3]} updateStatus={()=>{updateStatus(3);}} />
            <Position statusData={props.panelData[4]} updateStatus={()=>{updateStatus(4);}} />
            <Position statusData={props.panelData[5]} updateStatus={()=>{updateStatus(5);}} />
            <Position statusData={props.panelData[6]} updateStatus={()=>{updateStatus(6);}} />
            <Position statusData={props.panelData[7]} updateStatus={()=>{updateStatus(7);}} />
            <Position statusData={props.panelData[8]} updateStatus={()=>{updateStatus(8);}} />
        </div>
    );
    function updateStatus(position :number){
        if(props.enabled && props.panelData[position] === 0) props.updatePanel(position);
    }
}