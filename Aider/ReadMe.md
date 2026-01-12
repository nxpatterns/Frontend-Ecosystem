# Aider Mastery Guide: Cost-Efficient AI Pair Programming 🚀

## In-Session Command Deep Dive

### `/ask` - The Read-Only Philosopher
Ask questions without triggering code edits. Aider responds **without modifying files or proposing changes**.

**Use case:** "How does this authentication flow work?" or "What's the best pattern for this?"

**Token impact:** Costs tokens but doesn't pollute git history with experimental changes.

### `/code` - Back to Action Mode
Switches from `/ask` mode back to default editing mode where Aider can modify files.

**Mental model:** `/ask` = consultant mode, `/code` = developer mode.

### `/commit` - Manual Commit Control
Manually commit current changes with a custom message, overriding Aider's auto-generated commit message.

```bash
/commit "feat: implement JWT authentication with refresh tokens"
```

**Why:** When auto-commit messages lack business context or violate your commit conventions.

### `/architect` - The Strategic Planner
Toggles architect mode mid-session. In architect mode:

1. Aider first creates a **high-level plan**
2. You review the plan
3. Aider executes the implementation

**Power move:** Use architect mode for complex multi-file refactorings. The upfront planning prevents wasteful token-burning iterations.

---

## `/run <cmd>` - Shell Command Execution

**Critical distinction:** Only **you** see the shell output in your terminal. I (Claude) only see what Aider sends me - typically just the command and its exit code.

**Example workflow:**

```bash
> /run npm test
Running npm test...
✓ All tests passed
```

Aider sees: "Command executed successfully" but **not** the full test output unless you explicitly paste it into chat.

**Pro tip:** Use `/run` for quick validations, but for test-driven workflows, configure `--test-cmd` instead - Aider gets full output automatically.

---

## File Management Precision

### `--read` - Reference-Only Context
Adds files to Aider's context **without edit permissions**. Like giving someone a PDF vs. a Word doc.

**Use cases:**

- API documentation files
- Configuration files you don't want accidentally modified
- Legacy code for reference only
- Third-party library source files

**Example:**

```bash
aider --read docs/api-spec.md --read config/constants.ts src/api.ts
```

Aider can read and reference `api-spec.md` and `constants.ts`, but only edits `api.ts`.

### `.aiderignore` - The Exclusion List
Works like `.gitignore` for Aider's context. Prevents files from being added to repo map or edit context.

**Common patterns:**

```plaintext
# .aiderignore
*.test.ts          # Exclude test files
dist/              # Exclude build output
node_modules/      # Already ignored by default
*.generated.ts     # Exclude generated code
legacy/            # Exclude legacy code
```

**Why it matters:** Every file in context costs tokens. Excluding irrelevant files = lower costs.

---

## Token Economics & Caching Strategy

### `--cache-prompts`
Enables **Anthropic's prompt caching** - caches system prompts and repo context.

**The magic:**

- First request: Full price
- Subsequent requests (within 5 min): 90% discount on cached content
- Cache lasts 5 minutes from last use

**Cost impact example:**

- Without caching: 100K tokens × $3/MTok = $0.30 per request
- With caching: 10K new + 90K cached × $0.30/MTok = $0.057 per request

**5x-10x cost reduction** for iterative sessions.

### `--cache-keepalive-pings 12`
Sends "ping" requests every 5 minutes to keep cache alive (12 pings = 1 hour).

**The trade-off:**

- Cost: ~12 tiny requests (minimal)
- Benefit: Cache stays warm for extended sessions
- Break-even: Worth it if you're making >3 requests per hour

**Stop pinging when:** Taking a lunch break or switching projects.

### `--max-chat-history-tokens 8000` → Actually, Reconsider This

**The Math:**

- Sonnet 4.5 context: 200K tokens
- System + repo map: ~7.5K tokens
- Files in context: varies (50-100K typical)
- Remaining for chat: 90-140K available

**8K is ultra-conservative.** Like bringing a knife to a gunfight when you own a tank.

**Better tuning:**

- **Penny-pinching mode:** 8K (forces early summarization, minimal per-request cost)
- **Balanced mode:** 20-30K (captures 10-15 message pairs, reasonable history)
- **Context-rich mode:** 50K+ (long technical discussions, complex refactorings)

**The cost equation:**

- Chat history × requests per session = total history cost
- 8K × 20 requests = 160K tokens wasted on repeated old context
- 30K × 10 requests = 300K tokens (same work, better context, fewer clarifications)

**Pro insight:** Higher limit can *reduce* total costs if it prevents misunderstandings requiring re-work. Context amnesia is expensive.

### `--map-tokens 2048`
Allocates 2048 tokens for the **repo map** - Aider's semantic understanding of your codebase structure.

**What's in the repo map:**

- Function signatures
- Class definitions
- Import relationships
- File structure

**Tuning:**

- Large monorepo: Increase to 4096-8192
- Small project (<50 files): Decrease to 1024 or disable with `0`
- Sweet spot for most projects: 2048

**Cost consideration:** Repo map is included in **every request** but can be cached with `--cache-prompts`.

---

## Advanced Features Explained

### `--voice-format wav|webm|mp3`
Enable voice input. Requires microphone. Aider transcribes speech to text using OpenAI Whisper.

**Use case:** Hands-free coding during late-night debugging marathons. Or when typing feels like too much effort.

**Note:** Requires `ffmpeg` for webm/mp3 formats.

### `--gui` / `--browser`
Launches a web-based interface instead of terminal chat.

**Advantages:**

