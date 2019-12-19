import { Repairer } from "./Repairer";

export class WallRepairer extends Repairer {

    protected isOkayTarget(obj: RoomObject): boolean {
        let obj2: StructureWall = obj as StructureWall;
        return obj2 != null && obj2.structureType == STRUCTURE_WALL &&
            obj2.hits && obj2.hits < obj2.hitsMax;
    }

    protected findTarget(): RoomObject {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter(this.isOkayTarget);
        targets.sort((t1, t2) => (t1.hits < t2.hits) ? -1 : 1);
        if (targets[0]) targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#666699", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 })
        return targets [0];
    }
}
