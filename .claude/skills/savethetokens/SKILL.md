---
name: savethetokens
description: Reduce Claude Code token burn with proactive compacting, task-scoped sessions, checkpoint files, tiered docs, and relevance-based context pruning. Use when a user explicitly asks to reduce context usage/cost, run token benchmarks, or optimize CLAUDE.md. Do not use to expand product scope or skip correctness checks.
---

# Context Governor

Optimize context usage with practical, high-impact workflows and scripts.

## Non-Negotiable Guardrails

1. Keep scope locked to the user request. Do not add extra features, pages, or telemetry unless asked.
2. Treat token optimization as a constraint, not the goal. Correctness and security win over token reduction.
3. Never claim token savings without before/after measurement on comparable tasks.
4. If context-saving actions risk quality loss, keep the extra context and state the tradeoff.
5. **Never reduce code thoroughness to save tokens.** Tests, strict config, safety checks, and error handling are non-negotiable. Save tokens from message verbosity never from output completeness.

## Operating Modes

- `Lean Mode` (default): Use lightweight context hygiene only; do not create new benchmark artifacts.
- `Measurement Mode`: Use launch-readiness or A/B telemetry scripts only when user asks for proof/percentages.

## Claude Code Message Budget (required)

1. Keep progress updates short and phase-based. Do not narrate every file write.
2. Do not paste long command output unless user asks. Summarize only key signals.
3. Do not repeat the same command without a code/input change; if retried, state the reason once.
4. If `/context` shows message growth is unusually high, switch to stricter concise mode:
   - fewer updates
   - shorter summaries
   - batch related edits before reporting
5. Prefer one concise final summary over long running commentary.
6. For benchmark runs, enforce matched behavior on both variants:
   - same stop criteria
   - same compact policy
   - same output style (no extra giant report in one variant only)

## Operating Playbook

1. Confirm objective and lock scope in one sentence.
2. Keep one chat session per task. Start a new session for unrelated work.
3. Use `! <command>` for direct shell commands when no reasoning is required.
4. Run `/context` periodically. Compact around 50% usage instead of waiting for hard limits.
5. Before `/compact` or `/clear`, create a checkpoint file with next steps and touched files.
6. Keep top-level docs lean; move deep details to linked `docs/*.md`.
7. Before final output on code tasks, run the quality gates in `docs/QUALITY_GATES.md`.
8. For token-savings claims, run matched A/B using `docs/BENCHMARK_PROTOCOL.md`.
9. For Claude benchmark runs, use `docs/STRICT_BENCHMARK_PROMPT.md` as the session starter.

## Quality Rules

- **NEVER** prune system prompts, errors, recent messages
- Max pruning: 40% (keeps quality)
- When uncertain → KEEP content
- Will exceed budget rather than harm quality
- Keep solution minimal and request-aligned; avoid speculative architecture
- Run relevant tests/checks for touched areas, or explicitly state what could not be run

## Completeness Checklist (never skip under token pressure)

1. Strict config enabled (tsconfig strict, eslint, etc.)
2. Tests written and passing for touched areas
3. Safety limits respected (rate limits, timeouts, retries)
4. Error handling for all new code paths
5. Input validation at system boundaries
6. Security: no injections, no exposed secrets
7. Build verified (no type errors, no lint errors)
8. Limitations documented if corners were cut
