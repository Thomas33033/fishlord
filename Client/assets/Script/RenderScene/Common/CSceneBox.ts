
const { ccclass, property } = cc._decorator;

@ccclass
export default class CSceneBox {

    private wdth: number
    private height: number;
    private halfWidth;
    private halfHeight;
    OnInit() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
        this.wdth = screen.width
        this.height = screen.height
        this.halfWidth = screen.width * 0.5
        this.halfHeight = screen.height * 0.5
        console.log(screen.width, screen.height)
    }

    public checkBound(position: cc.Vec2, dir: cc.Vec2): cc.Vec2 {

        if (position.x > this.halfWidth || position.x < -this.halfHeight) {
            dir = new cc.Vec2(-dir.x, dir.y)
        }
        else if (position.y > this.halfHeight || position.y < -this.halfHeight) {
            dir = new cc.Vec2(dir.x, -dir.y)
        }

        return dir
    }

}
