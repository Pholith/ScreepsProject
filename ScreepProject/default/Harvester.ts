import { CreepContainer } from "./CreepContainer";

export class Harvester extends CreepContainer {

    protected findStructures(): Structure[] {
        let targets: Structure[] = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        targets = targets.sort((target) => {
            if (target.structureType == STRUCTURE_EXTENSION) return -3;
            if (target.structureType == STRUCTURE_SPAWN) return -2;
            return 1;
        });
        return targets;
    }

    protected action(): void {
        let targets: Structure[] = this.getTargets() as Structure[];

        if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}