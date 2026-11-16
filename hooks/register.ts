import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Totals } from '../types'

const ZERO: Totals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
const totals = atom({ plugin: 'claude-hp-bar', key: 'totals' } as const, ZERO)

const fmt = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M`
  : n >= 1_000 ? `${(n / 1_000).toFixed(1)}k`
  : String(n)

const line = (t: Totals): string => {
  const total = t.input + t.output + t.cacheRead + t.cacheWrite
  return `Tokens  in ${fmt(t.input)} · out ${fmt(t.output)} · cache read ${fmt(t.cacheRead)} · cache write ${fmt(t.cacheWrite)} · total ${fmt(total)}`
}

export const register: Register = on => {
  // Show the line right away (also after a reload, from the kept totals).
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    $.ui.status(line(await read($, totals)))
    return result
  })

  // Add each finished turn's usage (main thread and subagents) and redraw.
  on('turn.complete', async ($, e, next) => {
    const u = e.usage
    if (u) {
      await update($, totals, t => ({
        input: t.input + u.input_tokens,
        output: t.output + u.output_tokens,
        cacheRead: t.cacheRead + u.cache_read_input_tokens,
        cacheWrite: t.cacheWrite + u.cache_creation_input_tokens,
      }))
    }
    $.ui.status(line(await read($, totals)))
    return next(e)
  })
}
