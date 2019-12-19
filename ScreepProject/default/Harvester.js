"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Harvester extends CreepContainer_1.CreepContainer {
    findTarget() {
        let targets = this.creep.room.find(FIND_STRUCTURES);
        targets.filter(this.isOkayTarget);
        targets = targets.sort((target) => {
            if (target.structureType == STRUCTURE_EXTENSION)
                return -10;
            if (target.structureType == STRUCTURE_SPAWN)
                return -9;
            if (target.structureType == STRUCTURE_TOWER)
                return -8;
            return 1;
        });
        return targets[0];
    }
    isOkayTarget(obj) {
        let obj2 = obj;
        return (obj2.structureType == STRUCTURE_EXTENSION ||
            obj2.structureType == STRUCTURE_SPAWN ||
            obj2.structureType == STRUCTURE_TOWER)
            &&
                (obj2.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
    }
    action() {
        let target = this.getTarget();
        if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
exports.Harvester = Harvester;
//# sourceMappingURL=Harvester.js.map