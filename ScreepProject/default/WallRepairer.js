"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repairer_1 = require("./Repairer");
const TUNINGS_1 = require("./TUNINGS");
class WallRepairer extends Repairer_1.Repairer {
    isOkayTarget(obj) {
        let obj2 = obj;
        return obj2 != null && obj2.structureType == STRUCTURE_WALL && obj.room == TUNINGS_1.TUNINGS.getMotherSpawn().room &&
            obj2.hits && obj2.hits < obj2.hitsMax;
    }
    findTarget() {
        var targets = this.creep.room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => this.isOkayTarget(target));
        targets.sort((t1, t2) => (t1.hits < t2.hits) ? -1 : 1);
        if (targets[0])
            targets[0].room.visual.rect(targets[0].pos.x - 0.5, targets[0].pos.y - 0.5, 1, 1, { fill: "#666699", lineStyle: "dotted", stroke: "#000000", opacity: 0.3 });
        return targets[0];
    }
}
exports.WallRepairer = WallRepairer;
//# sourceMappingURL=WallRepairer.js.map