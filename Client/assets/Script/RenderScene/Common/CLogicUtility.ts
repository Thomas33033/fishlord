
const { ccclass, property } = cc._decorator;

@ccclass
export default class CLogicUtility {

    //---------------------------------------------------------------------
    // 角度转弧度
    static ConvertDegreesToRadians(degrees: number): number {
        let radians = Math.PI / 180 * degrees;
        return radians;
    }


    //---------------------------------------------------------------------
    // 根据方向向量把对应角度的算出来,垂直向上为0度，向左转动为负，向右为正
    static getAngle(a: cc.Vec2): number {
        let angle: number = cc.pAngle(a, cc.Vec2.UP);

        let va: cc.Vec2 = new cc.Vec2(a.x, a.y);
        let vb: cc.Vec2 = new cc.Vec2(0, 1);
        let vr: number = cc.pCross(va, vb);

        if (vr < 0) {
            angle = -angle;
        }
        return CLogicUtility.ConvertRadiansToDegrees(angle);
    }

    //---------------------------------------------------------------------
    // 弧度转角度
    static ConvertRadiansToDegrees(radians: number): number {
        let degrees = (180 / Math.PI) * radians;
        return degrees;
    }

    //---------------------------------------------------------------------
    //获得两个向量之间的角度
    static GetAngle(targetDir: cc.Vec2, curDir: cc.Vec2) {
        let radians = cc.pAngleSigned(targetDir, curDir)
        return CLogicUtility.ConvertRadiansToDegrees(radians)
    }
}
