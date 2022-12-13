import Config from "./config/Config";
import ConfirmColorDTO from "./dto/ConfirmColorDTO";
import MoveCardDTO from "./dto/MoveCardDTO";
import MoveResultDTO from "./dto/MoveResultDTO";
import OpenCardDTO from "./dto/OpenCardDTO";
import SitDownDTO from "./dto/SitDownDTO";
import StartGameDTO from "./dto/StartGameDTO";
import FireKit from "./eventfire/FireKit";
import Player from "./Player";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 11:37:14
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 15:56:58
 * @FilePath: \FBGAME\assets\Battle\Script\games\FBGameEngine.ts
 * @Description: FBGame游戏引擎
 */
export default class FBGameEngine{
   /**
    * 最多牌数量
    */
   static MAX_CARD: number = 16;
   /**
    * 最大椅子个数
    */
   static MAX_CHAIR: number = 2;
   /**
    * 无效的牌
    */
   static NONE_CARD: number = 0xF0;
   /**
    * 未知的牌，未翻牌
    */
   static DARK_CARD: number = 0xE0;
   /**
    * 颜色
    */
   static BLUE: number = 0x00;
   /**
    * 红色
    */
   static RED: number = 0x01;
   /**
    * 未知牌颜色标识
    */
   static DARK: number = 0x0E;
   /**
    * 无效牌颜色标识
    */
   static NONE: number = 0x0F;
   /**
    * 无效的椅子
    */
   static INVALID_CHAIR: number = 0xFF;
   /**
    * 无效的位置
    */
   static INVALID_INDEX: number = 0xFF;

   private players:{[key:number]:Player} = {};
   private chairColors:{[key:number]:number} = {};

   /**
    * 游戏动物棋牌
    */
    private cards: number[] = [
        // 鼠    猫    狗    狼    豹    虎    狮    象
        0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, // 蓝色
        0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17  // 红色
    ];

   /**
    * 当前桌面的牌
    */
   private currCards: number[] = [
      FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD,
      FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD,
      FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD,
      FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD, FBGameEngine.DARK_CARD];
   /**
    * 当前操作的玩家 0 / 1
    */
   private currChair: number;
   
   constructor(){
      this.initFire(); //初始化事件驱动
   }

   initFire(){
      FireKit.init(Config.HUMAN_FIRE);
      FireKit.init(Config.AI_FIRE);
   }

   /**
    * @description: 玩家进入游戏
    * @return {*}
    */
   enter(player:Player){
      let chair = this.assignChair();
      if(chair != FBGameEngine.INVALID_CHAIR){
         this.players[chair] = player;
         this.sendSitDown(chair,player);

         //先暂时这样先开始游戏
         this.startGame();
         //如果还有空位创建个机器人否则开始游戏
         if(this.assignChair() != FBGameEngine.INVALID_CHAIR){
            
         }else{
            this.startGame();
         }
      }
   }

   /**
    * 给所有玩家发送玩家坐下的信息
    * @param chair
    * @param player
    */
    private sendSitDown(chair: number, player: Player) {
        for (let key in this.players) {
            this.players[key].sitDown(new SitDownDTO(player.userId, chair, player.name));
        }
    }

   /**
    * @description: 分配椅子
    * @return {*}
    */         
   private assignChair():number{
      for (let index = 0; index < FBGameEngine.MAX_CHAIR; index++) {
         if(this.players[index] == null)
            return index;
         
      }
      return FBGameEngine.INVALID_CHAIR;
   }
   
   /**开始游戏*/
   startGame(){
      this.cards = this.shuffle();//随机洗牌
      console.log('洗牌后的cards : ' + this.cards);
      this.currChair = Math.floor(Math.random() * FBGameEngine.MAX_CHAIR - 1);//随机生成第一个椅子
      this.currChair = 0;//暂定是自己
      this.sendStartGame();
   }
   private shuffle():number[]{
      this.cards.sort(function(){
         return Math.random() - 0.5
      })
      return this.cards;
   }

   /**
    * 发送开始游戏
    */
    private sendStartGame() {
      for (let key in this.players) {
         this.players[key].startGame(new StartGameDTO(this.currChair, this.currCards));
      }
    }

    /**开牌操作*/
    open(openCardDTO:OpenCardDTO){
      let index = openCardDTO.index;
      let chair = openCardDTO.chair;

      if(this.currCards[index] == FBGameEngine.DARK_CARD){
         let card = this.cards[index];

         let arr = Object.keys(this.chairColors);
         if(arr.length == 0){
            for (let index = 0; index < FBGameEngine.MAX_CHAIR; index++) {
               if(index == chair){
                  this.chairColors[chair] = (card >> 4);
                  this.sendConfirmColor(chair,card >> 4);
               }else{
                  this.chairColors[index] = FBGameEngine.RED ? FBGameEngine.BLUE : FBGameEngine.RED;
                  this.sendConfirmColor(index, (card >> 4) == FBGameEngine.RED ? FBGameEngine.BLUE : FBGameEngine.RED); 
               }
            }
         }
         this.currCards[index] = card;
         this.sendOpenResult(chair, index, card);
      }
    }

