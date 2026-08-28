import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useListCampaigns,
  useCreateCampaign,
  useUpdateCampaign,
  getListCampaignsQueryKey,
  Campaign,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Pause, Plus, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const campaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  audience: z.enum(['architect', 'builder']),
  states: z.array(z.enum(['AZ', 'CA', 'TX'])).min(1, 'Select at least one state'),
  dailyLimit: z.coerce.number().min(1).max(100),
  subjectTemplate: z.string().optional(),
  bodyTemplate: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export function CampaignsTab() {
  const { data: campaigns, isLoading } = useListCampaigns();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const createMutation = useCreateCampaign({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCampaignsQueryKey() });
        setIsCreateOpen(false);
      },
    },
  });

  const updateMutation = useUpdateCampaign({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCampaignsQueryKey() });
      },
    },
  });

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: '',
      audience: 'architect',
      states: [],
      dailyLimit: 10,
      subjectTemplate: '',
      bodyTemplate: '',
    },
  });

  function onSubmit(data: CampaignFormValues) {
    createMutation.mutate({ data: { ...data, status: 'draft' } });
  }

  function setCampaignStatus(campaign: Campaign, status: 'active' | 'paused') {
    updateMutation.mutate({
      id: campaign.id,
      data: {
        name: campaign.name,
        audience: campaign.audience,
        states: campaign.states,
        dailyLimit: campaign.dailyLimit,
        subjectTemplate: campaign.subjectTemplate || undefined,
        bodyTemplate: campaign.bodyTemplate || undefined,
        status,
      },
    });
  }

  if (isLoading) {
    return <div className="text-muted-foreground p-8" data-testid="campaigns-loading">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6" data-testid="tab-content-campaigns">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-display font-semibold">Outreach Campaigns</h2>
          <p className="text-sm text-muted-foreground">Manage audiences, daily limits, and templates.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          if (!open) form.reset();
          setIsCreateOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-campaign">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Campaign</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-create-campaign">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Q3 Architect Outreach" {...field} data-testid="input-campaign-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-campaign-audience">
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="architect">Architects</SelectItem>
                            <SelectItem value="builder">Builders</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dailyLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Limit (1-100)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={100} {...field} data-testid="input-campaign-limit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="states"
                  render={() => (
                    <FormItem>
                      <FormLabel>Target States</FormLabel>
                      <div className="flex gap-4">
                        {['AZ', 'CA', 'TX'].map((state) => (
                          <FormField
                            key={state}
                            control={form.control}
                            name="states"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(state as any)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, state])
                                          : field.onChange(field.value?.filter((value) => value !== state));
                                      }}
                                      data-testid={`checkbox-campaign-state-${state}`}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{state}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-campaign">
                    {createMutation.isPending ? 'Creating...' : 'Create Campaign'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border rounded-[2px] overflow-hidden bg-card">
        {(!campaigns || campaigns.length === 0) ? (
          <div className="p-8 text-center text-muted-foreground" data-testid="empty-campaigns">
            No campaigns yet. Create one to start outreach.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-muted-foreground">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Audience</th>
                <th className="text-left px-4 py-3 font-medium">States</th>
                <th className="text-left px-4 py-3 font-medium text-right">Daily Limit</th>
                <th className="text-left px-4 py-3 font-medium text-center">Status</th>
                <th className="text-left px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="hover:bg-white/[0.02]" data-testid={`row-campaign-${campaign.id}`}>
                  <td className="px-4 py-3 font-medium text-foreground">{campaign.name}</td>
                  <td className="px-4 py-3 capitalize">{campaign.audience}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {campaign.states.map(s => <Badge key={s} variant="secondary" className="text-[10px] uppercase">{s}</Badge>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{campaign.dailyLimit}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'paused' ? 'outline' : 'secondary'} data-testid={`status-campaign-${campaign.id}`}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`menu-campaign-${campaign.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {campaign.status !== 'draft' && (
                          <DropdownMenuItem
                            onClick={() => setCampaignStatus(campaign, campaign.status === 'active' ? 'paused' : 'active')}
                            data-testid={`action-toggle-campaign-${campaign.id}`}
                          >
                            {campaign.status === 'active' ? (
                              <><Pause className="w-4 h-4 mr-2" /> Pause Campaign</>
                            ) : (
                              <><Play className="w-4 h-4 mr-2" /> Activate Campaign</>
                            )}
                          </DropdownMenuItem>
                        )}
                        {campaign.status === 'draft' && (
                          <DropdownMenuItem onClick={() => setCampaignStatus(campaign, 'active')} data-testid={`action-activate-campaign-${campaign.id}`}>
                            <Play className="w-4 h-4 mr-2" /> Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
