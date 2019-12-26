"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const CreepUtils_1 = require("./CreepUtils");
const JobInstances_1 = require("./JobInstances");
const TUNINGS_1 = require("./TUNINGS");
class CreepManager {
    static run() {
        if (Game.time % 3 == 0) {
            this.autoSpawn();
        }
        if (Game.time % 15 == 0) {
            this.printReview();
        }
        //Game.notify()
    }
    static autoSpawn() {
        if (this.choiceJob() != null) {
            this.SpawnBiggestCreep(Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN], this.choiceJob());
        }
        else if (this.choiceJob(true) != null) {
            this.SpawnBiggestCreep(Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN], this.choiceJob(true));
        }
        if (Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].spawning) {
            Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].room.visual.text('🛠️' + Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].spawning.name, Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].pos.x + 1, Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].pos.y, { align: 'left', opacity: 0.8 });
        }
    }
    static printReview() {
        console.log("\n");
        console.log("======= Colony informations =======");
        console.log("Total number of creeps = " + CreepUtils_1.CreepUtils.numberOfScreeps());
        let baseController = Game.spawns[TUNINGS_1.TUNINGS.MOTHER_SPAWN].room.controller;
        console.log("Controller level = " + baseController.level + " (" + (Math.floor(baseController.progress / baseController.progressTotal * 100)) + "%)");
        for (let job of JobInstances_1.jobInstances) {
            console.log("  " + job.getJob() + "\tActual/Needed = " + CreepUtils_1.CreepUtils.numberOfRole(job.getJob()) + "/" + job.numberNeededOfThisJob());
        }
        console.log("  Next job = " + this.choiceJob().getJob());
        console.log("\n");
    }
    static choiceJob(forceTheNeed = false) {
        for (var job of JobInstances_1.jobInstances) {
            if (job.numberNeededOfThisJob(forceTheNeed) > CreepUtils_1.CreepUtils.numberOfRole(job.getJob())) {
                return job;
            }
        }
        return null;
    }
    static SpawnBiggestCreep(spawn, job, superImportant = false) {
        if (spawn.spawning)
            return ERR_BUSY;
        let baseBody = this.getBaseBody(job.getBodyType());
        let totalCost = baseBody.basePrice;
        let bodyParts = baseBody.baseBody;
        // case of 0 harvester
        if (CreepUtils_1.CreepUtils.numberOfRole(Enums_1.Job.HARVESTER) < 1 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) {
            return this.spawnAndUpdateCounter(spawn, bodyParts, job.getJob(), job.getBodyType());
        }
        let i = 0;
        while (spawn.room.energyCapacityAvailable - totalCost > 45) {
            if (spawn.room.energyCapacityAvailable - totalCost > baseBody.partsCost[i % baseBody.availableParts.length]) {
                bodyParts.push(baseBody.availableParts[i % baseBody.availableParts.length]);
                totalCost += baseBody.partsCost[i % baseBody.availableParts.length];
            }
            if (i > bodyParts.length + baseBody.availableParts.length)
                break;
            i++;
        }
        bodyParts = bodyParts.sort();
        bodyParts.reverse();
        return this.spawnAndUpdateCounter(spawn, bodyParts, job.getJob(), job.getBodyType());
    }
    static spawnAndUpdateCounter(spawn, bodyParts, job, bodyType) {
        if (Memory.creepCounter == undefined)
            Memory.creepCounter = 0;
        let newCounter = Memory.creepCounter + 1;
        let name = "Pholith" + newCounter;
        let result = spawn.spawnCreep(bodyParts, name, {
            memory: {
                job: job,
                random: Math.round(Math.random() * 999),
                state: Enums_1.State.HARVEST,
                bodyType: bodyType
            }
        });
        if (result == OK)
            Memory.creepCounter = newCounter;
        else if (result == ERR_NAME_EXISTS)
            Memory.creepCounter = newCounter;
        return result;
    }
    static getBaseBody(bodyType) {
        let basePrice = 0;
        let availableParts = new Array();
        let baseBody = new Array();
        let partsCost = new Array();
        switch (bodyType) {
            case Enums_1.BodyType.FIGHTER:
                baseBody.push(ATTACK);
                baseBody.push(MOVE);
                baseBody.push(TOUGH);
                basePrice += BODYPART_COST.attack + BODYPART_COST.tough + BODYPART_COST.move;
                availableParts.push(ATTACK);
                availableParts.push(MOVE);
                availableParts.push(TOUGH);
                partsCost.push(BODYPART_COST.attack);
                partsCost.push(BODYPART_COST.tough);
                partsCost.push(BODYPART_COST.move);
                break;
            case Enums_1.BodyType.HEALER:
            case Enums_1.BodyType.WORKER:
                baseBody.push(WORK);
                baseBody.push(MOVE);
                baseBody.push(CARRY);
                basePrice += BODYPART_COST.work + BODYPART_COST.carry + BODYPART_COST.move;
                availableParts.push(WORK);
                availableParts.push(CARRY);
                availableParts.push(MOVE);
                partsCost.push(BODYPART_COST.work);
                partsCost.push(BODYPART_COST.carry);
                partsCost.push(BODYPART_COST.move);
                break;
            case Enums_1.BodyType.WORKER_ONE_MOVE:
                baseBody.push(WORK);
                baseBody.push(MOVE);
                baseBody.push(CARRY);
                basePrice += BODYPART_COST.work + BODYPART_COST.carry + BODYPART_COST.move;
                availableParts.push(WORK);
                availableParts.push(CARRY);
                partsCost.push(BODYPART_COST.work);
                partsCost.push(BODYPART_COST.carry);
                break;
            case Enums_1.BodyType.HAULER:
                baseBody.push(MOVE);
                baseBody.push(CARRY);
                basePrice += BODYPART_COST.carry + BODYPART_COST.move;
                availableParts.push(CARRY);
                availableParts.push(MOVE);
                partsCost.push(BODYPART_COST.carry);
                partsCost.push(BODYPART_COST.move);
                break;
            default:
                return null;
        }
        return { baseBody, availableParts, basePrice, partsCost };
    }
}
exports.CreepManager = CreepManager;
//# sourceMappingURL=CreepManager.js.map