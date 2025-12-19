# Industry Code Reviewer

**Industry Code Reviewer** is a lightweight, fully offline, industry-standard static code analysis extension for **JavaScript**, **TypeScript**, **React**, and **Next.js**.

It detects **security vulnerabilities**, **code quality issues**, and **maintainability problems** in real time — with **no AI**, **no API keys**, and **no internet dependency**.

---

##  Key Features

###  Security Analysis
Detects common and critical security issues:
- Hardcoded passwords and secrets
- Hardcoded API keys
- Sensitive data logged to console
- Plain-text password comparisons
- Tokens embedded in URLs

---

###  Code Quality Checks
Improves readability and maintainability:
- `console.log` usage in production code
- Unused variables
- Long or overly complex functions
- Common JavaScript / TypeScript anti-patterns

---

###  React & Next.js Rules
Framework-aware checks:
- Missing dependency arrays in `useEffect`
- Inline anonymous functions inside JSX
- Incorrect usage of `<a>` instead of Next.js `<Link>`
- Invalid server-only APIs used in client components

---

###  Quick Fixes (Safe & Offline)
- One-click **Quick Fix** (`Ctrl + .`) for supported rules
- **Fix All Safe Issues** command to clean a file instantly
- All fixes are deterministic and rule-based
- No AI rewriting, no hallucinations

---

###  Real-Time Feedback
- Runs automatically on:
  - File open
  - File save
  - Editor change
- Highlights issues directly in the editor
- Displays details in the **Problems** panel

---

###  Privacy-First by Design
-  No AI models
-  No telemetry
-  No API keys
-  Fully offline
-  Marketplace compliant

---

##  Supported Languages

- JavaScript (`.js`)
- JavaScript React (`.jsx`)
- TypeScript (`.ts`)
- TypeScript React (`.tsx`)

---

##  How It Works

Industry Code Reviewer uses a **rule-based static analysis engine**, inspired by tools like **ESLint** and **SonarLint**.

Each rule:
- Analyzes source code
- Detects violations
- Reports precise diagnostics (line & column)
- Optionally provides safe auto-fixes

The architecture is modular and extensible for future languages and frameworks.

---

##  Usage

1. Install the extension from the VS Code Marketplace
2. Open any supported file (`.js`, `.ts`, `.jsx`, `.tsx`)
3. Issues appear automatically
4. Open **Problems Panel** (`Ctrl + Shift + M`) to review findings

### Commands
Open Command Palette (`Ctrl + Shift + P`):

- **Industry Code Reviewer: Analyze Current File**
- **Industry Code Reviewer: Fix All Safe Issues**

---

##  Extension Settings

```json
{
  "industryCodeReviewer.enable": true
}
