import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
    "req.body.contact.email",
    "req.body.contact.phone",
    "req.body.contact.name",
    "req.body.project.scope",
    "req.body.estimateSnapshot",
    "req.body.submitterEmail",
    "req.body.submitterPhone",
    "req.body.scope",
  ],
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: { colorize: true },
        },
      }),
});
