/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-13 15:38:45
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 15:39:20
 * @FilePath: \FBGAME\assets\Battle\Script\games\vo\MoveCardVO.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class MoveCardVO {

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

}