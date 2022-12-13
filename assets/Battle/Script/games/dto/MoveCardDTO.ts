/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-13 15:36:41
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 15:38:22
 * @FilePath: \FBGAME\assets\Battle\Script\games\dto\MoveCardDTO.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 移动牌
 */
export default class MoveCardDTO {

    /**
     * 如果是联网游戏chair通过服务端获取
     */
    chair: number;
    /**
     * 起点
     */
    fromIndex: number;
    /**
     * 终点
     */
    toIndex: number;

    constructor(chair: number, fromIndex: number, toIndex: number) {
        this.chair = chair;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }
}