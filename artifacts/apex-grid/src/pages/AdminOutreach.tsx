import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { AdminNav } from '@/components/layout/AdminNav';
import { DashboardStats } from '@/components/outreach/DashboardStats';
import { ProspectsTab } from '@/components/outreach/ProspectsTab';
import { CampaignsTab } from '@/components/outreach/CampaignsTab';
import { MessagesTab } from '@/components/outreach/MessagesTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminOutreach() {
  return (
    <>
      <Show when="signed-in">
        <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Employee Portal</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Email approvals & outreach</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Review prospects, approve drafts, and manage sends from your personal workspace.
              </p>
            </div>
          </div>
          
          <AdminNav />
          <DashboardStats />

          <Tabs defaultValue="prospects" className="space-y-8">
            <TabsList className="bg-card border border-border h-auto p-1" data-testid="outreach-tabs">
              <TabsTrigger value="prospects" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-prospects">
                Prospects
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-campaigns">
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-messages">
                Outreach Queue
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prospects" className="mt-0">
              <ProspectsTab />
            </TabsContent>
            
            <TabsContent value="campaigns" className="mt-0">
              <CampaignsTab />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-0">
              <MessagesTab />
            </TabsContent>
          </Tabs>
        </div>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
