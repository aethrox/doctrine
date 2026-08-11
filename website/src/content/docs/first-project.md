---
title: Your First Project
description: Use Doctrine to shape a Decision Journal without following a copy-paste tutorial.
---

This project is a reference case, not a script to reproduce line by line. The goal is to learn how to make, record, implement, and verify decisions with progressively less guidance.

## The product

The Decision Journal is a small browser application for recording important decisions. An entry contains the situation, chosen decision, reasoning, category, and date.

The first release lets a user:

- Create and view entries.
- Keep entries after the page reloads.
- Search entries.
- Filter entries by category.
- Export entries as JSON.

## Fixed constraints

The beginner version uses HTML, CSS, browser-native JavaScript, `localStorage`, and static hosting. It does not use a framework, package manager, backend, user accounts, database server, or paid API.

Local storage is not encrypted backup. Clearing browser data or changing browsers can remove access to the journal. JSON export provides a portable copy.

## Define success before implementation

A first release is complete when:

- A valid entry can be saved and displayed.
- Saved entries remain after a reload.
- Search matches the situation, decision, or reasoning.
- Category filtering produces the expected subset.
- Export downloads valid JSON containing the saved entries.
- User-provided text is rendered as text, not injected as HTML.
- The app remains usable with a keyboard and readable on a narrow screen.

Anything else is outside the first release unless it becomes necessary to meet these outcomes.

## The first slice, fully reasoned

The smallest useful end-to-end slice is:

> A user enters one decision and its reasoning, saves it, reloads the page, and still sees the entry.

This proves the form, validation, record creation, browser storage, rendering, and reload path together. Search, filters, export, editing, and visual polish do not belong in this slice.

Use an observable acceptance check:

> Save an entry named “Choose hosting,” reload the page, and confirm that its decision and reasoning are still visible.

## The second slice, with less guidance

Choose either search or category filtering. Before implementation, write:

- The user-visible outcome.
- One normal example.
- One edge case.
- The smallest check that proves it works.

Ask the agent to challenge your slice if it combines more than one behavior. Do not ask it to choose every detail for you.

## Finish independently

Plan and sequence the remaining search or filter behavior, JSON export, accessibility, responsive layout, and static deployment yourself. For each slice, state the outcome and evidence before requesting code.

The project succeeds when you can explain its decisions and verification evidence, not when your files happen to match a reference implementation.

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

Do not invoke every skill at once. Select the one that matches the current problem.
