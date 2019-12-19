"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreepUtils {
    static numberOfScreeps() {
        let counter = 0;
        for (var _creep in Game.creeps) {
            counter++;
        }
        return counter;
    }
    static numberOfRole(job) {
        let creepsThisJob = new Array();
        for (var Creep in Game.creeps) {
            let forCreep = Game.creeps[Creep];
            if (forCreep.memory.job == job) {
                creepsThisJob.push(forCreep);
            }
        }
        return creepsThisJob.length;
    }
    static numberOfHostiles(room) {
        let creeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.body.map((part) => part.type).includes(ATTACK) ||
                creep.body.map((part) => part.type).includes(RANGED_ATTACK)
        });
        return creeps.length;
    }
}
exports.CreepUtils = CreepUtils;
//# sourceMappingURL=CreepUtils.js.map