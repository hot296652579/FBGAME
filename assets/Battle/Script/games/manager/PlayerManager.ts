import Player from "../Player";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 15:36:58
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 15:43:06
 * @FilePath: \FBGAME\assets\Battle\Script\games\manager\PlayerManager.ts
 * @Description: 玩家管理器
 */
export default class PlayerManager{
    static _inst:PlayerManager;

    private players:{[id:number]:Player} = {};

    public static ins(){
        if(this._inst == null){
            this._inst = new PlayerManager();
        }
        return this._inst;
    }

    public creatorPlayer(player:Player){
        this.add(player)
        return player;
    }
    private add(player:Player){
        this.players[player.userId] = player;
    }

    public getPlayerById(id:number){
        return this.players[id];
    }
}