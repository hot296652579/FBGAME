/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-13 15:42:55
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 15:43:03
 * @FilePath: \FBGAME\assets\Battle\Script\games\dto\MoveResultDTO.ts
 * @Description: 移动结果动作
 */
export default class MoveResultDTO {
    /**
     * 操作的人
     */
    chair: number;
    /**
     *开始位置
     */
    fromIndex: number;
    /**
     * 开始位置的牌
     */
    fromCard: number;
    /**
     *目标位置
     */
    toIndex: number;
    /**
     * 目标位置的牌
     */
    toCard: number;
    /**
     * 结果（-1 失败，0 平局 ，1 胜利）
     */
    result: number;

    constructor(chair: number, fromIndex: number, fromCard: number, toIndex: number, toCard: number, result: number) {
        this.chair = chair;
        this.fromIndex = fromIndex;
        this.fromCard = fromCard;
        this.toIndex = toIndex;
        this.toCard = toCard;
        this.result = result;
    }
}
