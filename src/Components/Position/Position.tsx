import styles from "./Position.module.css";
import url_cross from "../../1.png";
import url_circle from "../../2.png";
type Props = Immutable<{
    panelEnabled :boolean;
    positionData :positionData;
    updatePosition :()=>void;
}>;
export default function Position(props :Props){
    const { panelEnabled, positionData, updatePosition } = props;
    return(
        <div className={styles.pos} onClick={updatePosition}
        style={{
            backgroundImage: `url(${positionData === 1 ? url_cross : positionData === -1 ? url_circle : ""})`,
            cursor: panelEnabled && positionData === 0 ? "pointer" : "unset"
        }} />
    );
}