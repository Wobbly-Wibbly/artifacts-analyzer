"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSimpleReport = void 0;
function createSimpleReport(simpleFileStats) {
    return {
        simpleFileStats,
        reportTimestamp: Date.now(),
    };
}
exports.createSimpleReport = createSimpleReport;
