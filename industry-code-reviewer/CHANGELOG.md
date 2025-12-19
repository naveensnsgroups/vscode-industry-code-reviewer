# Changelog

All notable changes to the **Industry Code Reviewer** extension are documented in this file.

This project follows the principles of
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and [Semantic Versioning](https://semver.org/).

---

## [0.0.2] – 2025-01-XX

### Added
- **Quick Fix support** for safe issues (e.g., `console.log`)
- **Fix All Safe Issues** command
- React & JSX support
- Next.js specific rules
- Rule registry with clean architecture
- Fix registry for rule-based auto-fixes
- Workspace-wide safe edit batching

### Improved
- Better diagnostic accuracy (line & column)
- Support for `.js`, `.jsx`, `.ts`, `.tsx`
- Performance improvements in analysis engine

---

## [0.0.1] – Initial Release

### Added
- Core static analysis engine
- Security rules:
  - Hardcoded secrets
  - Hardcoded API keys
  - Sensitive data logging
  - Plain-text password comparisons
  - Tokens in URLs
- Code quality rules:
  - `console.log` detection
  - Unused variables
  - Long functions
- Real-time diagnostics on open/save
- Fully offline operation (no AI, no API keys)

---
