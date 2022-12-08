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

    protected abstract onSitDown(sitDownDTO: SitDownDTO);
    protected abstract onStartGame(startGameDTO: StartGameDTO);
}