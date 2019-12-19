"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Builder extends CreepContainer_1.CreepContainer {
    findTarget() {
        let targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#ff9966", lineStyle: "dotted", stroke: "#000000", opacity: 0.2 });
        return targets[0];
    }
    action() {
        let target = this.getTarget();
        if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map