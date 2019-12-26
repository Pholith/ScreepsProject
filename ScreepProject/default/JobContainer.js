"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const CreepUtils_1 = require("./CreepUtils");
const TUNINGS_1 = require("./TUNINGS");
class JobContainer {
}
exports.JobContainer = JobContainer;
class JobHarvester extends JobContainer {
    getJob() { return Enums_1.Job.HARVESTER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        if (Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].room.energyCapacityAvailable > Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].room.energyAvailable)
            return 4;
        return 1;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobHarvester = JobHarvester;
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
        return CreepUtils_1.CreepUtils.numberOfHostiles(Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].room);
    }
    getBodyType() {
        return Enums_1.BodyType.FIGHTER;
    }
}
exports.JobProtector = JobProtector;
class JobBuilder extends JobContainer {
    getJob() { return Enums_1.Job.BUILDER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        let targets = TUNINGS_1.TUNINGS.getMotherSpawn().room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length == 0)
            return 0;
        return Math.floor(targets.length / TUNINGS_1.TUNINGS.TARGET_PER_WORKER) + 1;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobBuilder = JobBuilder;
class JobRepairer extends JobContainer {
    getJob() { return Enums_1.Job.REPAIRER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        let targets = TUNINGS_1.TUNINGS.getMotherSpawn().room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => target != null && (target.structureType == STRUCTURE_RAMPART ||
            target.structureType == STRUCTURE_ROAD ||
            target.structureType == STRUCTURE_TOWER) &&
            target.hits < target.hitsMax);
        if (targets.length == 0)
            return 0;
        return Math.floor(targets.length / TUNINGS_1.TUNINGS.TARGET_PER_WORKER) + 1;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobRepairer = JobRepairer;
class JobWallRepairer extends JobContainer {
    getJob() { return Enums_1.Job.WALL_REPAIRER; }
    numberNeededOfThisJob(forceTheNeed = false) {
        let targets = TUNINGS_1.TUNINGS.getMotherSpawn().room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => target != null && target.structureType == STRUCTURE_WALL && target.hits < target.hitsMax);
        if (targets.length == 0)
            return 0;
        return Math.floor(targets.length / TUNINGS_1.TUNINGS.TARGET_PER_WORKER) + 1;
    }
    getBodyType() {
        return Enums_1.BodyType.WORKER;
    }
}
exports.JobWallRepairer = JobWallRepairer;
//# sourceMappingURL=JobContainer.js.map