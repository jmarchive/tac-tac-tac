import styles from "./Panel.module.css";
import Position from "../Position/Position";
import url_cross from "../../1.png";
import url_circle from "../../2.png";
type Props = Immutable<{
    panelVictory :victoryStatus;
    panelData :panelData;
    enabled :boolean;
    updatePanel :(position :number)=>void;
}>;
export default function Panel(props :Props){
    const { enabled, panelData, updatePanel, panelVictory } = props;
    return(
        <div
            className={`${styles.panel} ${enabled ? styles.enabled : styles.notenabled}`}
            style={{
                backgroundImage: `url(${panelVictory === 1 ? url_cross : panelVictory === -1 ? url_circle : ""})`,
            }}
        >
            <Position panelEnabled={enabled} positionData={panelData[0]} updatePosition={()=>{updateStatus(0);}} />
            <Position panelEnabled={enabled} positionData={panelData[1]} updatePosition={()=>{updateStatus(1);}} />
            <Position panelEnabled={enabled} positionData={panelData[2]} updatePosition={()=>{updateStatus(2);}} />
            <Position panelEnabled={enabled} positionData={panelData[3]} updatePosition={()=>{updateStatus(3);}} />
            <Position panelEnabled={enabled} positionData={panelData[4]} updatePosition={()=>{updateStatus(4);}} />
            <Position panelEnabled={enabled} positionData={panelData[5]} updatePosition={()=>{updateStatus(5);}} />
            <Position panelEnabled={enabled} positionData={panelData[6]} updatePosition={()=>{updateStatus(6);}} />
            <Position panelEnabled={enabled} positionData={panelData[7]} updatePosition={()=>{updateStatus(7);}} />
            <Position panelEnabled={enabled} positionData={panelData[8]} updatePosition={()=>{updateStatus(8);}} />
        </div>
    );
    function updateStatus(position :number){
        if(enabled && panelData[position] === 0) updatePanel(position);
    }
}