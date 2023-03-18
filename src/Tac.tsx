import React, { Component as Cp } from "react";
import styles from "./Tac.module.css";
import Board from "./Components/Board";
import url_cross from "./1.png";
import url_circle from "./2.png";
type State = Readonly<{
    data_history :boardData[];
    status :boardStatus;
    turn :turn;
    tips :string;
    gameStarted :boolean;
}>;
/**@once */
export default class Tac extends Cp<{}, State>{
    isComputerBased :boolean = false;
    aboutShown :boolean = false;
    title :React.ReactNode = "TAC";
    //getter的意义是防止修改
    get defaultState() :State{
        return{
            data_history: [this.cloneOrGenerateHistoryEntry()],
            turn: 0 as turn,
            status: [-2,-2,-2,-2,-2,-2,-2,-2,-2] as boardStatus,
            tips: "",
            gameStarted: false
        };
    }
    constructor(props :{}){
        super(props);
        this.state = this.defaultState;
    }
//#region 生命周期
    initializeGame = ()=>{
        this.setState(this.defaultState, ()=>{
            this.setState({
                status: [0,0,0,0,0,0,0,0,0],
                turn: 1,
                gameStarted: true
            });
        });
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
        }, ()=>{
            this.postUpdate(panel, position);
        });
    }
    postUpdate(panel :number, position :number){
        const currentHistory = this.state.data_history[this.state.data_history.length - 1], boardStatus = [...this.state.status] as unknown as boardStatus;
        console.log()
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
        if(finalVictory !== 0){
            for(let i = 0; i < 9; i++) if(boardStatus[i] === 0) boardStatus[i] = -2;
            this.setState({
                tips: `${finalVictory === 1 ? "×" : "○"} 赢得了游戏！`,
                gameStarted: false
            });
        }
        this.setState({status: boardStatus});
        console.log(currentHistory, boardStatus, finalVictory);
    }
    back = ()=>{
        var currentData :boardData;
        this.setState(state=>{
            const data_history = [...state.data_history];
            currentData = data_history.splice(data_history.length - 1, 1)[0];
            return{
                data_history,
                turn: -state.turn as turn
            };
        }, ()=>{
            const n2Data = this.state.data_history[this.state.data_history.length - 2], n1Data = this.state.data_history[this.state.data_history.length - 1];
            var dfsFinished :boolean = false;
            if(n2Data === undefined) this.initializeGame();
            else{
                const delta0 = this.getDeltaCoord(n1Data, currentData)!, delta_1 = this.getDeltaCoord(n2Data, n1Data)!;
                console.log(n2Data, delta_1, n1Data, delta0, currentData);
                this.setState(state=>{
                    const status = [...state.status] as boardStatus;
                    //对于撤去棋子的panel需要重新计算胜利
                    status[delta0[0]] = this.checkVictory(n1Data[delta0[0]]);
                    return{ status };
                }, ()=>{
                    this.postUpdate(delta_1[0], delta_1[1]);
                });
            }
        });
    }
//#endregion
//#region 工具方法
    getDeltaCoord(originData :boardData, deltaData :boardData) :[number, number] | undefined{
        for(let i = 0; i < 9; i++) for(let j = 0; j < 9; j++) if(deltaData[i][j] !== originData[i][j]){
            return [i,j];
        }
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
    cloneOrGenerateHistoryEntry(statusData? :boardData) :boardData{
        const result = [];
        for(let i = 0; i < 9; i++){
            const panelData = [];
            for(let j = 0; j < 9; j++) panelData[j] = statusData ? statusData[i][j] : 0;
            result.push(panelData);
        }
        return result as unknown as boardData;
    }
//#endregion
//#region 杂项方法
    changeMode = (event :React.ChangeEvent<HTMLInputElement>)=>{
        this.isComputerBased = event.target.checked;
    }
    toggleAbout = ()=>{
        if(this.aboutShown) this.title = "TAC";
        else this.title = <><div>©2019-2023 LJM12914.</div><div>经典复刻计划 From 初中</div><a target="_blank" href="https://github.com/jmarchive/tac-tac-tac">GitHub</a></>;
        this.forceUpdate();
        this.aboutShown = !this.aboutShown;
    }
//#endregion
    render() :React.ReactNode{
        return(
            <div className={styles.main}>
                <div className={styles.panel}>
                    <div>
                        <h1 onPointerUp={this.toggleAbout}>{this.title}</h1>
                        <small>©2019-2023 LJM12914.&emsp;<a target="_blank" href="https://github.com/jmarchive/tac-tac-tac/blob/main/README.zh-hans.md#%E8%A7%84%E5%88%99">游戏规则</a></small>
                        <div>{this.state.tips}</div>
                    </div>
                    <div className={styles.controller}>
                        <label><input type="checkbox" disabled={/*this.gameStarted*/true} onChange={this.changeMode} />人机对战（未开发）</label>
                        <button className={styles.button} disabled={this.state.gameStarted} onClick={this.initializeGame}>开始</button>
                        <button className={styles.button} disabled={!this.state.gameStarted || this.state.data_history.length < 2} onClick={this.back}>后退</button>
                        <div style={{
                            width: "3rem",
                            height: "3rem",
                            minWidth: "3rem",
                            minHeight: "3rem",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "60% 60%",
                            backgroundPosition: "center center",
                            backgroundImage: `url(${this.state.turn === 1 ? url_cross : this.state.turn === -1 ? url_circle : ""})`
                        }}></div>
                    </div>
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