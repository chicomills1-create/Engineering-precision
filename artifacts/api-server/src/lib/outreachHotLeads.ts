export type OutreachEngagementRow = {
  prospectId: number;
  companyName: string;
  contactName: string | null;
  contactEmail: string | null;
  city: string;
  state: string;
  campaignName: string | null;
  eventId: number;
  eventType: string;
  occurredAt: Date;
};

export function buildOutreachHotLeads(rows: OutreachEngagementRow[]) {
  const leads = new Map<number, {
    prospectId: number;
    companyName: string;
    contactName: string | null;
    contactEmail: string | null;
    location: string;
    campaignName: string | null;
    eventIds: Set<number>;
    openCount: number;
    clickCount: number;
    firstEngagedAt: Date;
    latestEngagedAt: Date;
  }>();
  for (const row of rows) {
    if (row.eventType !== "open" && row.eventType !== "click") continue;
    if (leads.get(row.prospectId)?.eventIds.has(row.eventId)) continue;
    const current = leads.get(row.prospectId);
    if (current) {
      current.eventIds.add(row.eventId);
        if (row.eventType === "click") current.clickCount += 1;
        if (row.eventType === "open") current.openCount += 1;
      if (row.occurredAt < current.firstEngagedAt) current.firstEngagedAt = row.occurredAt;
      if (row.occurredAt > current.latestEngagedAt) {
        current.latestEngagedAt = row.occurredAt;
        current.campaignName = row.campaignName;
      }
      continue;
    }
    leads.set(row.prospectId, {
      prospectId: row.prospectId,
      companyName: row.companyName,
      contactName: row.contactName,
      contactEmail: row.contactEmail,
      location: [row.city, row.state].filter(Boolean).join(", "),
      campaignName: row.campaignName,
      eventIds: new Set([row.eventId]),
      openCount: row.eventType === "open" ? 1 : 0,
      clickCount: row.eventType === "click" ? 1 : 0,
      firstEngagedAt: row.occurredAt,
      latestEngagedAt: row.occurredAt,
    });
  }
  return [...leads.values()]
    .sort((a, b) =>
      Number(b.clickCount > 0) - Number(a.clickCount > 0)
      || Number(b.openCount > 0) - Number(a.openCount > 0)
      || b.latestEngagedAt.getTime() - a.latestEngagedAt.getTime()
      || a.prospectId - b.prospectId,
    )
    .map(({ eventIds: _eventIds, firstEngagedAt, latestEngagedAt, clickCount, ...lead }) => ({
      ...lead,
      clickCount,
      firstEngagedAt: firstEngagedAt.toISOString(),
      latestEngagedAt: latestEngagedAt.toISOString(),
      qualification: clickCount > 0 ? "clicked" as const : "opened" as const,
    }));
}