    private sendConfirmColor(chair:number,color:number){
      for (let key in this.players) {
         this.players[key].confirmColor(new ConfirmColorDTO(chair, color));
      }
    }

   /**
    * 发送显示牌
    * @param chair
    * @param index
    * @param card
    */
   private sendOpenResult(chair: number, index: number, card: number) {
      for (let key in this.players) {
            this.players[key].openResult(new OpenCardDTO(chair, index, card));
      }
   }

   /**
    * 是否可以移动 范围在一格
    * @param from  当前
    * @param to    目标
    * @param cards 牌
    */
    public canMove(from: number, to: number, cards: number[]): boolean {
        let iRow = Math.floor(from / 4);
        let iCol = from % 4;
        let jRow = Math.floor(to / 4);
        let jCol = to % 4;
        if (cards[from] == FBGameEngine.DARK_CARD
            || cards[to] == FBGameEngine.DARK_CARD
            || (cards[from] >> 4) == (cards[to] >> 4)) {
            return false;
        }
        return (iRow == jRow && Math.abs(iCol - jCol) == 1) || (iCol == jCol && Math.abs(iRow - jRow) == 1);
    }

   /**
    * 移动牌
    * @param moveCardDTO
    */
    move(moveCardDTO: MoveCardDTO) {
        console.log("MoveCard:" + JSON.stringify(moveCardDTO));
        let fromIndex = moveCardDTO.fromIndex;
        let toIndex = moveCardDTO.toIndex;
        let fromCard = this.currCards[fromIndex];   // 当前位置的牌
        let toCard = this.currCards[toIndex];   // 下一个位置的牌
        let fromV = (fromCard & 0x0F);
        let nextV = (toCard & 0x0F);
        let fromC = fromCard >> 4;
        let toC = toCard >> 4;
        if (fromC > 1 || toC == (FBGameEngine.DARK_CARD >> 4)) {  // 当前位置不是正常的牌，或者下一个位置是未翻开的牌
            console.log("异常操作");
            return;
        }
        this.currCards[fromIndex] = FBGameEngine.NONE_CARD;           // 当前位置变成空
        if (toC == (FBGameEngine.NONE_CARD >> 4)) {                   // 下个位置是空位
            this.currCards[toIndex] = fromCard;
        } else { // 非空未知
            if (fromV > nextV) {
                if (fromV == 7 && nextV == 0) { // 大象 和 老鼠
                    this.currCards[toIndex] = toCard;
                } else {
                    this.currCards[toIndex] = fromCard;
                }
            }
            if (fromV == nextV) {
                this.currCards[toIndex] = FBGameEngine.NONE_CARD;
            }
            if (fromV < nextV) {
                if (fromV == 0 && nextV == 7) { // 老鼠 和 大象
                    this.currCards[toIndex] = fromCard;
                } else {
                    this.currCards[toIndex] = toCard;
                }
            }
        }
        let result: number;
        if (this.currCards[toIndex] == FBGameEngine.NONE_CARD) {
            result = 0;
        } else if (this.currCards[toIndex] == fromCard) {
            result = 1;
        } else {
            result = -1;
        }
        this.sendMoveResult(moveCardDTO.chair, fromIndex, this.currCards[fromIndex], toIndex, this.currCards[toIndex], result);
        if (this.checkWin() != -1) {
            this.sendEndGame();
        } else {
            this.sendOperationNotify();
        }
    }

   /**
     * 发送移动结果
     * @param chair
     * @param fromIndex
     * @param fromCard
     * @param toIndex
     * @param toCard
     * @param result
     */
    private sendMoveResult(chair: number, fromIndex: number, fromCard: number, toIndex: number, toCard: number, result: number) {
        for (let key in this.players) {
            this.players[key].moveResult(new MoveResultDTO(chair, fromIndex, fromCard, toIndex, toCard, result));
        }
    }

    private checkWin(){
      return 1;
    }

    private sendEndGame(){

    }

      /**
     * 发送玩家操作通知
     */
    private sendOperationNotify() {
        this.currChair = this.nextChair();  // 获取下一个操作的椅子
        for (let key in this.players) {
            
        }
    }
   /**
     * 获取下一个操作的玩家
     */
    private nextChair(): number {
        return (this.currChair + 1) % FBGameEngine.MAX_CHAIR;
    }
}