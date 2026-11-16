# claude-hp-bar

A Claude Code mod that keeps a status line under the prompt with this session's token usage, updated after every reply:

```
Tokens  in 12.3k · out 4.1k · cache read 210.5k · cache write 18.0k · total 244.9k
```

It adds up each finished turn's input, output, cache-read and cache-write tokens (subagent turns included). Totals start when the mod loads and reset with each new session.

Works in Claude Code only (terminal and desktop app). Regular claude.ai chats can't run mods.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install claude-hp-bar --marketplace IzzatFA/claude-hp-bar
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session).

From a shell:

```
claude plugin install claude-hp-bar --marketplace IzzatFA/claude-hp-bar
```

In the Claude desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `IzzatFA/claude-hp-bar`, then **Add plugin**.
