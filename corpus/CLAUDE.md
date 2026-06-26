# Corpus — Schema & Conventions

This corpus is the durable wiki + work-tracker for the APIWatchdog project.
A fresh agent opening this repo should read `index.md` first, then the relevant
wiki page. Do not spelunk the code before checking the wiki — it may already
have the answer.

## Layout

```
corpus/
  CLAUDE.md             ← this file: schema + conventions
  index.md              ← content catalog (front door)
  log.md                ← chronological change record
  todos/                ← captured ideas (prose, pre-spec)
  briefs/
    todo/               ← numbered work specs ready to build
    done/               ← completed specs (immutable after move)
    superseded/         ← invalidated specs (immutable, one-line top note)
  wiki/
    overview.md         ← what the project is, top-level orientation
    architecture.md     ← structure, layers, data flow
    decisions.md        ← locked tech/design choices
    status.md           ← dated living dashboard
    open-questions.md   ← genuinely unresolved items only
```

## Source-of-truth ordering (when pages disagree)

1. **Actual code** beats any wiki claim.
2. A brief in **`done/`** beats `wiki/` if the wiki hasn't caught up.
3. **`decisions.md`** beats `status.md` for tech choices not formally revisited.
4. An external spec wins for its own domain.

Always verify paths/functions named in wiki pages before acting on them — pages drift.

## Conventions

- **Brief numbers are stable.** Never renumber when moving between dirs.
- **Standard markdown links, relative to the file.** No Obsidian `[[wikilinks]]`.
- **Absolute dates** (`2026-06-26`), never "yesterday" or "last week".
- **One concept per wiki page.** Split pages past ~200 lines or straddling two topics.
- **Briefs in `done/` or `superseded/` are immutable.** Append only an outcome note at move time.
- **`TodoWrite` is ephemeral (in-session); `corpus/` is durable.** Don't conflate them.
- **The LLM owns `wiki/`; the human curates sources and asks questions.**
- Commit corpus changes only when the user asks.

## Workflows (short form)

| Action | What to do |
|---|---|
| Add todo | Write `todos/YYYY-MM-DD-slug.md` |
| Promote to brief | Next number across all three brief dirs; write `briefs/todo/NN-slug.md` |
| Complete a brief | `mv briefs/todo/ → briefs/done/`, append outcome note, log it, fold into wiki |
| Query | Read `index.md` → relevant wiki page; verify code refs before acting |
| Ingest finding | Update wiki page(s), log it |
| Lint | Sweep contradictions, orphans, staleness; log the sweep |
