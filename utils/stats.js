const si = require('systeminformation');
const os = require('os');
const prettyBytes = require('pretty-bytes').default || require('pretty-bytes');

async function getBotStats() {
    const [cpu, mem, disk] = await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.fsSize()
    ]);
    const usedMemMB = (mem.active / 1024 / 1024).toFixed(1);
    const totalMemMB = (mem.total / 1024 / 1024).toFixed(1);
    const diskUsed = prettyBytes(disk[0].used);
    const diskFree = prettyBytes(disk[0].size - disk[0].used);

    return {
        cpu: cpu.currentLoad.toFixed(1),
        ram: `${usedMemMB} / ${totalMemMB} MB`,
        node: process.version,
        disk: `${diskUsed} used / ${diskFree} free`
    };
}

module.exports = { getBotStats };
