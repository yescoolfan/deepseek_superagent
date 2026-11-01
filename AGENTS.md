# Working in this repository

This is a small Chinese equipment-exception ledger for a personal SuperAgent trial. All equipment, people and records are fictional.

- Work only within the current ticket's scope. Leave unrelated problems to separate tickets.
- Keep the application in Chinese and preserve the six sample records unless the task explicitly changes data.
- Use the existing buildless JavaScript modules and Node built-ins. No dependency installation is needed.
- Application files are in public/. Pure filtering and CSV functions are in public/ledger.js.
- Run npm test and npm run build for functional changes. Add a regression test for a reproduced bug.
- Existing tests cover basic behavior, not every product acceptance condition. Report verification honestly.
- For UI changes, capture real Before and After screenshots of the same scenario, viewport and state. The application runs locally, without login.
- Start a review preview from your ticket checkout with npm run dev -- --port 18781 (or another free port). Port 18780 is reserved for the operator's baseline preview. Do not stop another session's server.
- Keep the server available when handing over a UI PR, and report its URL.
- Read docs/PRODUCT.md for product terminology and docs/DEVELOPMENT.md for commands.
- Do not read or edit unrelated repositories or the operator's private setup files.
- Create reviewable PRs. A person decides whether to merge.
