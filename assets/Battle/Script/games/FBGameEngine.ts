import Config from "./config/Config";
import SitDownDTO from "./dto/SitDownDTO";
import StartGameDTO from "./dto/StartGameDTO";
import FireKit from "./eventfire/FireKit";
import Player from "./Player";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 11:37:14
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 18:43:57
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
   private chirColors:{[key:number]:number} = {};

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
      this.currChair = Math.floor(Math.random() * FBGameEngine.MAX_CHAIR - 1);//随机生成第一个椅子
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
}