/*
 * @Description: 
 * @Author: Super_Javan
 * @Date: 2022-12-02 15:07:23
 * @LastEditTime: 2022-12-02 16:54:24
 * @LastEditors: Super_Javan
 */
 export default class TweenUtil {

    /**
     * 水平翻转（卡片翻转）
     * @param node 节点
     * @param duration 总时长
     * @param onComplete 完成回调
     */
    public static flip(node: cc.Node, duration: number,onComplete?: Function): Promise<void> {
        return new Promise<void>(res => {
            const _tween = cc.tween,
                time = duration / 2,
                scaleX = node.scaleX,
                skewY = scaleX > 0 ? 20 : -20;

            _tween(node)
                .parallel(
                    _tween().to(time, { scaleX: 0 }, { easing: 'quadIn' }),
                    _tween().to(time, { skewY: -skewY }, { easing: 'quadOut' }),
                )
                .call(() => {
                })
                .parallel(
                    _tween().to(time, { scaleX: -scaleX }, { easing: 'quadOut' }),
                    _tween().to(time, { skewY: 0 }, { easing: 'quadIn' }),
                )
                .call(() => {
                    node.scale= 1;
                    onComplete && onComplete();
                    res();
                })
                .start();
        });
    }

}
