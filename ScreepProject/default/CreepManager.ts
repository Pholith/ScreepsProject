import { Job, BodyType, State } from "./Enums";
import { CreepUtils } from "./CreepUtils";
import { jobInstances } from "./JobInstances";
import { JobContainer } from "./JobContainer";

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
        console.log("  Next job = " + this.choiceJob().getJob());
        console.log("\n");
    }

    public static choiceJob(forceTheNeed: boolean = false): JobContainer {
        for (var job of jobInstances) {
            if (job.numberNeededOfThisJob(forceTheNeed) > this.numberOfRole(job.getJob())) {
                return job;
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
    public static SpawnBiggestCreep(spawn: StructureSpawn, job: JobContainer): ScreepsReturnCode {
        if (spawn.spawning) return ERR_BUSY;

        let baseBody: { baseBody: Array<BodyPartConstant>, availableParts: Array<BodyPartConstant>, basePrice: number, partsCost: Array<number> }= this.getBaseBody(job.getBodyType())
        let totalCost: number = baseBody.basePrice;
        let bodyParts: Array<BodyPartConstant> = baseBody.baseBody;

        // case of 0 harvester
        if (this.numberOfRole(Job.HARVESTER) < 1 && spawn.room.energyAvailable < spawn.room.energyCapacityAvailable) {
            return this.spawnAndUpdateCounter(spawn, bodyParts, job.getJob(), job.getBodyType());
        }

        let i: number = 0
        while (spawn.room.energyCapacityAvailable - totalCost > 45) {
            if (spawn.room.energyCapacityAvailable - totalCost > baseBody.partsCost[i % baseBody.availableParts.length]) {

                bodyParts.push(baseBody.availableParts[i % baseBody.availableParts.length]);
                totalCost += baseBody.partsCost[i % baseBody.availableParts.length];
            }
            if (i > bodyParts.length + baseBody.availableParts.length) break ;
            i++;
        }
        bodyParts = bodyParts.sort();
        bodyParts.reverse()
        return this.spawnAndUpdateCounter(spawn, bodyParts, job.getJob(), job.getBodyType());
    }

    private static spawnAndUpdateCounter(spawn: StructureSpawn, bodyParts: Array<BodyPartConstant>, job: Job, bodyType: BodyType): ScreepsReturnCode {

        if (Memory.creepCounter == undefined) Memory.creepCounter = 0;
        let newCounter: number = Memory.creepCounter + 1;
        let name = "Pholith" + newCounter;

        let result: ScreepsReturnCode = spawn.spawnCreep(bodyParts, name,
            {
                memory: {
                    job: job,
                    random: Math.round(Math.random() * 999),
                    state: State.HARVEST,
                    bodyType: bodyType
                }
            });
        if (result == OK) Memory.creepCounter = newCounter;
        else if (result == ERR_NAME_EXISTS) Memory.creepCounter = newCounter;
        return result;
    }

    private static getBaseBody(bodyType: BodyType): { baseBody: Array<BodyPartConstant>, availableParts: Array<BodyPartConstant>, basePrice: number, partsCost: Array<number> } {
        let basePrice: number = 0;
        let availableParts: Array<BodyPartConstant> = new Array();
        let baseBody: Array<BodyPartConstant> = new Array();
        let partsCost: Array<number> = new Array();

        switch (bodyType) {
            case BodyType.FIGHTER:
                baseBody.push(ATTACK);
                baseBody.push(MOVE);
                baseBody.push(TOUGH);
                basePrice += BODYPART_COST.attack + BODYPART_COST.tough + BODYPART_COST.move
                availableParts.push(ATTACK);
                availableParts.push(MOVE);
                availableParts.push(TOUGH);
                partsCost.push(BODYPART_COST.attack);
                partsCost.push(BODYPART_COST.tough);
                partsCost.push(BODYPART_COST.move);
                break;

            case BodyType.HEALER:
            case BodyType.WORKER:
                baseBody.push(WORK);
                baseBody.push(MOVE);
                baseBody.push(CARRY);
                basePrice += BODYPART_COST.work + BODYPART_COST.carry + BODYPART_COST.move
                availableParts.push(WORK);
                availableParts.push(CARRY);
                availableParts.push(MOVE);
                partsCost.push(BODYPART_COST.work)
                partsCost.push(BODYPART_COST.carry)
                partsCost.push(BODYPART_COST.move)
                break;

            case BodyType.WORKER_ONE_MOVE:
            case BodyType.HAULER:
            default:
                return null;
        }
        return { baseBody, availableParts, basePrice, partsCost};
        
    }
}

