import React, { Component as Cp } from "react";
import styles from "./Tac.module.css";
import Board from "./Components/Board";
import url_cross from "./Components/Position/1.png";
import url_circle from "./Components/Position/2.png";
type State = Readonly<{
    data_history :boardData[];
    status :boardStatus;
    turn :turn;
}>;
/**@once */
export default class Tac extends Cp<{}, State>{
    gameStarted :boolean = false;
    isComputerBased :boolean = false;
    //getter的意义是防止修改
    get defaultState() :State{
        return{
            data_history: [this.cloneOrGenerateHistoryEntry()],
            turn: 0 as turn,
            status: [-2,-2,-2,-2,-2,-2,-2,-2,-2] as boardStatus
        };
    }
    constructor(props :{}){
        super(props);
        this.state = this.defaultState;
    }
    initializeGame = ()=>{
        this.setState(this.defaultState, ()=>{
            this.setState({
                status: [0,0,0,0,0,0,0,0,0],
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
            const history = [...state.data_history], currentHistory = this.cloneOrGenerateHistoryEntry(state.data_history[state.data_history.length - 1]);
            currentHistory[panel][position] = state.turn;
            history.push(currentHistory);
            return{ ...state,
                data_history: history,
                turn: -state.turn as turn
            }
        }, ()=>{ //判断胜利及panel可用性
            const currentHistory = this.state.data_history[this.state.data_history.length - 1], boardStatus = [...this.state.status] as unknown as boardStatus;
            //#region panel禁用与启用
            //先将所有能禁用的panel都禁用
            for(let i = 0; i < 9; i++) if(boardStatus[i] === 0) boardStatus[i] = -2;
            //检查自己胜利状态
            const currentPanelStatus = this.checkVictory(currentHistory[panel]);
            boardStatus[panel] = currentPanelStatus === 0 ? -2 : currentPanelStatus;
            if(boardStatus[position] === -2) boardStatus[position] = 0;
            //指向锁定panel，启用其他所有panel
            else for(let i = 0; i < 9; i++) if(boardStatus[i] === -2) boardStatus[i] = 0;
            //#endregion
            const finalVictory = this.checkVictory(boardStatus);
            if(finalVictory !== 0) this.endGame(finalVictory);
            else this.setState({status: boardStatus as boardStatus});
            console.log(currentHistory, boardStatus, finalVictory);
        });
    }
    /**不能知道panel的可用性！！！*/
    checkVictory(statusData :panelData | boardStatus) :victoryStatus{
        const splitData = [
            //斜
            [statusData[0], statusData[4], statusData[8]],
            [statusData[2], statusData[4], statusData[6]],
            //横
            [statusData[0], statusData[1], statusData[2]],
            [statusData[3], statusData[4], statusData[5]],
            [statusData[6], statusData[7], statusData[8]],
            //纵
            [statusData[0], statusData[3], statusData[6]],
            [statusData[1], statusData[4], statusData[7]],
            [statusData[2], statusData[5], statusData[8]],
        ];
        //这里已经排除了-2，所以可以断言
        for(let i = 0; i < splitData.length; i++) if(splitData[i][0] !== 0 && splitData[i][0] !== -2 && splitData[i][0] === splitData[i][1] && splitData[i][0] === splitData[i][2]) return splitData[i][0] as victoryStatus;
        if(statusData[0] === 0 || statusData[0] === -2 || statusData[1] === 0 || statusData[1] === -2 || statusData[2] === 0 || statusData[2] === -2 || statusData[3] === 0 || statusData[3] === -2 || statusData[4] === 0 || statusData[4] === -2 || statusData[5] === 0 || statusData[5] === -2 || statusData[6] === 0 || statusData[6] === -2 || statusData[7] === 0 || statusData[7] === -2 || statusData[8] === 0 || statusData[8] === -2) return 0;
        else return 2;
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
                    statusData={this.state.data_history[this.state.data_history.length - 1]}
                    updateBoard={this.updateBoard}
                    availablePanels={this.state.status}
                />
            </div>
        );
    }
}