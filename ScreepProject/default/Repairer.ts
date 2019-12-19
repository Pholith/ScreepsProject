import { CreepContainer } from "./CreepContainer";

export class Repairer extends CreepContainer {

    protected findTarget(): RoomObject {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter(this.isOkayTarget);
        targets.sort((t1, t2) => (t1.hits < t2.hits) ? -1 : 1);
        if (targets[0]) targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ccffff", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 })
        return targets[0];
    }
    protected isOkayTarget(obj: RoomObject): boolean {
        let obj2: Structure = obj as Structure
        return (obj2.structureType == STRUCTURE_RAMPART ||
            obj2.structureType == STRUCTURE_ROAD ||
            obj2.structureType == STRUCTURE_TOWER) &&
            obj2.hits < obj2.hitsMax;
    }

    protected action(): void {
        let target: Structure = this.getTarget() as Structure;

        if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