- Better for code review (syntax highlighting)
- Easier file management (click to add/drop)
- Shareable with team members

**Disadvantages:**

- Slight overhead
- Less keyboard-centric workflow

### `--restore-chat-history`
Continues previous session by loading `.aider.chat.history.md`.

**Use carefully:**

- ✅ Good: Continuing a partially completed task
- ❌ Bad: Starting a new unrelated task (context pollution)

**Better approach:** Start fresh sessions for new tasks (see cost optimization below).

### `--load <file>`
Executes a script of Aider commands on startup.

**Example** (`setup.aider`):

```
/add src/api.ts src/types.ts
/read docs/api-spec.md
/ask What are the current API endpoints?
```

Run with: `aider --load setup.aider`

**Use case:** Repeatable project setup or standardized workflows.

### `--watch-files`
Monitors files for special comments like:

```typescript
// AIDER: refactor this to use async/await
function fetchData() { ... }
```

Aider detects comments and auto-triggers tasks.

**Status:** Experimental. Best for solo developers with specific workflows.

---

## Configuration Rationale: `.aider.conf.yml`

```yaml
model: claude-sonnet-4-5-20250929
cache-prompts: true
architect: true
auto-commits: true
```

### Why this config rocks:

**`model: claude-sonnet-4-5-20250929`**

- Latest Sonnet 4.5 (smartest balanced model)
- Best cost/performance ratio
- Handles complex architectural decisions

**`cache-prompts: true`**

- 5-10x cost reduction in sessions
- No downside if session lasts >5 minutes
- Essential for cost efficiency

**`architect: true`**

- Forces planning before coding
- Reduces wasteful iterations
- Better for multi-file changes
- Toggle off with `/code` if needed

**`auto-commits: true`**

- Every change = atomic commit
- Easy to review git history
- Simple `/undo` if Aider messes up
- Maintains clean audit trail

---

## Cost Optimization Strategies

### Problem: Context Pollution Between Tasks
When finishing Task A and starting Task B, lingering context from A wastes tokens and confuses the model.

### Solution 1: Hard Reset (Recommended)

```bash
# Finish Task A
> /commit "feat: implement user authentication"
> /exit

# Start fresh for Task B
$ aider --cache-prompts src/payments.ts
```

**Why:** Clean slate. Zero context pollution. Cache still warm if <5min.

### Solution 2: Context Pruning (In-Session)

```bash
# Drop files from Task A
> /drop src/auth.ts src/user.ts
> /clear                    # Clear chat history
> /add src/payments.ts      # Add Task B files
```

**Why:** Stays in same session, keeps cache alive, but requires manual cleanup.

### Solution 3: Architect Mode Boundaries

```bash
> /architect
> "Task A complete. Now implement payment processing. Ignore previous auth code."
```

**Why:** Explicit instruction helps, but model still "sees" old context. Not as clean as exit/restart.

### The Verdict:
**Exit and restart** between unrelated tasks. The 30 seconds saved isn't worth the token waste and context confusion.

---

## Efficient Communication Patterns

### ❌ Token Wasters

```bash
> Can you please implement the authentication system?
> I think we should use JWT tokens. What do you think?
> Also maybe add some error handling if that's okay?
```

**Problems:**

- Vague requirements = multiple clarification rounds
- Unnecessary politeness wastes tokens
- Optional suggestions confuse priorities

### ✅ Precision Commands

```bash
> Implement JWT authentication:
> - Login endpoint: POST /auth/login
> - Access tokens: 15min expiry
> - Refresh tokens: 7day expiry
> - Error handling: 401 for invalid credentials
```

**Why it works:**

- Clear requirements = one-shot implementation
- No back-and-forth
- Specific details prevent assumptions

### Master Pattern: Spec → Validate → Implement

```bash
# Step 1: Validate understanding
> /ask Review the current auth flow. What's missing?

# Step 2: Precise instruction
> /code
> Refactor auth to use refresh tokens. Store in httpOnly cookies.

# Step 3: Verify
> /run npm test
> /commit "refactor: add refresh token support"
```

**Token efficiency:** Frontload clarification, backend precise execution.

---

## Real-World Session Template

```bash
# Start fresh, enable caching
aider --cache-prompts --architect \
      --max-chat-history-tokens 8000 \
      src/api.ts src/types.ts

# Read-only reference docs
> /read docs/api-spec.md

# Validate understanding (no edits)
> /ask Explain current error handling strategy

# Switch to coding mode
> /code

# Precise instruction
> Implement centralized error handling:
> - Custom ApiError class
> - Express middleware for error responses
> - Standard error codes from api-spec.md

# Validate
> /run npm run lint
> /run npm test

# Commit with semantic versioning
> /commit "feat: centralized error handling with ApiError class"

# Task complete - exit cleanly
> /exit
```

---

## Quick Reference: Cost Optimization Checklist

- [ ] Start with `--cache-prompts` enabled
- [ ] Set `--max-chat-history-tokens 8000`
- [ ] Use `--read` for reference-only files
- [ ] Create `.aiderignore` for test/build files
- [ ] Exit between unrelated tasks (don't pollute context)
- [ ] Use `/ask` for questions (prevents premature edits)
- [ ] Write precise instructions (avoid clarification loops)
- [ ] Keep repo map reasonable (`--map-tokens 2048`)
- [ ] Use architect mode for complex tasks (plan → execute)
- [ ] Monitor token usage with `/tokens` command

---

## The Golden Rule

**Aider sessions are like database transactions:** Start clean, work focused, commit atomically, exit promptly. Context is currency - spend it wisely.

Your wallet will thank you. 💰
