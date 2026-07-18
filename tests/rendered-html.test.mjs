import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", headers = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: {
        accept: "text/html",
        ...headers,
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the English default locale page", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Quality systems for predictable delivery/);
  assert.match(html, /Turn QA bottlenecks into operating systems/);
  assert.match(html, /Quality System Diagnostic/);
  assert.match(html, /What gets diagnosed/);
  assert.match(html, /Autotest Audit/);
  assert.match(html, /Jira Dependency Process/);
  assert.match(html, /TMS Implementation and Migration/);
  assert.match(html, />EN</);
  assert.match(html, />RU</);
  assert.match(html, />SR</);
});

test("renders Russian and Serbian locale pages", async () => {
  const [ruResponse, srResponse] = await Promise.all([
    render("/ru"),
    render("/sr"),
  ]);

  assert.equal(ruResponse.status, 200);
  assert.equal(srResponse.status, 200);

  const ruHtml = await ruResponse.text();
  const srHtml = await srResponse.text();

  assert.match(ruHtml, /Системы качества для предсказуемых релизов/);
  assert.match(ruHtml, /Запланировать диагностику/);
  assert.match(ruHtml, /Аудит автотестов/);
  assert.match(ruHtml, /межкомандных зависимостей/);
  assert.match(srHtml, /Sistemi kvaliteta za predvidive isporuke/);
  assert.match(srHtml, /Zakažite dijagnostiku/);
  assert.match(srHtml, /Autotest Audit/);
});

test("detects the preferred locale at the root route", async () => {
  const response = await render("/", {
    "accept-language": "ru-RU,ru;q=0.9,en;q=0.8",
  });

  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location")).pathname, "/ru");
});

test("preserves https redirects behind the production proxy", async () => {
  const response = await render("/", {
    "accept-language": "sr-RS,sr;q=0.9,en;q=0.8",
    host: "qualityopsstudio.com",
    "x-forwarded-proto": "https",
  });

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "https://qualityopsstudio.com/sr");
});

test("keeps i18n structure explicit in source", async () => {
  const [rootPage, localePage, i18n] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/i18n.ts", import.meta.url), "utf8"),
  ]);

  assert.match(rootPage, /accept-language/);
  assert.match(rootPage, /NEXT_LOCALE/);
  assert.match(localePage, /generateStaticParams/);
  assert.match(localePage, /LanguageSwitcher/);
  assert.match(i18n, /defaultLocale: Locale = "en"/);
  assert.match(i18n, /"ru"/);
  assert.match(i18n, /"sr"/);
});
