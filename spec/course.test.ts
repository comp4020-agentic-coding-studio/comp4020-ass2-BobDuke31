import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; level: number };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

// Assigned at provisioning and not ours to change — see src/course-config.ts.
const ASSIGNED_CODE_SUFFIX = "722";

describe("assignment 2 spec", () => {
  it("keeps the assigned three digits in the course code", () => {
    expect(api.course.code.endsWith(ASSIGNED_CODE_SUFFIX)).toBe(true);
  });

  it("runs across twelve dated teaching weeks", () => {
    const sessions = byType("sessions");
    const weeks = new Set(sessions.map((node) => node.meta?.week));
    expect(weeks.size, "expected a session for every one of the 12 teaching weeks").toBe(12);
    for (let week = 1; week <= 12; week += 1) {
      expect(weeks.has(week), `no session found for week ${week}`).toBe(true);
    }
  });

  it("has at least one lecture with a real deck linked from its page", () => {
    const lecturesWithSlides = byType("lectures").filter((node) => node.meta?.slides);
    expect(lecturesWithSlides.length, "no lecture has a slides: link").toBeGreaterThan(0);

    for (const lecture of lecturesWithSlides) {
      const slidesPath = String(lecture.meta?.slides);
      const deckName = slidesPath.replace(/^\/decks\//, "").replace(/\/$/, "");
      const deckPath = resolve(`src/decks/${deckName}.deck.mdx`);
      expect(existsSync(deckPath), `${lecture.id} links to a deck that doesn't exist: ${deckPath}`).toBe(
        true,
      );
    }
  });

  it("has assessment weights that add up to 100%", () => {
    const assessments = byType("assessments");
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, "assessment weights across the course must sum to 100").toBe(100);
  });
});
