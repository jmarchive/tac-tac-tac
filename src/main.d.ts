type anyObject = Record<string, any>;
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