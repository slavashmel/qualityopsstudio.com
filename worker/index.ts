/** Cloudflare Worker entry point for QualityOps Studio. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function isPreviewHostname(hostname: string): boolean {
  return (
    hostname.startsWith("qualityopsstudio-preview.") &&
    hostname.endsWith(".workers.dev")
  );
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const isPreview = isPreviewHostname(url.hostname);

    // Keep the isolated workers.dev preview out of search results. This is
    // deliberately hostname-scoped, so a future custom-domain deployment is
    // indexable once the cutover has been separately approved.
    if (isPreview && url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    const response = await handler.fetch(request, env, ctx);
    if (isPreview) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return response;
  },
};

export default worker;
