/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 11:32:09
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 15:58:51
 * @FilePath: \FBGAME\assets\Battle\Script\games\Player.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ConfirmColorDTO from "./dto/ConfirmColorDTO";
import OpenCardDTO from "./dto/OpenCardDTO";
import SitDownDTO from "./dto/SitDownDTO";
import StartGameDTO from "./dto/StartGameDTO";

//abstract抽象类 不实例只继承
export default abstract class Player{
    /**
     * 玩家ID
     */
    userId: number;
    /**
     * 是否为AI
     */
    ai: boolean;

    /**
     * 名称
     */
    name: string;
    protected constructor(userId: number, name: string){
        this.userId = userId;
        this.name = name;
    }

    /**
     * 坐席
     * @param sitDownDTO
     */
    sitDown(sitDownDTO: SitDownDTO) {
        console.log("SitDown:" + JSON.stringify(sitDownDTO));
        this.onSitDown(sitDownDTO);
    }

    /**
     * 开始游戏
     * @param startGameDTO
     */
    startGame(startGameDTO: StartGameDTO) {
        console.log("StartGame:" + JSON.stringify(startGameDTO));
        this.onStartGame(startGameDTO);
    }

    /**
     * 确认颜色
     * @param confirmColorDTO
     */
     confirmColor(confirmColorDTO: ConfirmColorDTO) {
        console.log("ConfirmColor:" + JSON.stringify(confirmColorDTO));
        this.onConfirmColor(confirmColorDTO)
    }

    /**
     * 显示牌
     * @param openResultDTO
     */
    openResult(openResultDTO: OpenCardDTO) {
        console.log("OpenResult:" + JSON.stringify(openResultDTO));
        this.onOpenResult(openResultDTO);
    }

    protected abstract onSitDown(sitDownDTO: SitDownDTO);
    protected abstract onStartGame(startGameDTO: StartGameDTO);
    protected abstract onConfirmColor(confirmColorDTO: ConfirmColorDTO);
    protected abstract onOpenResult(openCardDTO: OpenCardDTO);
}