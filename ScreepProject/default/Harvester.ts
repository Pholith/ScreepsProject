import { CreepContainer } from "./CreepContainer";

export class Harvester extends CreepContainer {

    protected findTarget(): Structure {
        let targets: Structure[] = this.creep.room.find(FIND_STRUCTURES);
        targets.filter(this.isOkayTarget);
        targets = targets.sort((target) => {
            if (target.structureType == STRUCTURE_EXTENSION) return -10;
            if (target.structureType == STRUCTURE_SPAWN) return -9;
            if (target.structureType == STRUCTURE_TOWER) return -8;
            return 1;
        });
        return targets[0];
    }

    protected isOkayTarget(obj: RoomObject): boolean {
        let obj2 : Structure = obj as Structure;
        return  (obj2.structureType == STRUCTURE_EXTENSION ||
                obj2.structureType == STRUCTURE_SPAWN ||
                obj2.structureType == STRUCTURE_TOWER)
            &&
            ((obj2 as any).store.getFreeCapacity(RESOURCE_ENERGY) > 0);
    }

    protected action(): void {
        let target: Structure = this.getTarget() as Structure;

        if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}