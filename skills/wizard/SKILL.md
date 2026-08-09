---
name: wizard
description: Generate an interactive script that walks a human, step by step, through a manual procedure only they can perform. Use when provisioning infrastructure, setting up credentials or CI secrets, navigating an unfamiliar third-party dashboard, or running a one-off migration or cutover that needs a human's hands or authority at each step.
---

# Wizard

A step a human must perform manually is exactly the kind of task an SOP (standard operating procedure) exists to make consistent — detailed, sequential instructions so the task comes out the same way regardless of who runs it or how many times it's been explained before. This skill's defining constraint: a wizard only contains steps genuinely gated on human authority or judgment — anything the agent can do itself belongs in the agent's own work, not in a script that stops to ask a human to do it.

## Phase 1 — Scope to human-only steps

Before writing anything, separate the procedure into what the agent can do directly and what actually requires a human — clicking through a third-party dashboard with no API, entering credentials only the human holds, confirming an action with real-world consequence (a production cutover, an irreversible migration step). Only the second category belongs in the wizard. A wizard padded with steps the agent could have just done is friction added for no reason — it exists specifically for the steps that can't be delegated.

## Phase 2 — One verifiable action per step

Following SOP discipline, each step is a single, unambiguous action, not a paragraph the human has to parse into sub-steps themselves:

- State exactly what to do — which URL to open, which button to click, which value to copy.
- State the expected outcome, so the human can tell they did it right before moving on, not just that they did *something*.
- Never bundle two decisions into one step — a step that says "configure X and also decide Y" is two steps wearing one number.

## Phase 3 — Capture and persist immediately

When a step produces a value the rest of the procedure needs (an API key, a generated ID, a URL), capture it right there and write it to where it actually belongs — `.env`, a secrets store, a config file — rather than holding it in the script's memory for a later step to use. A value captured but not yet persisted is lost the moment the script or the human's session ends; persisting immediately makes the procedure resumable, not just recorded.

## Phase 4 — Confirm before advancing

Every step ends with an explicit confirmation from the human before the script moves on — never assume success because the human didn't say otherwise. A wizard that races ahead on silence turns a later failure into a mystery about which earlier step actually didn't work.

## Phase 5 — Make it resumable

A procedure that fails or gets interrupted partway through shouldn't force the human to restart from step one. Track which steps have already completed (a state file, or checks against what should already exist) and skip them on a re-run, picking up exactly where the human left off. This is what turns a one-shot script into something safe to hand back when a session gets interrupted — a real risk for a procedure that involves waiting on external systems or a human stepping away mid-task.

## Done when

- [ ] Every step in the wizard is genuinely gated on human authority or judgment — nothing the agent could do directly was left in.
- [ ] Each step is one action with a stated expected outcome the human can self-verify.
- [ ] Any value a step produces is persisted to its real destination immediately, not held for later.
- [ ] The script confirms explicitly with the human before advancing past each step.
- [ ] Re-running the wizard after an interruption resumes from where it left off, rather than restarting the whole procedure.
