/*
 * @Description: 
 * @Author: Super_Javan
 * @Date: 2022-11-11 22:25:05
 * @LastEditTime: 2022-11-29 18:01:01
 * @LastEditors: Super_Javan
 */
const { ccclass } = cc._decorator;

@ccclass("PoolManager")
export class PoolManager {
    dictPool: { [name: string]: cc.NodePool } = {}

    static _instance: PoolManager;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new PoolManager();
        return this._instance;
    }

    /**
     * 根据预设从对象池中获取对应节点
     */
    getNode(prefab: cc.Prefab, parent: cc.Node) {
        let name = prefab.data.name as string;
        let node: cc.Node = null!;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this.dictPool[name];
            if (pool.size() > 0) {
                node = pool.get()!;
            } else {
                node = cc.instantiate(prefab);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new cc.NodePool();
            this.dictPool[name] = pool;

            node = cc.instantiate(prefab);
        }
        node.parent = parent
        return node;
    }

    /**
     * 将对应节点放回对象池中
     */
    putNode(node: cc.Node) {
        if (!node) return;
        let name = node.name;
        let pool = null;
        if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this.dictPool[name];
        } else {
            //没有对应对象池，创建他！
            pool = new cc.NodePool();
            this.dictPool[name] = pool;
        }

        pool.put(node);
    }

    /**
     * 根据名称，清除对应对象池
     */
    clearPool(name: string) {
        if (this.dictPool.hasOwnProperty(name)) {
            let pool = this.dictPool[name];
            pool.clear();
        }
    }
}
