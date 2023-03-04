import React, { Component as Cp } from "react";
import Board from "./Components/Board";
type State = Immutable<{
    history :statusData[];
    turn :turnStatus;
}>;
/**@once */
export default class Tac extends Cp<{}, State>{
    constructor(props :{}){
        super(props);
        this.state = {history: [[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]], turn: 1};
    }
    updateBoard = (panel :number, position :number)=>{

    }
    updateData(){

    }
    render() :React.ReactNode{
        return(
            <div style={{
                width: "60vw"
            }}>
                <input type="text" placeholder="safs" />
                <Board statusData={this.state.history[this.state.history.length - 1]} updateBoard={this.updateBoard} />
            </div>
        );
    }
}