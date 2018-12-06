import RenderTurret from "./RenderTurret";
import RenderBullet from "./RenderBullet";
import CLogicUtility from "./Common/CLogicUtility";
import CSceneBox from "./Common/CSceneBox";



const { ccclass, property } = cc._decorator;

@ccclass
export default class RenderScene extends cc.Component {

    private turretRender: RenderTurret
    private bullet: RenderBullet
    private curDir: cc.Vec2 = cc.Vec2.UP
    //场景盒子
    sceneBox: CSceneBox

    start() {
        this.sceneBox = new CSceneBox()
        this.sceneBox.OnInit()

        this.turretRender = cc.find("RenderTurret", this.node).getComponent(RenderTurret)
        this.bullet = cc.find("bullet", this.node).getComponent(RenderBullet)

        this.node.on<cc.Touch>(cc.Node.EventType.TOUCH_START, (e) => {
            let screenPos = this.node.parent.convertToNodeSpaceAR(e.getLocation());
            this.Shut(screenPos)
        }, this);
    }

    Shut(screenPos: cc.Vec2) {

        let targetDir = cc.pNormalize(screenPos.sub(this.turretRender.node.position))

        let degrees = CLogicUtility.GetAngle(targetDir, this.curDir)
        this.turretRender.node.rotation += degrees
        this.curDir = targetDir

        let node = cc.instantiate(this.bullet.node)
        let bullet: RenderBullet = node.getComponent(RenderBullet)
        bullet.node.parent = this.node
        bullet.node.active = true;
        bullet.node.rotation = this.turretRender.node.rotation
        let pos = this.curDir.mul(50).add(this.turretRender.node.position)
        bullet.OnInit(this, this.curDir, pos, 10)
    }




}
