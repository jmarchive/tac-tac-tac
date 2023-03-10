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
    const panels = [], { availablePanels, statusData, updateBoard } = props;
    for(let i = 0; i < 9; i++){
        panels.push(<Panel panelData={statusData[i]} updatePanel={(position :number)=>{updateBoard(i, position);}} enabled={availablePanels[i] === 0} key={i} />);
    }
    return(
        <div className={styles.board}>{panels}</div>
    );
}