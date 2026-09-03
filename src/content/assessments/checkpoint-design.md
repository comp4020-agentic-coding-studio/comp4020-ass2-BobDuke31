---
title: Design a Checkpoint System
description:
  A mechanical design exercise — specify a save policy for a game of your
  choosing and defend the trade-off it makes
week: 9
due: 2027-04-19T12:00:00+10:00
weight: 30
marking:
  mode: weighted
  criteria:
    - name: Coherence of the checkpoint design
      weight: 45
    - name: Quality of the written justification
      weight: 35
    - name: Engagement with the assist/ethics debate from week 8
      weight: 20
spec:
  - submitted by the deadline, as a design document (diagram plus prose)
  - specifies exactly what is saved, when, and what is lost on failure
  - justifies the design against at least one alternative it explicitly rejects
related:
  - fail-state-postmortem
  - final-project
---

## The brief

> Specify a checkpoint or save system for an existing game (real or one you
> invent), and justify the specific trade-off it makes between mercy and
> consequence.

This is a design exercise, not an essay about design. You are not arguing
that checkpoints matter in general — the lectures already made that case. You
are making one specific, implementable decision and defending it against the
version of it you didn't choose.

Use the week 4 live demo's two policies as a floor, not a ceiling: "punishing"
and "generous" are the two ends of a much larger space, and a strong
submission finds a point in that space the demo doesn't show.

## What you submit

A short design document: a diagram or annotated map showing where checkpoints
sit relative to hazards, and prose (roughly 800–1200 words) specifying exactly
what state persists across a failure and what doesn't, plus your
justification. Reference the week 8 assist-mode debate where it's relevant —
a checkpoint policy is an assist decision under another name.
