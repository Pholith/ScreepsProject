import { State, BodyType, Job } from "./Enums";
import { CreepManager } from "./CreepManager";
import { JobContainer } from "./JobContainer";

export abstract class CreepContainer {

    constructor(creep: Creep) {
        this.creep = creep;
    }

    protected creep: Creep;

    public run(): void {
        this.updateState();
        if (this.creep.memory.state == State.HARVEST) this.harvestEnergy();
        if (this.creep.memory.state == State.ACTION) this.action();

        // change of job
        if (this.isWaiting()) {
            let newJob: JobContainer = CreepManager.choiceJob(true);
            if (newJob == null) this.changeJob(Job.UPGRADER);
            else this.changeJob(newJob.getJob());
        }
    }
    private changeJob(job: Job) {
        this.creep.memory.job = job;
    }
    protected harvestEnergy(): void {
        var sources = this.creep.room.find(FIND_SOURCES);
        let target: Source;
        target = sources[this.creep.memory.random % sources.length];
        if (target.energy < 20) target = sources[this.creep.memory.random + 1 % sources.length];
        if (this.creep.harvest(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }

    protected updateState(): void {
        if (this.creep.store.energy == 0) {
            this.creep.memory.state = State.HARVEST;
            return;
        }
        if (this.creep.memory.state == State.HARVEST && this.creep.store.getFreeCapacity() == 0) this.creep.memory.state = State.ACTION;
    }

    protected isWaiting(): boolean {
        return (this.getTargets() == null || this.targets.length == 0) && this.creep.memory.state != State.HARVEST;
    }

    private targets: RoomObject[];
    protected getTargets(): RoomObject[] {
        if (this.targets == null) this.targets = this.findStructures()
        return this.targets;
    }

    // need a override
    protected abstract findStructures(): RoomObject[];
    protected abstract action(): void;
}
