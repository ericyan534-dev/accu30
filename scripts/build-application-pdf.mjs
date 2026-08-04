#!/usr/bin/env node
// Builds public/acc-u30-membership-application.pdf from the print-ready HTML
// membership application form. ESM Node script using Playwright.
//
// Playwright is installed in the main repo (/Users/ericyan/ringing/acc), not
// necessarily in the worktree this script lives in. Run it with cwd set to
// the main repo, e.g.:
//
//   cd /Users/ericyan/ringing/acc && node <path-to-this-script>
//
// Input/output paths default to locations resolved relative to this script's
// own location, so it stays runnable from either the main repo or a worktree.
// Both may also be overridden via argv:
//
//   node scripts/build-application-pdf.mjs [inputHtmlPath] [outputPdfPath]

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const inputHtmlPath = path.resolve(
  process.argv[2] ?? path.join(repoRoot, 'public/apply/acc-u30-membership-application.html'),
);
const outputPdfPath = path.resolve(
  process.argv[3] ?? path.join(repoRoot, 'public/acc-u30-membership-application.pdf'),
);

if (!fs.existsSync(inputHtmlPath)) {
  console.error(`Input HTML not found: ${inputHtmlPath}`);
  process.exit(1);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(inputHtmlPath).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300); // settle: let webfont swap/layout finish

  await fs.promises.mkdir(path.dirname(outputPdfPath), { recursive: true });
  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  const pageCount = await countPdfPages(outputPdfPath);
  const stats = await fs.promises.stat(outputPdfPath);

  console.log(`Wrote ${outputPdfPath}`);
  console.log(`Pages: ${pageCount}`);
  console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
} finally {
  await browser.close();
}

// Prefer poppler's `pdfinfo` (reliable, no new npm dependency). Fall back to
// a manual scan of the PDF's /Type /Page objects if pdfinfo isn't on PATH.
async function countPdfPages(pdfPath) {
  try {
    const { stdout } = await execFileAsync('pdfinfo', [pdfPath]);
    const match = stdout.match(/^Pages:\s+(\d+)/m);
    if (match) return Number(match[1]);
  } catch {
    // pdfinfo not available; fall through to manual scan
  }
  const bytes = await fs.promises.readFile(pdfPath);
  const text = bytes.toString('latin1');
  const matches = text.match(/\/Type\s*\/Page[^s]/g) ?? [];
  return matches.length;
}
