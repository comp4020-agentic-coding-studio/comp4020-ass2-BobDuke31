---
title: The Taxonomy of Losing
description:
  Sorting failure into a real hierarchy — time, progress, resource, and death
  — and testing it against games nobody in the room can agree on
week: 2
date: 2027-03-01
tags:
  - theory
teachers:
  - idris-fenn
related:
  - lectures/week-02
  - assessments/fail-state-postmortem
spec:
  - you can place a named failure event into the four-part hierarchy
  - you can name a failure event that resists being placed cleanly
  - you have picked the game you intend to analyze in the postmortem
---

Not all losing is the same size. Losing a few seconds of progress is not
losing a run, and losing a run is not losing a character permanently. The
hierarchy from the lecture — time lost, progress lost, resources lost, death —
gives the rest of the course a shared vocabulary for comparing games that
otherwise look nothing alike.

## Before the session

Bring three failure events from three different games, and a first guess at
where each sits in the hierarchy.

## In the session

We test the hierarchy against edge cases as a group — the ones that don't sit
neatly in one tier are usually the more interesting design decisions, not
failures of the taxonomy.

## Afterwards

Pick the game for your [Fail-State Postmortem](/assessments/fail-state-postmortem/)
before next week. The taxonomy is the tool you'll use to take it apart.
