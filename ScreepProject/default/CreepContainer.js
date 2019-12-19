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
        // change de job si attend
        if (this.isWaiting()) {
            let newJob = CreepManager_1.CreepManager.choiceJob(true);
            if (newJob == null)
                this.changeJob(Enums_1.Job.UPGRADER);
            else
                this.changeJob(newJob.getJob());
        }
    }
    changeJob(job) {
        console.log("Renew Job of " + this.creep.name + ": " + this.creep.memory.job + " -> " + job);
        this.creep.memory.job = job;
    }
    harvestEnergy() {
        var sources = this.creep.room.find(FIND_SOURCES);
        let target;
        target = sources[this.creep.memory.random % sources.length];
        // Si le filon est vide, change de filon
        if (target.energy < 20)
            target = sources[(this.creep.memory.random + 1) % sources.length];
        if (this.creep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
    updateState() {
        // Passage en mode harvest
        if (this.creep.store.energy == 0) {
            this.creep.memory.state = Enums_1.State.HARVEST;
            return;
        }
        // Passage en mode action
        if (this.creep.memory.state == Enums_1.State.HARVEST && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.state = Enums_1.State.ACTION;
            this.getTarget(true);
        }
    }
    isWaiting() {
        return (this.getTarget() == null) && this.creep.memory.state != Enums_1.State.HARVEST;
    }
    getTarget(updateTarget = false) {
        if (this.creep.memory.target == null ||
            !this.isOkayTarget(Game.getObjectById(this.creep.memory.target.id)) ||
            updateTarget) {
            this.creep.memory.target = this.findTarget().id;
            this.creep.memory.target;
        }
        return Game.getObjectById(this.creep.memory.target);
    }
    // A implémenter pour que le creep ne reste pas bloqué sur une cible non ok
    // Méthode qui dit si un objet peut être la cible d'un creep
    isOkayTarget(obj) {
        return true;
    }
}
exports.CreepContainer = CreepContainer;
//# sourceMappingURL=CreepContainer.js.map