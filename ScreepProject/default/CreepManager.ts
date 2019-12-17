import { Job, BodyType, State } from "./Enums";
import { CreepUtils } from "./CreepUtils";
import { jobInstances } from "./JobInstances";
import { fork } from "cluster";

export class CreepManager {
    public static run() {
        this.autoSpawn();

        if (Game.time % 20 == 0) {
            this.printReview();
        }
        //Game.notify()
    }

    public static autoSpawn() : void {
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

    public static printReview() {
        console.log("\n");
        console.log("======= Colony informations =======");
        console.log("Total number of creeps = " + this.numberOfScreeps());
        let baseController: StructureController = Game.spawns["Spawn1"].room.controller;
        console.log("Controller level = " + baseController.level + " (" + (Math.floor(baseController.progress / baseController.progressTotal * 100)) + "%)");
        for (let job of jobInstances) {
            console.log("  " + job.getJob() + "\tActual/Needed = " + this.numberOfRole(job.getJob()) + "/" + job.numberNeededOfThisJob());
        }
        console.log("  Next job = " + this.choiceJob());
        console.log("\n");
    }

    public static choiceJob(forceTheNeed: boolean = false): Job {
        for (var job of jobInstances) {
            if (job.numberNeededOfThisJob(forceTheNeed) > this.numberOfRole(job.getJob())) {
                return job.getJob();
            }
        }
        return null;
    }

    public static numberOfScreeps(): number {
        let counter : number = 0;
        for (var _creep in Game.creeps) {
            counter ++;
        }
        return counter;
    }

    public static numberOfRole(job: Job): number {
        let creepsThisJob = new Array<Creep>();
        for (var Creep in Game.creeps) {
            let forCreep = Game.creeps[Creep];
            if (forCreep.memory.job == job) {
                creepsThisJob.push(forCreep);
            }
        }
        return creepsThisJob.length;
    }
    public static SpawnBiggestCreep(spawn: StructureSpawn, job2: Job): ScreepsReturnCode {
        if (spawn.spawning) return ERR_BUSY;

        if (Memory.creepCounter == undefined) Memory.creepCounter = 0;
        let newCounter: number = Memory.creepCounter + 1;

        let bodyParts: Array<BodyPartConstant> = new Array();
        bodyParts.push(MOVE);
        bodyParts.push(WORK);
        bodyParts.push(CARRY);
        let totalCost: number = 200;
        let name = "Pholith" + newCounter;

        // case of 0 harvester
        if (this.numberOfRole(Job.HARVESTER) < 1 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) {
            let result2: ScreepsReturnCode = spawn.spawnCreep(bodyParts, name,
                {
                    memory: {
                        job: Job.HARVESTER,
                        random: Math.round(Math.random() * 999),
                        state: State.HARVEST,
                        bodyType: BodyType.WORKER
                    }
                });
            if (result2 == OK) Memory.creepCounter = newCounter;
            else if (result2 == ERR_NAME_EXISTS) Memory.creepCounter = newCounter;
            
            return result2;
        }

        let i: number = 0
        while (spawn.room.energyCapacityAvailable - totalCost > 45) {
            if (i % 3 == 0) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.work) {
                    bodyParts.push(WORK);
                    totalCost += BODYPART_COST.work;
                }
            } else if (i % 3 == 1) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.move) {
                    bodyParts.push(MOVE);
                    totalCost += BODYPART_COST.move;
                }
            } else if (i % 3 == 2) {
                if (spawn.room.energyCapacityAvailable - totalCost > BODYPART_COST.carry) {
                    bodyParts.push(CARRY);
                    totalCost += BODYPART_COST.carry;
                }
            }
            if (i > bodyParts.length) break;
            i++;
        }
        bodyParts = bodyParts.sort();
        let result: ScreepsReturnCode = spawn.spawnCreep(bodyParts, name,
            {
                memory: {
                    job: job2,
                    random: Math.round(Math.random() * 999),
                    state: State.HARVEST,
                    bodyType: BodyType.WORKER
                }
            });
        if (result == OK) Memory.creepCounter = newCounter;
        else if (result == ERR_NAME_EXISTS) Memory.creepCounter = newCounter;
        return result;
    }
}

