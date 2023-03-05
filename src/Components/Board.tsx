import React from "react";
import styles from "./Board.module.css";
import Panel from "./Panel/Panel";
type Props = Immutable<{
    statusData :boardData;
    availablePanels :boardStatus;
    updateBoard :(panel :number, position :number)=>void;
}>;
/**@once */
export default function Board(props :Props){
    const panels = [];
    for(let i = 0; i < 9; i++) panels.push(<Panel panelData={props.statusData[i]} updatePanel={(position :number)=>{props.updateBoard(i, position);}} enabled={props.availablePanels === undefined ? false : props.availablePanels === null || props.availablePanels === i} key={i} />);
    return(
        <div className={styles.board}>{panels}</div>
    );
}