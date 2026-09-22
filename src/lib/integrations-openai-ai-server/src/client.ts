import OpenAI from "openai";

const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

if (!baseURL || !apiKey) {
  console.warn(
    "WARNING: AI_INTEGRATIONS_OPENAI_BASE_URL or AI_INTEGRATIONS_OPENAI_API_KEY not set. OpenAI AI integration is disabled; the app will run without AI features.",
  );
}

export const openai =
  baseURL && apiKey
    ? new OpenAI({
        apiKey: apiKey,
        baseURL: baseURL,
      })
    : null;
