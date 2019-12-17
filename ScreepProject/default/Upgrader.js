"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Upgrader extends CreepContainer_1.CreepContainer {
    findStructures() {
        return [this.creep.room.controller];
    }
    action() {
        let targets = this.getTargets();
        if (this.creep.upgradeController(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
exports.Upgrader = Upgrader;
//# sourceMappingURL=Upgrader.js.map