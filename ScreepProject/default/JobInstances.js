"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JobContainer_1 = require("./JobContainer");
exports.jobInstances = new Array(new JobContainer_1.JobHarvester(), new JobContainer_1.JobUpgrader(), new JobContainer_1.JobProtector(), new JobContainer_1.JobRepairer(), new JobContainer_1.JobBuilder(), new JobContainer_1.JobWallRepairer());
//# sourceMappingURL=JobInstances.js.map