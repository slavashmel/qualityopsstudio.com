import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const sourceDirectory = process.cwd();
const worktreeDirectory = mkdtempSync(
  join(tmpdir(), "qualityopsstudio-workers-preview-"),
);
let worktreeCreated = false;

function run(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    env: { ...process.env, CI: "true" },
    stdio: "inherit",
  });
}

try {
  // A detached worktree contains exactly the current tracked commit. It keeps
  // local experiments and untracked public assets out of the deployment.
  run("git", ["worktree", "add", "--detach", worktreeDirectory, "HEAD"], sourceDirectory);
  worktreeCreated = true;
  run("pnpm", ["install", "--frozen-lockfile"], worktreeDirectory);
  run("pnpm", ["run", "preview:deploy"], worktreeDirectory);
} finally {
  if (worktreeCreated) {
    run("git", ["worktree", "remove", "--force", worktreeDirectory], sourceDirectory);
  }
}
