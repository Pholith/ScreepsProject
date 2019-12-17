"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repairer_1 = require("./Repairer");
class WallRepairer extends Repairer_1.Repairer {
    findStructures() {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => target.structureType == STRUCTURE_WALL);
        targets = targets.filter((target) => target.hits && target.hits < target.hitsMax);
        targets.sort((target) => target.hits);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#666699", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 });
        return targets;
    }
}
exports.WallRepairer = WallRepairer;
//# sourceMappingURL=WallRepairer.js.map