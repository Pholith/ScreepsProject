﻿import { State, BodyType, Job } from "./Enums";
import { CreepManager } from "./CreepManager";
import { JobContainer } from "./JobContainer";
import { TUNINGS } from "./TUNINGS";

export abstract class CreepContainer {

    constructor(creep: Creep) {
        this.creep = creep;
    }

    protected creep: Creep;

    public run(): void {
        this.updateState();

        // change de job si attend
        if (this.isWaiting()) {
            let newJob: JobContainer = CreepManager.choiceJob(true);
            if (newJob == null) this.changeJob(Job.UPGRADER);
            else this.changeJob(newJob.getJob());
        }

        if (this.creep.memory.state == State.HARVEST) this.harvestEnergy();
        if (this.creep.memory.state == State.ACTION) this.action();
    }

    private changeJob(job: Job) : void {
        console.log("Renew Job of " + this.creep.name + ": " + this.creep.memory.job + " -> " + job);
        this.creep.memory.job = job;
    }

    protected harvestEnergy(): void {
        var sources = TUNINGS.getMotherSpawn().room.find(FIND_SOURCES);
        let target: Source;
        target = sources[this.creep.memory.random % sources.length];
        // Si le filon est vide, change de filon
        if (target.energy < 20) target = sources[(this.creep.memory.random + 1) % sources.length];
        if (this.creep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { maxRooms: 0 } );
        }
    }

    protected updateState(): void {
        // Passage en mode harvest
        if (this.creep.store.energy == 0) {
            this.creep.memory.state = State.HARVEST;
            return;
        }
        // Passage en mode action
        if (this.creep.memory.state == State.HARVEST && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.state = State.ACTION;
            this.getTarget(true); 
        }
    }

    protected isWaiting(): boolean {
        return (this.getTarget() == null) && this.creep.memory.state != State.HARVEST;
    }

    protected getTarget(updateTarget: boolean = false): RoomObject {
        /*if (this.creep.memory.target == null || 
            !this.isOkayTarget(Game.getObjectById(this.creep.memory.target.id)) ||
            updateTarget) {
            let target: RoomObject = this.findTarget();
            if (target) this.creep.memory.target = target.id;
            else return null;
        }

        return Game.getObjectById(this.creep.memory.target);*/
        return this.findTarget();
    }

    // A implémenter pour que le creep ne reste pas bloqué sur une cible non ok
    // Méthode qui dit si un objet peut être la cible d'un creep
    protected isOkayTarget(obj : RoomObject) : boolean {
        return true;
    }

    // need a override
    protected abstract findTarget(): RoomObject;
    protected abstract action(): void;
}
