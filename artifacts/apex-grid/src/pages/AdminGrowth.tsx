import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { AdminNav } from '@/components/layout/AdminNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GrowthOverviewTab } from '@/components/growth/GrowthOverviewTab';
import { ReferralPartnersTab } from '@/components/growth/ReferralPartnersTab';
import { PublicOpportunitiesTab } from '@/components/growth/PublicOpportunitiesTab';

export default function AdminGrowth() {
  return (
    <>
      <Show when="signed-in">
        <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Employee Portal</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Growth & Pipeline</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Manage unified opportunities, referral partners, and review public project RFQs.
              </p>
            </div>
          </div>
          
          <AdminNav />

          <Tabs defaultValue="overview" className="space-y-8 animate-in fade-in duration-500">
            <TabsList className="bg-card border border-border h-auto p-1" data-testid="growth-tabs">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-overview">
                Unified Pipeline
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-referrals">
                Referral Partners
              </TabsTrigger>
              <TabsTrigger value="public" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-public">
                Public Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0 outline-none">
              <GrowthOverviewTab />
            </TabsContent>
            
            <TabsContent value="referrals" className="mt-0 outline-none">
              <ReferralPartnersTab />
            </TabsContent>
            
            <TabsContent value="public" className="mt-0 outline-none">
              <PublicOpportunitiesTab />
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
