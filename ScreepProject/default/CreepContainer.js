"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const CreepManager_1 = require("./CreepManager");
class CreepContainer {
    constructor(creep) {
        this.creep = creep;
    }
    run() {
        this.updateState();
        if (this.creep.memory.state == Enums_1.State.HARVEST)
            this.harvestEnergy();
        if (this.creep.memory.state == Enums_1.State.ACTION)
            this.action();
        // change of job
        if (this.isWaiting()) {
            let newJob = CreepManager_1.CreepManager.choiceJob(true);
            if (newJob == null)
                this.changeJob(Enums_1.Job.UPGRADER);
            else
                this.changeJob(newJob.getJob());
        }
    }
    changeJob(job) {
        this.creep.memory.job = job;
    }
    harvestEnergy() {
        var sources = this.creep.room.find(FIND_SOURCES);
        let target;
        target = sources[this.creep.memory.random % sources.length];
        if (target.energy < 20)
            target = sources[this.creep.memory.random + 1 % sources.length];
        if (this.creep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
    updateState() {
        if (this.creep.store.energy == 0) {
            this.creep.memory.state = Enums_1.State.HARVEST;
            return;
        }
        if (this.creep.memory.state == Enums_1.State.HARVEST && this.creep.store.getFreeCapacity() == 0)
            this.creep.memory.state = Enums_1.State.ACTION;
    }
    isWaiting() {
        return (this.getTargets() == null || this.targets.length == 0) && this.creep.memory.state != Enums_1.State.HARVEST;
    }
    getTargets() {
        if (this.targets == null)
            this.targets = this.findStructures();
        return this.targets;
    }
}
exports.CreepContainer = CreepContainer;
//# sourceMappingURL=CreepContainer.js.map