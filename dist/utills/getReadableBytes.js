"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadableBytes = void 0;
const BITES_IN_KB = 1024;
const FLOATING_PRECISION = 1;
const UNITS = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
function getReadableBytes(bytes) {
    if (Math.abs(bytes) < BITES_IN_KB) {
        return bytes + ' B';
    }
    let u = -1;
    const r = 10 ** FLOATING_PRECISION;
    do {
        bytes /= BITES_IN_KB;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= BITES_IN_KB &&
        u < UNITS.length - 1);
    return bytes.toFixed(FLOATING_PRECISION) + ' ' + UNITS[u];
}
exports.getReadableBytes = getReadableBytes;
