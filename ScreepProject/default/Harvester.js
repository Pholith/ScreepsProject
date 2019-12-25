"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Harvester extends CreepContainer_1.CreepContainer {
    findTarget() {
        let targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter(this.isOkayTarget);
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
        if (obj2 == null)
            return false;
        if (!(obj2.structureType == STRUCTURE_EXTENSION ||
            obj2.structureType == STRUCTURE_SPAWN ||
            obj2.structureType == STRUCTURE_TOWER))
            return false;
        return obj2.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
    action() {
        let target = this.getTarget();
        let result = this.creep.transfer(target, RESOURCE_ENERGY);
        if (result == ERR_FULL)
            this.getTarget(true);
        if (result == ERR_NOT_IN_RANGE)
            this.creep.moveTo(target, { maxRooms: 0 });
    }
}
exports.Harvester = Harvester;
//# sourceMappingURL=Harvester.js.map