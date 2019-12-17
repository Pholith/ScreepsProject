"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
class JobContainer {
}
exports.JobContainer = JobContainer;
class JobHarvester extends JobContainer {
    getJob() { return Enums_1.Job.HARVESTER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        if (Game.spawns["Spawn1"].room.energyCapacityAvailable > Game.spawns["Spawn1"].room.energyAvailable)
            return 4;
        return 1;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobHarvester = JobHarvester;
class JobBuilder extends JobContainer {
    getJob() { return Enums_1.Job.BUILDER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        if (Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES).length > 1) {
            if (forceTheNeed)
                return Infinity;
            return 3;
        }
        return 0;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobBuilder = JobBuilder;
class JobRepairer extends JobContainer {
    getJob() { return Enums_1.Job.REPAIRER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        // TO IMPLEMENTE
        return 2;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobRepairer = JobRepairer;
class JobWallRepairer extends JobContainer {
    getJob() { return Enums_1.Job.WALL_REPAIRER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        // TO IMPLEMENTE
        if (forceTheNeed)
            return Infinity;
        return 2;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobWallRepairer = JobWallRepairer;
class JobUpgrader extends JobContainer {
    getJob() { return Enums_1.Job.UPGRADER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        if (forceTheNeed)
            return 3;
        return 2;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobUpgrader = JobUpgrader;
class JobProtector extends JobContainer {
    getJob() { return Enums_1.Job.PROTECTOR; }
    numberNeededOfThisJob(forceTheNeed = false) {
        if (Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.body.map((part) => part.type).includes(ATTACK) ||
                creep.body.map((part) => part.type).includes(RANGED_ATTACK)
        })[0])
            return 2;
        return 0;
    }
    getBodyType() {
        return Enums_1.BodyType.FIGHTER;
    }
}
exports.JobProtector = JobProtector;
//# sourceMappingURL=JobContainer.js.map