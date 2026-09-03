// Shared client-side state: which weeks (sessions) of the run map a visitor
// has opened. Read and written by both RunProgress (the ambient indicator)
// and RunMap (which marks its own nodes "cleared") so the two stay in sync
// without either one owning the other.
const STORAGE_KEY = "fail-states:visited-runs";
export const TOTAL_RUNS = 12;
export const RUN_STATE_EVENT = "fs-run-state-change";

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    // Private browsing / storage disabled: the site still works, it just
    // doesn't remember between visits.
    return undefined;
  }
}

export function getVisitedRuns(): Set<string> {
  const raw = safeStorage()?.getItem(STORAGE_KEY);
  if (!raw) return new Set();
  try {
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function markCurrentPageVisited(): void {
  const match = window.location.pathname.match(/\/sessions\/([^/]+)\/?$/);
  if (!match) return;
  const slug = match[1];
  const visited = getVisitedRuns();
  if (visited.has(slug)) return;
  visited.add(slug);
  safeStorage()?.setItem(STORAGE_KEY, JSON.stringify([...visited]));
  window.dispatchEvent(new CustomEvent(RUN_STATE_EVENT, { detail: { visited } }));
}
