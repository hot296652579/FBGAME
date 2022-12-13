/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 15:52:59
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 15:53:22
 * @FilePath: \FBGAME\assets\Battle\Script\games\HumanPlayer.ts
 * @Description: 玩家类
 */
import { FBGameEventName } from "../configs/FBGameEventName";
import Config from "./config/Config";
import ConfirmColorDTO from "./dto/ConfirmColorDTO";
import MoveResultDTO from "./dto/MoveResultDTO";
import OpenCardDTO from "./dto/OpenCardDTO";
import SitDownDTO from "./dto/SitDownDTO";
import StartGameDTO from "./dto/StartGameDTO";
import EventOnFire from "./eventfire/EventOnFire";
import FireKit from "./eventfire/FireKit";
import FBGameEvent from "./events/FBGameEvent";
import Player from "./Player";
import ConfirmColorVO from "./vo/ConfirmColorVO";
import MoveResultVO from "./vo/MoveResultVO";
import OpenCardVO from "./vo/OpenCardVO";
import SitDownVO from "./vo/SitDownVO";
import StartGameVO from "./vo/StartGameVO";

export default class HumanPlayer extends Player{
    constructor(userId:number,name:string){
        super(userId,name);
        this.ai = false;
    }

    protected onSitDown(sitDownDTO: SitDownDTO) {
        // throw new Error("Method not implemented.");
        FireKit.use(Config.HUMAN_FIRE).emit(FBGameEvent.SIT_DOWN,<SitDownVO>sitDownDTO);
    }

    protected onStartGame(startGameDTO: StartGameDTO) {
        // throw new Error("Method not implemented.");
        FireKit.use(Config.HUMAN_FIRE).emit(FBGameEvent.START_GAME,<StartGameVO>startGameDTO);
    }

    protected onConfirmColor(confirmColorDTO: ConfirmColorDTO) {
        FireKit.use(Config.HUMAN_FIRE).emit(FBGameEvent.CONFIRM_COLOR,<ConfirmColorVO>confirmColorDTO);
    }

    protected onOpenResult(confirmColorDTO: OpenCardDTO) {
        FireKit.use(Config.HUMAN_FIRE).emit(FBGameEvent.OPEN_RESULT,<OpenCardVO>confirmColorDTO);
    }

    protected onMoveResult(moveResultDTO: MoveResultDTO) {
        FireKit.use(Config.HUMAN_FIRE).emit(FBGameEvent.MOVE_RESULT,<MoveResultVO>moveResultDTO);
    }
}