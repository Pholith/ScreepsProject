"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Repairer extends CreepContainer_1.CreepContainer {
    findTarget() {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter(this.isOkayTarget);
        targets.sort((t1, t2) => (t1.hits < t2.hits) ? -1 : 1);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ccffff", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 });
        return targets[0];
    }
    isOkayTarget(obj) {
        let obj2 = obj;
        return (obj2.structureType == STRUCTURE_RAMPART ||
            obj2.structureType == STRUCTURE_ROAD ||
            obj2.structureType == STRUCTURE_TOWER) &&
            obj2.hits < obj2.hitsMax;
    }
    action() {
        let target = this.getTarget();
        if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
exports.Repairer = Repairer;
//# sourceMappingURL=Repairer.js.map