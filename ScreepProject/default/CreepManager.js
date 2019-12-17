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
        console.log("  Next job = " + this.choiceJob());
        console.log("\n");
    }
    static choiceJob(forceTheNeed = false) {
        for (var job of JobInstances_1.jobInstances) {
            if (job.numberNeededOfThisJob(forceTheNeed) > this.numberOfRole(job.getJob())) {
                return job.getJob();
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
    static SpawnBiggestCreep(spawn, job2) {
        if (spawn.spawning)
            return ERR_BUSY;
        if (Memory.creepCounter == undefined)
            Memory.creepCounter = 0;
        let newCounter = Memory.creepCounter + 1;
        let bodyParts = new Array();
        bodyParts.push(MOVE);
        bodyParts.push(WORK);
        bodyParts.push(CARRY);
        let totalCost = 200;
        let name = "Pholith" + newCounter;
        // case of 0 harvester
        if (this.numberOfRole(Enums_1.Job.HARVESTER) < 1 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) {
            let result2 = spawn.spawnCreep(bodyParts, name, {
                memory: {
                    job: Enums_1.Job.HARVESTER,
                    random: Math.round(Math.random() * 999),
                    state: Enums_1.State.HARVEST,
                    bodyType: Enums_1.BodyType.WORKER
                }
            });
            if (result2 == OK)
                Memory.creepCounter = newCounter;
            else if (result2 == ERR_NAME_EXISTS)
                Memory.creepCounter = newCounter;
            return result2;
        }
        let i = 0;
        while (spawn.room.energyCapacityAvailable - totalCost > 45) {
            if (i % 3 == 0) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.work) {
                    bodyParts.push(WORK);
                    totalCost += BODYPART_COST.work;
                }
            }
            else if (i % 3 == 1) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.move) {
                    bodyParts.push(MOVE);
                    totalCost += BODYPART_COST.move;
                }
            }
            else if (i % 3 == 2) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.carry) {
                    bodyParts.push(CARRY);
                    totalCost += BODYPART_COST.carry;
                }
            }
            if (i > bodyParts.length)
                break;
            i++;
        }
        bodyParts = bodyParts.sort();
        let result = spawn.spawnCreep(bodyParts, name, {
            memory: {
                job: job2,
                random: Math.round(Math.random() * 999),
                state: Enums_1.State.HARVEST,
                bodyType: Enums_1.BodyType.WORKER
            }
        });
        if (result == OK)
            Memory.creepCounter = newCounter;
        else if (result == ERR_NAME_EXISTS)
            Memory.creepCounter = newCounter;
        return result;
    }
}
exports.CreepManager = CreepManager;
//# sourceMappingURL=CreepManager.js.map