/**
 * 打开牌
 */
 export default class OpenCardDTO {

    /**
     * 如果是联网游戏chair通过服务端获取
     */
    chair: number;
    /**
     * 索引位置
     */
    index: number;
    /**
     * 牌
     */
    card: number;

    constructor(chair: number, index: number,card:number) {
        this.chair = chair;
        this.index = index;
        this.card = card;
    }
}
