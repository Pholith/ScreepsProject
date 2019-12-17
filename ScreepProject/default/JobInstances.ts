import { JobBuilder, JobContainer, JobHarvester, JobProtector, JobRepairer, JobUpgrader, JobWallRepairer } from "./JobContainer";

export var jobInstances: Array < JobContainer > = new Array(
    new JobHarvester(),
    new JobUpgrader(),
    new JobProtector(),
    new JobRepairer(),
    new JobBuilder(),
    new JobWallRepairer()
);