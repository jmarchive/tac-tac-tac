type anyObject = Record<string, any>;
declare module "*.module.css"{
    const classes :Immutable<anyObject>;
    export default classes;
}
declare module "*.png"{
    const URL :string;
    export default URL;
}
//#region 此处代码来自Immer：https://github.com/immerjs/immer。Immer 以 MIT License 开源：https://github.com/immerjs/immer/blob/main/LICENSE
type IfAvailable<T, Fallback = void> =
    boolean extends (T extends never ? true : false) ? Fallback
        : keyof T extends never ? Fallback
            : T;
type Immutable<T> =
    T extends (string | number | boolean) ? T
        : T extends (Function | RegExp | Promise<any> | Date) ? T
            : T extends IfAvailable<ReadonlyMap<infer K, infer V>> ? ReadonlyMap<Immutable<K>, Immutable<V>>
                : T extends IfAvailable<ReadonlySet<infer V>> ? ReadonlySet<Immutable<V>>
                    : T extends (WeakMap<any, any> | WeakSet<any>) ? T
                        : T extends object ? {readonly [K in keyof T]: Immutable<T[K]>;}
                            : T;
//#endregion
/**`0`：未开始游戏；`1`：玩家×；`-1`：另一玩家或电脑○*/
type turn = 0 | 1 | -1;
/**`0`：未胜利且可用；`-2`：未胜利但不可用；`1`：玩家×；`-1`：另一玩家或电脑○；`2`：平局*/
type panelStatus = 0 | -2 | 1 | -1 | 2;
/**`0`：未胜利；`1`：玩家×；`-1`：另一玩家或电脑○；`2`：平局*/
type victoryStatus = 0 | 1 | -1 | 2;
type boardStatus = [panelStatus, panelStatus, panelStatus, panelStatus, panelStatus, panelStatus, panelStatus, panelStatus, panelStatus];
/**`0`：未落子；`1`：玩家×；`-1`：另一玩家或电脑○*/
type positionData = 0 | 1 | -1;
type panelData = [positionData, positionData, positionData, positionData, positionData, positionData, positionData, positionData, positionData];
type boardData = [panelData, panelData, panelData, panelData, panelData, panelData, panelData, panelData, panelData];