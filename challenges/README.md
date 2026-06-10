# 🚀 GitHub Copilot Power-Up Challenge

Most of us already use Copilot to write code. Today we go further — **we teach Copilot new tricks**. Across different hands-on challenges, you'll customise Copilot, wire it into your repo's lifecycle, and build something that talks to it from the outside. Pick one challenge or try them all!

---

## 🎯 The Format

- **Duration:** ~1.15 hours of build time, 15 min for demos if you want to show off what you built (highly encouraged but optional)
- **Team size:** Solo or pairs (pairs strongly encouraged)


---

## ⚙️ Challenge 1 — *"Teach Copilot Something New"*

### Build a Custom Skill

**Mission:** Create a GitHub Copilot **Skill** — a self-contained folder of instructions and assets that Copilot can invoke on demand. Make it solve a real pain point you've hit in your codebase (e.g., scaffolding a new feature module, generating tests for a React component, reviewing accessibility on a PR).

**Why it matters:** Skills are the cleanest way to turn "the way *we* build things" into something Copilot understands automatically. 

**Starter kit:**

- Sample GitHub Repo to try out skills on: **[Octocat Supply Management demo repo](https://github.com/pm-self-learning/octocat_supply_powerup_challenge)** or use your own repo.
- Browse the **[awesome-copilot skills directory](https://awesome-copilot.github.com/skills/)** for inspiration and structure (it's the canonical community library).
- Skim a couple of real skills to see the `SKILL.md` pattern, frontmatter, and how assets are bundled.
- Try `copilot plugin install <skill-name> @awesome-copilot` to see one in action before you build yours.
- Read more about skills in the docs: 
  - **[Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)**
  - **[Skills - Getting Started](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)**

**Done looks like:** A working skill in your repo's `.github/skills/` (or equivalent), producing useful output.

---

## ⚙️ Challenge 2 — *"Set It and Forget It"*

### Ship an Agentic Workflow

**Mission:** Deploy a **GitHub Agentic Workflow** — an AI-powered GitHub Action written in markdown that runs autonomously on a schedule or trigger. Make it do something genuinely useful for the team:  triage stale issues, daily repo status, or coach the CI when it goes red.

**Why it matters:** This is where Copilot stops being a coding assistant and starts being a *teammate* that opens issues, reviews PRs, and keeps the lights on while you sleep.


  
**Prerequisites:**

- GitHub Repository - A repository where you have write access. You can fork the **[Octocat Supply Management demo repo](https://github.com/pm-self-learning/octocat_supply_powerup_challenge)** or use your own.
- GitHub Actions enabled - Check in `Settings` → `Actions` -> `General`
- Set up the required secrets in your repository:
  - `COPILOT_GITHUB_TOKEN` - If using Copilot as your AI engine, you need a GitHub Actions Secret set to a GitHub Personal Access Token (PAT) to authenticate Copilot CLI.
    - **[Create a fine-grained PAT](https://github.com/settings/personal-access-tokens/new?name=COPILOT_GITHUB_TOKEN&description=GitHub+Agentic+Workflows+-+Copilot+engine+authentication&user_copilot_requests=read)** - this link pre-fills the token name, description, and Copilot Requests permission. Verify the following settings before generating:
    - Resource owner is your user account, not an organization.
    - Under Permissions → Account permissions, Copilot Requests is set to Read
    - Expiration: Set a short expiration (e.g., 1 or 2 days) for security best practices as this is primarily for the hackathon.
    - Click Generate token and copy the token value.
  - Add the token as a GitHub Actions Secret named `COPILOT_GITHUB_TOKEN` in your repository settings (`Settings` → `Secrets and variables` → `Actions` → `New repository secret`).

- GitHub CLI (gh) v2.0.0+ - **[Install here](https://cli.github.com/)**. Check version: gh --version
- Logged in to GitHub CLI - Verify with gh auth status and run gh auth login --scopes repo,workflow if needed
- Install the GitHub Agentic Workflows extension:

    ```bash
    gh extension install github/gh-aw
    ```

**Starter kit:**

- Browse the **[githubnext/agentics](https://github.com/githubnext/agentics)** — a sample pack of agentic workflows.
- High-impact picks to remix:
  - 🏥 **CI Doctor** — investigates failing builds automatically
  - 📦 **Dependabot PR Bundler** — combines dependency updates into a single PR
  - 🧪 **Daily Test Improver** — finds under-tested code and adds tests
  - 📊 **Daily Team Status** — turns repo activity into a readable summary
  - 🔍 **Repo Ask** — a `/repo-ask` command for the repo

💡 **Hint**
- Add the sample workflow and trigger a run:
 
   ```bash
      gh aw add-wizard githubnext/agentics/daily-repo-status
    ``` 
Read more **[here](https://github.github.com/gh-aw/setup/quick-start/#prerequisites)**
  

**Done looks like:** A green workflow run on your repo, with the agent visibly doing the thing — opening an issue, posting a comment, or filing a PR.

---

## ⚙️ Challenge 3 - *"Give Copilot a Specialist"*

### Build a Custom Agent

**Mission:** Create a **Custom Agent** — a reusable, purpose-built agent definition (an `*.agent.md` file) that bundles a focused persona, a curated set of tools, and tailored instructions so Copilot behaves like a domain specialist for a specific job (e.g., an API reviewer, a database migration helper, a test-writing agent, or a security auditor).

**Why it matters:** Custom agents let you encode "who should handle this kind of work and how" directly into your repo. Instead of re-explaining context every time, you spin up a specialist that already knows its scope, its tools, and its guardrails — and your whole team can reuse it.

**What is a custom agent?**

- A custom agent is defined in a Markdown file with YAML frontmatter (`name`, `description`, `tools`, and optionally a model) followed by the agent's system prompt / instructions.
- The frontmatter declares which tools the agent can use and how it should behave; the body describes its mission, boundaries, and quality bar.
- They live alongside your code (e.g., in `.github/agents/`) so they're versioned, reviewable, and shareable like any other source file.

**Starter kit:**

- Browse the **[awesome-copilot custom agents directory](https://awesome-copilot.github.com/agents/)** for inspiration and ready-made examples.
- Read the docs to get started:
  - **[Use custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)**
  - **[Customize Copilot — overview](https://code.visualstudio.com/docs/copilot/customization/overview)**
  - **[GitHub Docs — Customize Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)**
- Pick one real, narrow task (review API changes, scaffold a CRUD endpoint, audit a PR for security) and build an agent that nails it.

**Done looks like:** A working `*.agent.md` in your repo that you can select and invoke, and it visibly behaves like the specialist you designed — staying in scope and using only the tools you gave it.

---


# 🌟 Stretch Challenge

Got time to spare or want to push further? Pick one (or both) once you've done one of the core challenges above.

---

## 🛠️ Stretch Challenges

### Stretch Challenge - *"Copilot, Meet Your New App"*

#### Build with the GitHub Copilot SDK

**Mission:** Use the **GitHub Copilot SDK** to integrate the Copilot Agent into building something interesting like an app. The SDK ships for Python, TypeScript, Go, .NET, and Java. A Rust SDK is also available in technical preview.

**Why it matters:** This is the door to embedding Copilot's reasoning into your own product surfaces. Internal tools, customer-facing assistants, ops dashboards — anywhere a developer-grade AI would be useful.


**Starter kit:**

- Repo: **[github/copilot-sdk](https://github.com/github/copilot-sdk)** — multi-language SDK source + docs.
- Recipes: **[awesome-copilot Cookbook → copilot-sdk](https://github.com/github/awesome-copilot/tree/main/cookbook/copilot-sdk)** — copy-paste examples for .NET, Go, Java, Node.js, and Python covering session management, file ops, error handling.
- Pick a recipe in your language and get it running end-to-end before you customise.

**Done looks like:** A runnable demo on localhost showing your app having a real conversation with a Copilot agent.



---

## 🏆 Demo
If you are interested, you can demo your work to the group towards the end of the session. Show us the skill you built, the workflow you deployed, or anything else you created with GitHub Copilot. Highlight any edge cases you handled or interesting design decisions you made.

---

## 📚 Cheat-Sheet Resources

| What | Where |
|------|-------|
| Skills, agents, instructions, hooks library | [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot) |
| Searchable web browser for the above | [awesome-copilot.github.com](https://awesome-copilot.github.com) |
| About Agentic Workflows | [github.com/gh-aw/introduction](https://github.github.com/gh-aw/introduction/overview/#natural-language-to-github-actions) |
| Agentic Workflows sample pack | [github.com/githubnext/agentics](https://github.com/githubnext/agentics) |
| Copilot SDK (all languages) | [github.com/github/copilot-sdk](https://github.com/github/copilot-sdk) |
| SDK recipes & runnable examples | [awesome-copilot/cookbook](https://github.com/github/awesome-copilot/tree/main/cookbook) |
| VS Code Copilot customisation docs | [code.visualstudio.com](https://code.visualstudio.com/docs/agents/concepts/customization) |
| Custom agents in VS Code  | [code.visualstudio.com/docs/copilot/customization/custom-agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) |
| Custom instructions  | [docs.github.com — add repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) |


---

## 💡 A Few Pro Tips Before You Start

1. **Read one example end-to-end before you write your own.** All three challenges have copy-paste-able starting points — don't fight a blank file.
2. **Keep scope tiny.** A skill that does one thing brilliantly beats a skill that does five things vaguely. Same for workflows and SDK apps.
3. **Let Copilot help you build with Copilot.** Yes, ask Copilot to help write your skill, your workflow markdown, your SDK code. That's the whole point.
4. **Demo the gnarly part.** Anyone can demo a happy path — show us the edge case you handled.

---

**Ready? Pick your challenge, grab a partner, and let's see what you ship.** 🛠️

---

[📚 More Learning Resources](./LearningResources.md)




