"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
class Upgrader extends CreepContainer_1.CreepContainer {
    findTarget() {
        return this.creep.room.controller;
    }
    action() {
        let target = this.getTarget();
        if (this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
exports.Upgrader = Upgrader;
//# sourceMappingURL=Upgrader.js.map