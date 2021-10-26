import { performance } from "perf_hooks";

export function now(): number
{
    return performance.now();
}

export function logPerformance(p: Date, msg: string)
{
    const m = String(p.getMinutes()).padStart(0, '0');
    const s = String(p.getSeconds()).padStart(2, '0');
    const ms = String(p.getMilliseconds()).padStart(3, '0');
    console.log(`[ ${m}m ${s}s ${ms}ms ] ${msg}.`);
}
