export const linkedinProvider = {
  name: "manual_only",
  capabilities: { read: false, execute: false, send: false, publish: false },
  async execute(): Promise<never> { throw new Error("LinkedIn provider is manual-only; execution is disabled"); },
};