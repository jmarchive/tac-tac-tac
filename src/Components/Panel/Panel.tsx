import React, { Component as Cp } from "react";
import styles from "./Panel.module.css";
import Position from "../Position/Position";
type Props = Immutable<{
    panelData :panelData;
    updatePanel :(position :number)=>void;
}>;
export default function Panel(props :Props){
    return(
        <div className={styles.panel}>
            <Position statusData={props.panelData[0]} updateStatus={()=>{props.updatePanel(0);}} />
            <Position statusData={props.panelData[1]} updateStatus={()=>{props.updatePanel(1);}} />
            <Position statusData={props.panelData[2]} updateStatus={()=>{props.updatePanel(2);}} />
            <Position statusData={props.panelData[3]} updateStatus={()=>{props.updatePanel(3);}} />
            <Position statusData={props.panelData[4]} updateStatus={()=>{props.updatePanel(4);}} />
            <Position statusData={props.panelData[5]} updateStatus={()=>{props.updatePanel(5);}} />
            <Position statusData={props.panelData[6]} updateStatus={()=>{props.updatePanel(6);}} />
            <Position statusData={props.panelData[7]} updateStatus={()=>{props.updatePanel(7);}} />
            <Position statusData={props.panelData[8]} updateStatus={()=>{props.updatePanel(8);}} />
        </div>
    );
}