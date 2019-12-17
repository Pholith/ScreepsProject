"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Repairer extends CreepContainer_1.CreepContainer {
    findStructures() {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => target.structureType == STRUCTURE_RAMPART ||
            target.structureType == STRUCTURE_ROAD ||
            target.structureType == STRUCTURE_TOWER);
        targets = targets.filter((target) => target.hits < target.hitsMax);
        targets.sort((t1, t2) => (t1.hits < t2.hits) ? -1 : 1);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ccffff", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 });
        return targets;
    }
    action() {
        let targets = this.getTargets();
        if (this.creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
exports.Repairer = Repairer;
//# sourceMappingURL=Repairer.js.map