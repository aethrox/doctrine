---
title: Your First Project
description: Shape your first Decision Journal with Doctrine, without following a copy-paste tutorial.
---

Use this project as a reference, not a script to copy line by line. You will practice making, recording, implementing, and checking your own decisions with less guidance at each stage.

## The product

The Decision Journal is a small browser app for recording important decisions. Each entry has a situation, the decision you made, your reasoning, a category, and a date.

The first release lets a user:

- Create and view entries.
- Keep entries after the page reloads.
- Search entries.
- Filter entries by category.
- Export entries as JSON.

## Fixed constraints

This first version uses HTML, CSS, JavaScript built into the browser, `localStorage`, and static hosting. It has no framework, package manager, backend, user accounts, database server, or paid API.

Local storage is not an encrypted backup. If you clear your browser data or switch browsers, you may lose access to the journal. JSON export gives you a copy you can keep elsewhere.

## Define success before implementation

The first release is complete when:

- A valid entry can be saved and displayed.
- Saved entries remain after a reload.
- Search matches the situation, decision, or reasoning.
- Category filtering produces the expected subset.
- Export downloads valid JSON containing the saved entries.
- Text entered by a user is displayed as text and never treated as HTML.
- The app remains usable with a keyboard and readable on a narrow screen.

Leave everything else out of the first release unless you need it to reach one of these outcomes.

## The first slice, fully reasoned

Start with the smallest useful end-to-end slice, a thin piece of the app that works from input to saved result:

> A user enters one decision and its reasoning, saves it, reloads the page, and still sees the entry.

This one slice checks the form, validation, record creation, browser storage, display, and reload path together. Save search, filters, export, editing, and visual polish for later.

Use a result you can see and check:

> Save an entry named “Choose hosting,” reload the page, and confirm that its decision and reasoning are still visible.

## The second slice, with less guidance

Next, choose either search or category filtering. Before you implement it, write down:

- The user-visible outcome.
- One normal example.
- One edge case.
- The smallest check that proves it works.

Ask the agent to point it out if your slice combines more than one behavior. Keep some decisions for yourself instead of asking it to choose every detail.

## Finish independently

Plan the order of the remaining search or filter work, JSON export, accessibility, responsive layout, and static deployment yourself. Before asking for code, state the outcome for each slice and how you will check it.

You have succeeded when you can explain the decisions and the evidence that the app works. Your files do not need to match a reference implementation.

## Skills that may help

| Situation | Skill |
|---|---|
| Important choices remain unstated | `grilling` |
| A browser fact needs verification | `research` |
| The project brief may be ambiguous | `project-groundwork` |
| Work needs small, testable slices | `spec-to-tickets` |
| A behavior is ready to implement | `tdd` |
| User input crosses into rendered HTML | `secure-coding` |
| Something fails and the cause is unknown | `diagnosing-bugs` |
| A completed diff needs evaluation | `code-review` |
| A logical change is ready to save | `repo-ship` |

Do not invoke every skill at once. Pick the one that fits the problem in front of you.
