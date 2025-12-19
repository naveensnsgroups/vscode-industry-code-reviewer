# Industry Code Reviewer

**Industry Code Reviewer** is a lightweight, offline, industry-standard static code analysis extension for **JavaScript** and **TypeScript**.

It detects common **security vulnerabilities**, **code quality issues**, and **maintainability problems** in real time — with **no AI**, **no API keys**, and **no internet dependency**.

---

##  Key Features

###  Security Analysis
Detects high-risk security issues such as:
- Hardcoded passwords and secrets
- Hardcoded API keys
- Sensitive data logged to console
- Plain-text password comparisons
- Tokens embedded in URLs

###  Code Quality Checks
Improves code cleanliness and maintainability:
- `console.log` usage in production code
- Unused variables
- Long or overly complex functions
- Common JavaScript / TypeScript anti-patterns

###  Real-Time Feedback
- Runs automatically on file open, save, and editor change
- Highlights issues directly in the editor
- Shows detailed messages in the **Problems** panel

###  Privacy-First & Offline
- No AI models
- No telemetry
- No API keys
- Works fully offline

---

##  Supported Languages

- JavaScript (`.js`)
- TypeScript (`.ts`)

---

##  How It Works

The extension uses a **rule-based static analysis engine** similar to industry tools like ESLint and SonarLint.

Each rule:
- Analyzes source code text
- Detects violations
- Reports precise line and column diagnostics

---

##  Usage

1. Install the extension
2. Open any JavaScript or TypeScript file
3. Issues are highlighted automatically
4. Open **Problems Panel** (`Ctrl + Shift + M`) to see all findings

You can also run the command manually:
