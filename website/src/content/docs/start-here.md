---
title: Start Here
description: Learn what Doctrine changes, how skills work, and how to begin safely.
---

Doctrine is a collection of software engineering skills for AI-assisted work. Each skill turns an established practice or named standard into concrete instructions, phases, and completion checks.

Doctrine does not replace your AI model, coding client, judgment, or tests. It gives the assistant a disciplined way to approach a specific kind of work.

## What Doctrine changes

Without a relevant skill, an assistant may choose its own process every time. With Doctrine, you can ask it to follow a known discipline:

- `grilling` closes important unanswered decisions before work begins.
- `research` verifies technical claims against primary sources.
- `tdd` builds one behavior at a time through red, green, and refactor.
- `diagnosing-bugs` reproduces a failure before changing code.
- `code-review` reviews for code health, not personal preference.
- `repo-ship` separates commits by intent.

You do not need every skill for every task. Use the smallest set that matches the situation.

## A useful mental model

Think of Doctrine as a set of operating procedures.

Your AI client provides the workspace, conversation, tools, and permissions. The model reasons about your request. Doctrine provides the discipline used while doing the work.

A skill cannot grant access to a file, run a tool your client does not provide, or remove the need for your approval.

## Start with a decision, not code

Before asking an assistant to build something, write three things:

1. **Outcome:** What should be true when the work is complete?
2. **Non-goal:** What should not be added?
3. **Evidence:** How will you confirm the outcome?

For example:

> I want a browser-based decision journal that keeps data on this device. It must not require an account, backend, framework, or paid API. I will consider the first slice complete when I can save one decision, reload the page, and still see it. Use `grilling` to identify any blocking decisions. Do not implement yet.

Naming the skill is an explicit invocation. Some clients can also select a skill automatically from its description, but this behavior depends on the client.

## Your safety loop

For every meaningful change:

1. Confirm the intended outcome.
2. Check which files may change.
3. Review the resulting diff.
4. Run the smallest relevant check or test.
5. Confirm the actual behavior yourself.
6. Commit one logical change at a time.

Never paste credentials into a conversation or commit them to source control. Read permission requests before approving them.

## You are ready to continue when

Without looking back at this page, you can explain:

- The difference between a skill and a tool.
- Why one task may need only one Doctrine skill.
- What evidence would prove a requested change works.

Continue to [Installation](../installation/), then [Core Concepts](../core-concepts/).
