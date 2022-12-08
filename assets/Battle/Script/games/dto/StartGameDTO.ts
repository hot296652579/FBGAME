/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-05 16:21:53
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-05 16:22:05
 * @FilePath: \FBGame\assets\Battle\Script\games\dto\StartGameVO.ts
 * @Description: 开始游戏动作 DTO表示做一个动作带数据
 */

/**
 * 开始游戏
 */
 export default class StartGameDTO {
    /**
     * 当前操作的椅子
     */
    chair: number;
    /**
     * 牌
     */
    cards: number[];

    constructor(chair: number, cards: number[]) {
        this.chair = chair;
        this.cards = cards;
    }
}
