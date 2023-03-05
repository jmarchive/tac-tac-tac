import React, { Component as Cp } from "react";
import styles from "./Tac.module.css";
import Board from "./Components/Board";
import url_cross from "./Components/Position/1.png";
import url_circle from "./Components/Position/2.png";
type State = Readonly<{
    history :boardData[];
    turn :turnStatus;
    //prevUpdate :coord | null | undefined;
    availablePanels :[boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
    //可以将panel本身理解为大棋盘的一个position
    panelVictory :panelData;
}>;
/**@once */
export default class Tac extends Cp<{}, State>{
    gameStarted :boolean = false;
    isComputerBased :boolean = false;
    //getter的意义是防止修改
    get defaultState() :State{
        return{
            history: [this.cloneOrGenerateHistoryEntry()],
            turn: 0 as turnStatus,
            availablePanels: [false, false, false, false, false, false, false, false, false],
            panelVictory :[0,0,0,0,0,0,0,0,0] as panelData
        };
    }
    constructor(props :{}){
        super(props);
        this.state = this.defaultState;
    }
    initializeGame = ()=>{
        this.setState(this.defaultState, ()=>{
            this.setState({
                availablePanels: [true, true, true, true, true, true, true, true, true],
                turn: 1
            });
        });
        this.gameStarted = true;
    }
    endGame(finalVictory :number){
        alert(`${finalVictory} 赢得游戏`);
        //todo:结束游戏
    }
    updateBoard = (panel :number, position :number)=>{
        this.setState(state=>{
            const history = [...state.history], current = this.cloneOrGenerateHistoryEntry(state.history[state.history.length - 1]);
            current[panel][position] = state.turn;
            history.push(current);
            return{ ...state,
                history,
                turn: -state.turn as turnStatus,
                prevUpdate: [panel, position]
            }
        }, ()=>{
            const current = this.state.history[this.state.history.length - 1], panelVictory = [];
            for(let i = 0; i < 9; i++) panelVictory.push(this.checkVictory(current[i]));
            const finalVictory = this.checkVictory(panelVictory as panelData);
            if(finalVictory !== 0) this.endGame(finalVictory);
            else this.setState({panelVictory: panelVictory as panelData});
            console.log(current, panelVictory, finalVictory);
        });
    }
    checkVictory(panelData :panelData) :victoryStatus{
        const splitData = [
            //斜
            [panelData[0], panelData[4], panelData[8]],
            [panelData[2], panelData[4], panelData[6]],
            //横
            [panelData[0], panelData[1], panelData[2]],
            [panelData[3], panelData[4], panelData[5]],
            [panelData[6], panelData[7], panelData[8]],
            //纵
            [panelData[0], panelData[3], panelData[6]],
            [panelData[1], panelData[4], panelData[7]],
            [panelData[2], panelData[5], panelData[8]],
        ];
        for(let i = 0; i < 8; i++) if(splitData[i][0] !== 0 && splitData[i][0] === splitData[i][1] && splitData[i][0] === splitData[i][2]) return splitData[i][0] as victoryStatus;
        return 0;
    }
    changeMode = (event :React.ChangeEvent<HTMLInputElement>)=>{
        this.isComputerBased = event.target.checked;
    }
    cloneOrGenerateHistoryEntry(statusData? :boardData) :boardData{
        const result = [];
        for(let i = 0; i < 9; i++){
            const panelData = [];
            for(let j = 0; j < 9; j++) panelData[j] = statusData ? statusData[i][j] : 0;
            result.push(panelData);
        }
        return result as unknown as boardData;
    }
    render() :React.ReactNode{
        return(
            <div className={styles.main}>
                <div className={styles.control}>
                    <label><input type="checkbox" disabled={this.gameStarted} onChange={this.changeMode} />人机对战</label>
                    <button className={styles.button} disabled={this.gameStarted} onClick={this.initializeGame}>开始</button>
                    <div style={{
                        width: "3rem",
                        height: "3rem",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "60% 60%",
                        backgroundPosition: "center center",
                        backgroundImage: `url(${this.state.turn === 1 ? url_cross : this.state.turn === -1 ? url_circle : ""})`
                    }}></div>
                </div>
                <Board
                    statusData={this.state.history[this.state.history.length - 1]}
                    updateBoard={this.updateBoard}
                    availablePanels={this.state.availablePanels}
                />
            </div>
        );
    }
}