import { CreepContainer } from "./CreepContainer";

export class Harvester extends CreepContainer {

    protected findTarget(): RoomObject {
        let targets: Structure[] = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter(this.isOkayTarget);
        targets = targets.sort((target) => {
            if (target.structureType == STRUCTURE_EXTENSION) return -10;
            if (target.structureType == STRUCTURE_SPAWN) return -9;
            if (target.structureType == STRUCTURE_TOWER) return -8;
            return 1;
        });
        return targets[0];
    }

    protected isOkayTarget(obj: RoomObject): boolean {
        let obj2: Structure = obj as Structure;
        if (obj2 == null) return false;
        if (!(obj2.structureType == STRUCTURE_EXTENSION ||
            obj2.structureType == STRUCTURE_SPAWN ||
            obj2.structureType == STRUCTURE_TOWER)) return false;
        return (obj2 as any).store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }

    protected action(): void {
        let target: Structure = this.getTarget() as Structure;

        let result: ScreepsReturnCode = this.creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_FULL) this.getTarget(true);
        if (result == ERR_NOT_IN_RANGE) this.creep.moveTo(target);
    }
}