import CLogicUtility from "./Common/CLogicUtility";
import RenderScene from "./RenderScene";

// Learn TypeScript:
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private mDir: cc.Vec2;
    private mSpeed: number;
    private isPlay: boolean
    renderScene: RenderScene
    start() {
        let animation: cc.Animation = this.getComponent(cc.Animation)
        animation.play(animation.getClips()[0].name)
    }

    OnInit(scene: RenderScene, dir: cc.Vec2, pos: cc.Vec2, speed: number) {
        this.renderScene = scene
        this.mDir = dir
        this.mSpeed = speed
        this.node.position = pos
        this.isPlay = true

    }

    onCollisionEnter(other, self) {
        console.log(other.name)
        this.node.destroy();
    }

    update(dt) {
        if (this.isPlay) {
            let bb = new cc.Vec2(this.mDir.x * this.mSpeed, this.mDir.y * this.mSpeed)
            let position = this.node.position.add(bb)
            this.node.position = position
            let newDir = this.renderScene.sceneBox.checkBound(position, this.mDir)
            this.ChangeDir(newDir)
        }
    }

    ChangeDir(newDir: cc.Vec2) {
        if (newDir != this.mDir) {
            let radians = cc.pAngleSigned(this.mDir, newDir)
            let degrees = (180 / Math.PI) * radians
            this.node.rotation = CLogicUtility.getAngle(newDir)
            this.mDir = newDir
        }
    }






}
