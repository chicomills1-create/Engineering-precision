import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { AdminNav } from '@/components/layout/AdminNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LinkedinDashboard } from '@/components/linkedin/LinkedinDashboard';
import { LinkedinApprovalQueue } from '@/components/linkedin/LinkedinApprovalQueue';
import { LinkedinResearchLibrary } from '@/components/linkedin/LinkedinResearchLibrary';
import { LinkedinContentCalendar } from '@/components/linkedin/LinkedinContentCalendar';
import { LinkedinOutcomesTab } from '@/components/linkedin/LinkedinOutcomesTab';
import { LinkedinSuppressionsTab } from '@/components/linkedin/LinkedinSuppressionsTab';

export default function AdminLinkedin() {
  return (
    <>
      <Show when="signed-in">
        <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Employee Portal</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold">LinkedIn B2B command center</h1>
              <div className="mt-4 p-4 border border-border bg-card rounded-md max-w-4xl">
                <p className="text-sm font-medium text-foreground mb-1">Manual-only channel</p>
                <p className="text-sm text-muted-foreground">
                  Research and draft preparation are supported; connection requests, messages, comments, and publishing require your explicit approval and must be completed by an employee. No provider is connected.
                </p>
              </div>
            </div>
          </div>
          
          <AdminNav />
          <LinkedinDashboard />

          <Tabs defaultValue="queue" className="space-y-8 mt-8">
            <TabsList className="bg-card border border-border h-auto p-1 flex-wrap" data-testid="linkedin-tabs">
              <TabsTrigger value="queue" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-queue">
                Approval Queue
              </TabsTrigger>
              <TabsTrigger value="research" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-research">
                Research Library
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-content">
                Content Calendar
              </TabsTrigger>
              <TabsTrigger value="outcomes" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-outcomes">
                Outcomes
              </TabsTrigger>
              <TabsTrigger value="suppressions" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" data-testid="tab-suppressions">
                Suppressions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="queue" className="mt-0">
              <LinkedinApprovalQueue />
            </TabsContent>
            
            <TabsContent value="research" className="mt-0">
              <LinkedinResearchLibrary />
            </TabsContent>
            
            <TabsContent value="content" className="mt-0">
              <LinkedinContentCalendar />
            </TabsContent>
            
            <TabsContent value="outcomes" className="mt-0">
              <LinkedinOutcomesTab />
            </TabsContent>

            <TabsContent value="suppressions" className="mt-0">
              <LinkedinSuppressionsTab />
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