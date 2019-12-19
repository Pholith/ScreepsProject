"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
const Enums_1 = require("./Enums");
class Protector extends CreepContainer_1.CreepContainer {
    findTarget() {
        let closestHostile = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.body.map((part) => part.type).includes(ATTACK) ||
                creep.body.map((part) => part.type).includes(RANGED_ATTACK)
        });
        return closestHostile;
    }
    updateState() {
        this.creep.memory.state = Enums_1.State.ACTION;
    }
    action() {
        let target = this.getTarget();
        if (this.creep.attack(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
exports.Protector = Protector;
//# sourceMappingURL=Protector.js.map