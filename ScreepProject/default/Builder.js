"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Builder extends CreepContainer_1.CreepContainer {
    findStructures() {
        let targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ff9966", lineStyle: "dotted", stroke: "#000000", opacity: 0.2 });
        return targets;
    }
    action() {
        let targets = this.getTargets();
        if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map