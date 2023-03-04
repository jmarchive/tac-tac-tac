import React, { Component as Cp } from "react";
import styles from "./Board.module.css";
import Panel from "./Panel/Panel";
type Props = Immutable<{
    statusData :statusData;
    updateBoard :(panel :number, position :number)=>void;
}>;
/**@once */
export default class Board extends Cp<Props>{
    render() :React.ReactNode{
        return(
            <div className={styles.board}>
                <Panel panelData={this.props.statusData[0]} updatePanel={this.props.updateBoard.bind(this, 0)} />
                <Panel panelData={this.props.statusData[1]} updatePanel={this.props.updateBoard.bind(this, 1)} />
                <Panel panelData={this.props.statusData[2]} updatePanel={this.props.updateBoard.bind(this, 2)} />
                <Panel panelData={this.props.statusData[3]} updatePanel={this.props.updateBoard.bind(this, 3)} />
                <Panel panelData={this.props.statusData[4]} updatePanel={this.props.updateBoard.bind(this, 4)} />
                <Panel panelData={this.props.statusData[5]} updatePanel={this.props.updateBoard.bind(this, 5)} />
                <Panel panelData={this.props.statusData[6]} updatePanel={this.props.updateBoard.bind(this, 6)} />
                <Panel panelData={this.props.statusData[7]} updatePanel={this.props.updateBoard.bind(this, 7)} />
                <Panel panelData={this.props.statusData[8]} updatePanel={this.props.updateBoard.bind(this, 8)} />
            </div>
        );
    }
}