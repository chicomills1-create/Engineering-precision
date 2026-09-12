import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { AdminNav } from '@/components/layout/AdminNav';
import { DashboardStats } from '@/components/outreach/DashboardStats';
import { ProspectsTab } from '@/components/outreach/ProspectsTab';
import { CampaignsTab } from '@/components/outreach/CampaignsTab';
import { MessagesTab } from '@/components/outreach/MessagesTab';
import { ClientSafeListTab } from '@/components/outreach/ClientSafeListTab';
import { ReplyInboxTab } from '@/components/outreach/ReplyInboxTab';
import { HotLeadsTab } from '@/components/outreach/HotLeadsTab';
import { VerifiedInventoryImport } from '@/components/outreach/VerifiedInventoryImport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetOutreachDashboard } from '@workspace/api-client-react';

export default function AdminOutreach() {
  const { data: stats } = useGetOutreachDashboard();
  const unreadCount = stats?.unreadReplies || 0;

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
           <div className="mb-8">
             <VerifiedInventoryImport />
           </div>

          <Tabs defaultValue="inbox" className="space-y-8">
            <TabsList className="bg-card border border-border h-auto p-1 flex-wrap" data-testid="outreach-tabs">
              <TabsTrigger value="inbox" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary relative" data-testid="tab-inbox">
                Reply Inbox
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold h-4 min-w-4 px-1 rounded-sm">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="hot-leads" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-hot-leads">
                Hot Leads
              </TabsTrigger>
              <TabsTrigger value="prospects" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-prospects">
                Prospects
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-campaigns">
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-messages">
                Outreach Queue
              </TabsTrigger>
              <TabsTrigger value="past-clients" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-past-clients">
                Past Clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="mt-0">
              <ReplyInboxTab />
            </TabsContent>

            <TabsContent value="hot-leads" className="mt-0">
              <HotLeadsTab />
            </TabsContent>

            <TabsContent value="prospects" className="mt-0">
              <ProspectsTab />
            </TabsContent>
            
            <TabsContent value="campaigns" className="mt-0">
              <CampaignsTab />
            </TabsContent>
            
            <TabsContent value="messages" className="mt-0">
              <MessagesTab />
            </TabsContent>
            
            <TabsContent value="past-clients" className="mt-0">
              <ClientSafeListTab />
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
