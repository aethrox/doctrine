---
title: Start Here
description: See how Doctrine skills guide AI-assisted work and learn how to start safely.
---

Doctrine is a collection of software engineering skills for people working with AI. Each skill turns an established practice or named standard into clear instructions, phases, and checks for finishing the work.

Doctrine does not replace your AI model, coding client, judgment, or tests. It gives your assistant a reliable way to approach a specific kind of work.

## What Doctrine changes

Without a relevant skill, an assistant may choose a different process every time. Doctrine lets you ask it to follow a known approach:

- `grilling` closes important unanswered decisions before work begins.
- `research` verifies technical claims against primary sources.
- `tdd` builds one behavior at a time by first writing a failing test, making it pass, and then improving the code.
- `diagnosing-bugs` reproduces a failure before changing code.
- `code-review` reviews for code health, not personal preference.
- `repo-ship` separates commits by intent.

You will not need every skill for every task. Start with the one that matches the situation.

## A useful mental model

Think of Doctrine as a set of practical operating procedures.

Your AI client provides the workspace, conversation, tools, and permissions. The model works through your request. Doctrine provides the approach it follows along the way.

A skill cannot grant access to a file, use a tool your client does not provide, or approve an action for you.

## Start with a decision, not code

Before you ask an assistant to build something, write down three things:

1. **Outcome:** What should be true when the work is complete?
2. **Non-goal:** What should not be added?
3. **Evidence:** How will you confirm the outcome?

For example:

> I want a browser-based decision journal that keeps data on this device. It must not require an account, backend, framework, or paid API. I will consider the first slice complete when I can save one decision, reload the page, and still see it. Use `grilling` to identify any blocking decisions. Do not implement yet.

Naming the skill directly is called an explicit invocation. Some clients can also choose a skill automatically from its description, but not every client behaves this way.

## Your safety loop

For every meaningful change:

1. Confirm the intended outcome.
2. Check which files may change.
3. Review the resulting diff.
4. Run the smallest relevant check or test.
5. Confirm the actual behavior yourself.
6. Commit one logical change at a time.

Never paste passwords, API keys, or other credentials into a conversation or commit them to source control. Read every permission request before you approve it.

## You are ready to continue when

You are ready when you can explain these points without looking back at the page:

- The difference between a skill and a tool.
- Why one task may need only one Doctrine skill.
- What evidence would prove a requested change works.

Continue to [Installation](../installation/), then [Core Concepts](../core-concepts/).
