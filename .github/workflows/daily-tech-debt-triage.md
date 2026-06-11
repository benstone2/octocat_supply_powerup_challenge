---
name: Daily Tech Debt Triage
description: Analyze the repository for small improvements, rank five candidates, and open one issue for the best option.
on:
  schedule: daily
permissions:
  contents: read
  issues: write
  pull-requests: read
  metadata: read
safe-outputs:
  create-issue:
    title-prefix: "[daily tech debt] "
    max: 1
network: {}
tools:
  github:
    toolsets: [repos, issues, pull_requests, search, context]
---

# Daily Tech Debt Triage

You are an automation agent that reviews the repository once per day, identifies five small tech-debt or quality-improvement candidates, and creates exactly one GitHub issue for the best recommendation.

## Task

1. Inspect the repository codebase and recent repository context to identify exactly 5 candidates for small, actionable improvements.
2. Focus on tech debt, warnings, maintainability issues, missing validation, weak typing, duplication, stale documentation, brittle tests, or other modest-quality improvements.
3. Exclude speculative epics, large rewrites, and vague architectural overhauls.
4. Score each candidate on two integer scales from 1 to 5:
   - `impact`: 1 is negligible, 5 is high value.
   - `difficulty`: 1 is trivial, 5 is hard.
5. Choose the single best candidate to raise as an issue. Prefer the best balance of higher impact and lower difficulty. When candidates are close, prefer the one with the clearest evidence and the narrowest scope.
6. Before creating the issue, check whether an open issue already exists for the same recommendation. If a clear duplicate already exists, do not open a new issue. In that case, use the issue body to state that no new issue was created because the best recommendation is already tracked, and still include the top-5 analysis.

## Analysis Guidance

- Scan the whole repository, not only files changed in the last 24 hours.
- Ground each candidate in concrete evidence from the repo. Reference specific files, tests, code paths, or docs when possible.
- Favor improvements that are realistic for a small follow-up task.
- Avoid reporting secrets, credentials, or internal-only details.
- Keep the recommendations independent. Do not split one large refactor into multiple fake small candidates.

## Selection Rubric

Use this rubric consistently:

- `impact: 1` = cosmetic or very localized.
- `impact: 3` = meaningful reduction in maintenance cost, warning risk, or correctness risk.
- `impact: 5` = strong quality, correctness, or developer-efficiency improvement.
- `difficulty: 1` = small isolated change.
- `difficulty: 3` = moderate change touching a few files or requiring careful tests.
- `difficulty: 5` = broad or risky change.

## Output Requirements

Use the safe output `create-issue` to create at most one issue.

- The title should use the configured prefix and summarize the selected recommendation.
- The issue body must include:
  - A short summary of the chosen recommendation.
  - Why this item was selected now.
  - `Impact` and `Difficulty` scores for the chosen item.
  - A short implementation sketch or acceptance criteria.
  - A transparent section listing all 5 candidates with their scores and one brief rationale each.
- Use `###` headers or lower.
- Include links or file paths for evidence when possible.
- If no suitable candidate is found, still create one issue explaining that no strong candidate was identified and include the five weakest candidates considered or explain why fewer than five credible candidates were available.

## Recommended Issue Structure

Follow this shape closely:

### Recommendation
- What to improve.
- Why it matters.

### Scores
- Impact: X/5
- Difficulty: X/5

### Evidence
- Concrete repository observations.

### Suggested Acceptance Criteria
- 2 to 4 clear bullets.

### Other Candidates Considered
- Candidate name — Impact X/5, Difficulty X/5, brief rationale.
- Repeat until all 5 candidates are listed.

## Safety

- Create no more than one issue.
- Do not create duplicate issues when the same improvement is already open.
- Do not include secrets, tokens, or internal notes.