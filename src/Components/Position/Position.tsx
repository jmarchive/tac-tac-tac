import React from "react";
import styles from "./Position.module.css";
import url_cross from "./1.png";
import url_circle from "./2.png";
type Props = {
    statusData :positionStatus;
    updateStatus :()=>void;
};
export default function Position(props :Props){
    return(
        <div className={styles.pos} onClick={props.updateStatus}
        style={{
                backgroundImage: `url(${props.statusData === 1 ? url_cross : props.statusData === -1 ? url_circle : ""})`
        }} />
    );
}