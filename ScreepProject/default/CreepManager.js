"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const JobInstances_1 = require("./JobInstances");
class CreepManager {
    static run() {
        this.autoSpawn();
        if (Game.time % 20 == 0) {
            this.printReview();
        }
        //Game.notify()
    }
    static autoSpawn() {
        if (this.choiceJob() != null) {
            this.SpawnBiggestCreep(Game.spawns["Spawn1"], this.choiceJob());
        }
        else if (this.choiceJob(true) != null) {
            this.SpawnBiggestCreep(Game.spawns["Spawn1"], this.choiceJob(true));
        }
        if (Game.spawns["Spawn1"].spawning) {
            Game.spawns['Spawn1'].room.visual.text('🛠️' + Game.spawns['Spawn1'].spawning.name, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
        }
    }
    static printReview() {
        console.log("\n");
        console.log("======= Colony informations =======");
        console.log("Total number of creeps = " + this.numberOfScreeps());
        let baseController = Game.spawns["Spawn1"].room.controller;
        console.log("Controller level = " + baseController.level + " (" + (Math.floor(baseController.progress / baseController.progressTotal * 100)) + "%)");
        for (let job of JobInstances_1.jobInstances) {
            console.log("  " + job.getJob() + "\tActual/Needed = " + this.numberOfRole(job.getJob()) + "/" + job.numberNeededOfThisJob());
        }
        console.log("  Next job = " + this.choiceJob().getJob());
        console.log("\n");
    }
    static choiceJob(forceTheNeed = false) {
        for (var job of JobInstances_1.jobInstances) {
            if (job.numberNeededOfThisJob(forceTheNeed) > this.numberOfRole(job.getJob())) {
                return job;
            }
        }
        return null;
    }
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
    static SpawnBiggestCreep(spawn, job) {
        if (spawn.spawning)
            return ERR_BUSY;
        let baseBody = this.getBaseBody(job.getBodyType());
        let totalCost = baseBody.basePrice;
        let bodyParts = baseBody.baseBody;
        // case of 0 harvester
        if (this.numberOfRole(Enums_1.Job.HARVESTER) < 1 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) {
            return this.spawnAndUpdateCounter(spawn, bodyParts, job.getJob(), job.getBodyType());
        }
        let i = 0;
        while (spawn.room.energyCapacityAvailable - totalCost > 45) {
            console.log(spawn.room.energyCapacityAvailable - totalCost + " " + baseBody.partsCost[i % baseBody.availableParts.length]);
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
                availableParts.push(TOUGH);
                partsCost.push(BODYPART_COST.work);
                partsCost.push(BODYPART_COST.carry);
                partsCost.push(BODYPART_COST.move);
                break;
            case Enums_1.BodyType.WORKER_ONE_MOVE:
            case Enums_1.BodyType.HAULER:
            default:
                return null;
        }
        return { baseBody, availableParts, basePrice, partsCost };
    }
}
exports.CreepManager = CreepManager;
//# sourceMappingURL=CreepManager.js.map