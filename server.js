#!/usr/bin/env node
import { createServer } from "node:http";
import { createCommercialApi, assertPostBody } from "./src/core/commercialApi.js";

const host = "127.0.0.1";
const port = Number(process.env.LEGACYDOCK_API_PORT || 4317);
const api = createCommercialApi();

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${host}:${port}`);
    const body = request.method === "POST" ? await readBody(request) : {};
    const invalidBody = request.method === "POST" ? assertPostBody(body) : null;
    const result = invalidBody || await api.handle(request.method, url.pathname, body);
    response.writeHead(result.status, result.headers || { "content-type": "application/json; charset=utf-8" });
    response.end(result.status === 204 ? "" : JSON.stringify(result.body, null, 2));
  } catch (error) {
    response.writeHead(400, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: error.message }, null, 2));
  }
});

server.listen(port, host, () => {
  console.log(`LegacyDock local API listening at http://${host}:${port}`);
});
