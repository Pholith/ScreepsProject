import { CreepContainer } from "./CreepContainer";

export class Builder extends CreepContainer {

    protected findStructures(): RoomObject[] {
        let targets: RoomObject[] = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets[0]) targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ff9966", lineStyle: "dotted", stroke: "#000000", opacity: 0.2 })
        return targets;
    }

    protected action(): void {
        let targets: ConstructionSite[] = this.getTargets() as ConstructionSite[];

        if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
