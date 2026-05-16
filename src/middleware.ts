import { env } from "cloudflare:workers";
import { defineMiddleware, sequence } from "astro:middleware";

const rateLimit = defineMiddleware(async (context, next) => {
  const { success } = await env.RATE_LIMIT.limit({
    key: context.url.pathname,
  });

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }

  return next();
});

export const onRequest = sequence(rateLimit);
