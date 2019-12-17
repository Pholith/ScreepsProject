"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Harvester extends CreepContainer_1.CreepContainer {
    findStructures() {
        let targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        targets = targets.sort((target) => {
            if (target.structureType == STRUCTURE_EXTENSION)
                return -10;
            if (target.structureType == STRUCTURE_SPAWN)
                return -9;
            if (target.structureType == STRUCTURE_TOWER)
                return -8;
            return 1;
        });
        return targets;
    }
    action() {
        let targets = this.getTargets();
        if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
exports.Harvester = Harvester;
//# sourceMappingURL=Harvester.js.map