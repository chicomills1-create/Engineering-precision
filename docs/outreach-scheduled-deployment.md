# Daily outreach scheduled deployment

Create a **Scheduled Deployment** that builds the existing workspace and uses:

- **Run command:** `pnpm --filter @workspace/api-server run outreach:daily`
- **UTC cron:** `0 15 * * *` (08:00 America/Phoenix, which does not observe daylight saving time)

The command is a one-shot runner: it does not start Express. It refuses to run unless production outreach and research safeguards are enabled, performs verified hot-market research before sends, and relies on the existing database claims and send protections for safe overlap with the autoscale API process.